using Application.Core;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using SQLitePCL;

namespace POS.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MeetingtestController : ControllerBase
    {
        private readonly DataContext _context;

        public MeetingtestController(DataContext context)
        {
            _context = context;
        }
        [AllowAnonymous]
        //private IMediator _mediator;

        //protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();
        [HttpGet]
        public async Task<List<Meeting>> GetMeetings()
        {
            var meetings = await _context.Meetings.ToListAsync();
            return meetings;
        }
    }
}