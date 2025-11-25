import Hero from './components/Hero';
import Link from 'next/link';

export default function Home() {
  const featuredServices = [
    { id: 1, title: 'Graphic Design', description: 'Logos, posters, and more.', user: 'Alice', image: 'https://images.unsplash.com/photo-1572044162444-24c95c8859da?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 2, title: 'Tutoring in Math', description: 'Calculus, Algebra, etc.', user: 'Bob', image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 3, title: 'Coding Help', description: 'Python, JavaScript, and Java assignments.', user: 'Charlie', image: 'https://images.unsplash.com/photo-1534665482403-a909d0d97c67?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  ];

  return (
    <>
      <Hero />
      <div className="container mt-5">
        <h2 className="text-center mb-4">Featured Services</h2>
        <div className="row">
          {featuredServices.map((service) => (
            <div key={service.id} className="col-md-4 mb-4">
              <div className="card h-100">
                <img src={service.image} className="card-img-top" alt={service.title} style={{ height: '200px', objectFit: 'cover' }} />
                <div className="card-body">
                  <h5 className="card-title">{service.title}</h5>
                  <p className="card-text">{service.description}</p>
                  <Link href={`/services/${service.id}`} className="btn btn-primary">
                    Learn More
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
    </>
  );
}
