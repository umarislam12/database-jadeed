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
            return resultHandler(await Mediator.Send(new Details.Query { Username = username }));
        }
        [HttpPut]
        public async Task<IActionResult> UpdateProfile(Edit.Command command)
        {
            return resultHandler(await Mediator.Send(command));
        }
    }
}
