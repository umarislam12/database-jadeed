using Application.Comments;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace POS.SignalR
{
    public class ChatHub : Hub
    {
        private readonly IMediator _mediator;

        public ChatHub(IMediator mediator)
        {
            _mediator = mediator;
        }
        public async Task SendComment(Create.Command command)
        {
            var comment= await _mediator.Send(command);

            await Clients.Group(command.MeetingId.ToString())
                .SendAsync("ReceiveComment", comment.Value);
        }
        public override async Task OnConnectedAsync()
        {
            var httpContext= Context.GetHttpContext();
            var meetingId = httpContext.Request.Query["meetingId"];
            await Groups.AddToGroupAsync(Context.ConnectionId, meetingId);
            var result = await _mediator.Send(new List.Query { MeetingId = Guid.Parse(meetingId) });
            await Clients.Caller.SendAsync("LoadComments", result.Value);
            
        }
    }
}
