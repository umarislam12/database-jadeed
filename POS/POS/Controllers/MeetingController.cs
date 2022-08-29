using Application.Meetings;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace POS.Controllers
{

    public class MeetingsController : BaseApiController
    {
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetMeetings(){
            return resultHandler(await Mediator.Send(new List.Query()));
        }
       
        [HttpGet("{id}")] //activities/id
        public async Task<IActionResult> GetMeeting(Guid id) {

            return resultHandler(await Mediator.Send(new Details.Query { Id = id }));
        }
        [HttpPost]
        public async Task<IActionResult> CreateMeeting(Meeting meeting) 
        { 
        return resultHandler(await Mediator.Send(new Create.Command { Meeting=meeting}));
        }
        [Authorize(Policy = "IsMeetingHost")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMeeting(Guid id, Meeting meeting)
        {
            meeting.Id = id;
            return resultHandler(await Mediator.Send(new Edit.Command{Meeting =meeting}));
        }
        [Authorize(Policy = "IsMeetingHost")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMeeting(Guid id)
        {
            return resultHandler(await Mediator.Send(new Delete.Command { Id=id}));
        }
        [HttpPost("{id}/attend")]
        public async Task<IActionResult> Attend(Guid id)
        {
            return resultHandler(await Mediator.Send(new UpdateAttendance.Command { Id = id }));
        }
    }
}
