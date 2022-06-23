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
        [HttpPost]
        public async Task<IActionResult> CreateProduct(Product product) 
        { 
        return Ok(await Mediator.Send(new Create.Command { Product=product}));
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(Guid id, Product product)
        {
            product.Id = id;
            return Ok(await Mediator.Send(new Edit.Command{Product=product}));
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProduct(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command { Id=id}));
        }
    }
}
