using Application.Followers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics.Contracts;

namespace POS.Controllers
{
   
    public class FollowController : BaseApiController
    {
        [HttpPost("{username}")]
        public async Task<IActionResult> Follow(string username)
        {
            return ResultHandler(await Mediator.Send(new FollowToggle.Command { TargetUsername = username }));
        }
        [HttpGet("{username}")]
        public async Task<IActionResult> GetFollowings(string username, string predicate)
        {
            return ResultHandler(await Mediator.Send(new List.Query { Username = username, Predicate = predicate }));
        }
    }
}
