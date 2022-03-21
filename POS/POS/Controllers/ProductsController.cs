using Application.Products;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace POS.Controllers
{

    public class ProductsController : BaseApiController
    {
       
        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts(){
            return await Mediator.Send(new List.Query());
        }
        [HttpGet("{id}")] //activities/id
        public async Task<ActionResult<Product>> GetProduct(Guid id) {
            return await Mediator.Send(new Details.Query { Id = id });
        } 
    }
}
