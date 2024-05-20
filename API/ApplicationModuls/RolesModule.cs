using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Carter;

namespace API.ApplicationModuls;

public class RolesModule(IMapper mapper) : CarterModule
{
    private readonly IMapper _mapper = mapper;
    public override void AddRoutes(IEndpointRouteBuilder app)
    {
        
    }
}
