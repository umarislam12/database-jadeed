using Application.Core;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;


namespace POS.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProducttestController : ControllerBase
    {
        private readonly DataContext _context;

        public ProducttestController(DataContext context)
        {
            _context = context;
        }

       
        [AllowAnonymous]
        //private IMediator _mediator;

        //protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();
        [HttpGet]
        public async Task<List<Product>> Getproducts()
        {
            var meetings = await _context.Products.ToListAsync();
            return meetings;
        }
    }
}