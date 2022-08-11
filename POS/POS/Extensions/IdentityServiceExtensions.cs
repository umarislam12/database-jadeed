﻿using Domain;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Persistence;
using POS.Services;
using System.Text;

namespace POS.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddIdentityCore<AppUser>(opt =>
            {
                opt.Password.RequireNonAlphanumeric = false;
            })
                .AddEntityFrameworkStores<DataContext>()
                .AddSignInManager<SignInManager<AppUser>>();
            //signing key
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
            //pass in the types of authentication
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(opt =>
                {
                    //how api validates the validity of token
                    opt.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = key,
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });
            services.AddScoped<TokenService>();
            return services;
        }
    }
}
