using Application.Profiles;
using Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace POS.Controllers
{
   
    public class ProfilesController : BaseApiController
    {
        [HttpGet("{username}")]
        public async Task<IActionResult> GetProfile (string username)
        { 
            return ResultHandler(await Mediator.Send(new Details.Query { Username = username }));
        }
        [HttpPut]
        public async Task<IActionResult> UpdateProfile(Edit.Command command)
        {
            return ResultHandler(await Mediator.Send(command));
        }
        [HttpGet("{username}/meetings")]
        public async Task<IActionResult> GetProfileMeetings( string username, string predicate)
        {
            return ResultHandler(await Mediator.Send(new ListMeetings.Query {Username=username, Predicate =predicate }));
        }
    }
}
