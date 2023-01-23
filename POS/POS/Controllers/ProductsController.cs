using Application.Products;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace POS.Controllers
{

    public class ProductsController : BaseApiController
    {
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetProducts(){
            return ResultHandler(await Mediator.Send(new List.Query()));
        }
       
        [HttpGet("{id}")] //products/id
        public async Task<IActionResult> GetProduct(Guid id) {

            return ResultHandler(await Mediator.Send(new Details.Query { Id = id }));
        }
        [HttpPost]
        public async Task<IActionResult> CreateProduct(Product product) 
        { 
        return ResultHandler(await Mediator.Send(new Create.Command { Product=product}));
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(Guid id, Product product)
        {
            product.Id = id;
            return ResultHandler(await Mediator.Send(new Edit.Command{Product=product}));
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProduct(Guid id)
        {
            return ResultHandler(await Mediator.Send(new Delete.Command { Id=id}));
        }
    }
}
