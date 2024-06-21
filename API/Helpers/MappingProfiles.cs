using API.Dto_s;
using AutoMapper;
using Core.Entities;
using Core.Entities.Course;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<AppUser, UserDto>();
            CreateMap<AppUser, UserReturnDto>();
            CreateMap<AppUser, AddressDto>()
                                .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.Address.FirstName))
                                .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.Address.LastName))
                                .ForMember(dest => dest.State, opt => opt.MapFrom(src => src.Address.State))
                                .ForMember(dest => dest.Street, opt => opt.MapFrom(src => src.Address.Street))
                                .ForMember(dest => dest.City, opt => opt.MapFrom(src => src.Address.City))
                                .ForMember(dest => dest.ZipCode, opt => opt.MapFrom(src => src.Address.ZipCode));
            CreateMap<Address, AddressDto>().ReverseMap();
            CreateMap<Course, CourseDto>()
                                .ForMember(dest => dest.Contents, opt => opt.MapFrom(src => src.Contents)).ReverseMap();

        }
    }
}
