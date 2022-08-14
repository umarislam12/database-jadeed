
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Meetings
{
    public class List
    {
        //List.Query
        public class Query : IRequest<Result<List<Meeting>>> { }
        public class Handler : IRequestHandler<Query, Result<List<Meeting>>>
        {
            private readonly DataContext _context;


            public Handler(DataContext context, ILogger<List> logger)
            {
                _context = context;

            }

            public async Task<Result<List<Meeting>>> Handle(Query request, CancellationToken cancellationToken)
            {
                ///*  try
                //  {
                //      for(var i=0; i <10; i++)
                //      {
                //         cancellationToken.ThrowIfCancellationRequested();
                //          await Task.Delay(1000, cancellationToken);
                //          _logger.LogInformation($"Task {i} has completed");
                //      }
                //  }
                //  catch(Exception ex) when (ex is TaskCanceledException)
                //  {
                //      _logger.LogInformation("Task was cancelled");
                //  }*/
                return Result<List<Meeting>>.Success(await _context.Meetings.ToListAsync());
            }
        }
    }
}
