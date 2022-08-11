using System;
using Microsoft.AspNetCore.Mvc;

namespace POS.Controllers
{
    public class BuggyController : BaseApiController
    {
        [HttpGet("not-found")]
        public ActionResult GetNotFound()
        {
            return NotFound();
        }

        [HttpGet("bad-request")]
        public ActionResult GetBadRequest()
        {
            return BadRequest("This is a bad request");
        }

        [HttpGet("server-error")]
        public ActionResult GetServerError()
        {
            try
            {
                throw new Exception("This is a server error");
            }
            catch
            {
                return null;
            }
        }

        [HttpGet("unauthorised")]
        public ActionResult GetUnauthorised()
        {
            return Unauthorized();
        }
    }
}