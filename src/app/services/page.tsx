'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ServicesPage() {
  const allServices = [
    { id: 1, title: 'Graphic Design', description: 'Logos, posters, and more.', user: 'Alice', category: 'Design', image: 'https://images.unsplash.com/photo-1572044162444-24c95c8859da?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 2, title: 'Tutoring in Math', description: 'Calculus, Algebra, etc.', user: 'Bob', category: 'Tutoring', image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 3, title: 'Coding Help', description: 'Python, JavaScript, and Java assignments.', user: 'Charlie', category: 'Tech', image: 'https://images.unsplash.com/photo-1534665482403-a909d0d97c67?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 4, title: 'Music Editing', description: 'Mixing and mastering tracks.', user: 'David', category: 'Creative', image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 5, title: 'Photography', description: 'Portraits and event photography.', user: 'Eve', category: 'Creative', image: 'https://images.unsplash.com/photo-1520342892973-4f3b6a9b5f5b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  ];

  const [services, setServices] = useState(allServices);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    filterServices(e.target.value, category);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    filterServices(searchTerm, e.target.value);
  };

  const filterServices = (search: string, cat: string) => {
    let filtered = allServices;
    if (cat !== 'All') {
      filtered = filtered.filter((service) => service.category === cat);
    }
    if (search) {
      filtered = filtered.filter((service) =>
        service.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    setServices(filtered);
  };

  return (
    <div>
      <h1 className="mb-4">Explore Services</h1>
      <div className="row mb-4">
        <div className="col-md-8">
          <input
            type="text"
            className="form-control"
            placeholder="Search for services..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="col-md-4">
          <select className="form-select" value={category} onChange={handleCategoryChange}>
            <option value="All">All Categories</option>
            <option value="Design">Design</option>
            <option value="Tutoring">Tutoring</option>
            <option value="Tech">Tech</option>
            <option value="Creative">Creative</option>
          </select>
        </div>
      </div>
      <div className="row">
        {services.map((service) => (
          <div key={service.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img src={service.image} className="card-img-top" alt={service.title} style={{ height: '200px', objectFit: 'cover' }} />
              <div className="card-body">
                <h5 className="card-title">{service.title}</h5>
                <p className="card-text">{service.description}</p>
                <Link href={`/services/${service.id}`} className="btn btn-primary">
                  View Details
                </Link>
              </div>
              <div className="card-footer">
                <small className="text-muted">Offered by {service.user}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
