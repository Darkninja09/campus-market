'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [college, setCollege] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/profile');
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUser(data.user);
        setCollege(data.user.college || '');
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleCollegeUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ college }),
      });

      if (!response.ok) {
        throw new Error('Failed to update college');
      }

      const data = await response.json();
      setUser(data.user);
      alert('College updated successfully');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogout = async () => {
    const response = await fetch('/api/logout', {
      method: 'POST',
    });

    if (response.ok) {
      router.push('/');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  const offeredServices = [
    { id: 1, title: 'Graphic Design', description: 'Logos, posters, and more.', image: 'https://images.unsplash.com/photo-1572044162444-24c95c8859da?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 2, title: 'Web Development', description: 'Building modern and responsive websites.', image: 'https://images.unsplash.com/photo-1534665482403-a909d0d97c67?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  ];

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 text-center">
          <img src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} alt={user.name} className="img-fluid rounded-circle mb-3" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
          <h3>{user.name}</h3>
          <p className="text-muted">{user.email}</p>
        </div>
        <div className="col-md-8">
          <h4>About Me</h4>
          <p>{user.bio || 'No bio yet.'}</p>
          <hr />
          <h4>Update College</h4>
          <form onSubmit={handleCollegeUpdate}>
            <div className="mb-3">
              <label htmlFor="college" className="form-label">College</label>
              <input
                type="text"
                className="form-control"
                id="college"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Update College</button>
          </form>
          <div className="mt-3">
            <button onClick={handleLogout} className="btn btn-danger">
              <i className="bi bi-box-arrow-right me-1"></i>
              Logout
            </button>
          </div>
          <hr />
          <h4>My Services</h4>
          <div className="row">
            {offeredServices.map((service) => (
              <div key={service.id} className="col-md-6 mb-4">
                <div className="card h-100">
                  <img src={service.image} className="card-img-top" alt={service.title} style={{ height: '150px', objectFit: 'cover' }} />
                  <div className="card-body">
                    <h5 className="card-title">{service.title}</h5>
                    <p className="card-text">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <hr />
          <div id="offer-skill">
            <h4>Offer a New Skill</h4>
            <form>
              <div className="mb-3">
                <label htmlFor="skillTitle" className="form-label">Skill Title</label>
                <input type="text" className="form-control" id="skillTitle" />
              </div>
              <div className="mb-3">
                <label htmlFor="skillDescription" className="form-label">Description</label>
                <textarea className="form-control" id="skillDescription" rows={3}></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Add Skill</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
