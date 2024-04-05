﻿using Core.Contracts;
using Core.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Implementaions
{
    public class GenericRepository<T> : IGenericRepository<T> where T : User
    {
        private readonly IdentityDbContext _context;

        public GenericRepository(IdentityDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _context.Set<T>().ToListAsync();

        }

        public async Task<T?> GetAsync(int id)
        {
            if (id == 0) { return null; }
            return await _context.Set<T>().FindAsync(id);
        }

        public async Task<T?> GetAsync(string name)
        {
            if (string.IsNullOrEmpty(name)) { return null; }
            return await _context.Set<T>().FirstOrDefaultAsync(x => x.NormalizedUserName == name.ToUpper());
        }


    }
}