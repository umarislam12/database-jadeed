﻿using Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace POS.Controllers
{

    public class ProductsController : BaseApiController
    {
        private readonly DataContext _context;

        public ProductsController(DataContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts(){
            return await _context.Products.ToListAsync();
        }
        [HttpGet("{id}")] //activities/id
        public async Task<ActionResult<Product>> GetProduct(Guid id) { 
        return await _context.Products.FindAsync(id);
        } 
    }
}
