'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addService } from '@/app/lib/servicesData';

export default function NewServicePage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Design');
  const [image, setImage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newService = { title, description, category, image };
    addService(newService);
    router.push('/services');
  };

  return (
    <div>
      <h1>Offer a New Service</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Service Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Service Description</label>
          <textarea
            className="form-control"
            id="description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <select
            className="form-select"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Design">Design</option>
            <option value="Tutoring">Tutoring</option>
            <option value="Tech">Tech</option>
            <option value="Creative">Creative</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image URL</label>
          <input
            type="url"
            className="form-control"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
