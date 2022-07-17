using Domain;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Products
{
    public class Details
    {
        public class Query: IRequest<Product>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Product>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Product> Handle(Query request, CancellationToken cancellationToken)
            {
                var product= await _context.Products.FindAsync(request.Id);
                if (product == null) throw new Exception("product not found");
                return product;
            }
        }
    }
}
