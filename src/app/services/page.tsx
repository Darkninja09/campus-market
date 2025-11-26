'use client';

import { useState } from 'react';
import Link from 'next/link';
import { allServices as initialServices } from '@/app/lib/servicesData';

export default function ServicesPage() {
  const [services, setServices] = useState(initialServices);
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
    let filtered = initialServices;
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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Explore Services</h1>
        <Link href="/services/new" className="btn btn-success">
          Offer a Skill
        </Link>
      </div>
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
