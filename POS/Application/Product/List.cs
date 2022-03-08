using Domain;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Items
{
    public class List
    {
        public class Query : IRequest<List<Product>> { }
        public class Handler : IRequestHandler<Query, List<Product>>
        {
            public async Task<List<Product>> Handle(Query request, CancellationToken cancellationToken)
            {
                throw new NotImplementedException();
            }
        }
    }
}
