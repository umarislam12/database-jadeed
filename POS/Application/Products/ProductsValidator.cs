using Domain;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Products
{
    public class ProductsValidator : AbstractValidator<Product>
    {
        public ProductsValidator()
        {
            RuleFor(x => x.ProductName).NotEmpty();
            RuleFor(x => x.ProductNumber).NotEmpty();
            //RuleFor(x => x.QtyStock).NotEmpty();
            RuleFor(x => x.Cost).NotEmpty();
            RuleFor(x => x.Category).NotEmpty();
            RuleFor(x => x.Brand).NotEmpty();
        } 
    }
}
