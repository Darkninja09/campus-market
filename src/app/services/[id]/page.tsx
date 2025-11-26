'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { allServices } from '@/app/lib/servicesData';

export default function ServiceDetailPage() {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);

  const service = allServices.find((s) => s.id === Number(id));

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  if (!service) {
    return (
      <div>
        <h1>Service not found</h1>
        <Link href="/services">Back to services</Link>
      </div>
    );
  }

  return (
    <div>
      <div className="row">
        <div className="col-md-8">
          <img src={service.image} className="img-fluid" alt={service.title} />
        </div>
        <div className="col-md-4">
          <h1>{service.title}</h1>
          <p>{service.description}</p>
          <p>
            <strong>Category:</strong> {service.category}
          </p>
          <p>
            <strong>User:</strong> {service.user}
          </p>
          <button className="btn btn-success" onClick={toggleModal}>
            Contact Seller
          </button>
        </div>
      </div>

      {showModal && (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Contact {service.user}</h5>
                <button type="button" className="btn-close" onClick={toggleModal}></button>
              </div>
              <div className="modal-body">
                <p>You are about to contact {service.user} for the service "{service.title}".</p>
                <form>
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">Your Message</label>
                    <textarea className="form-control" id="message" rows={3}></textarea>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={toggleModal}>Close</button>
                <button type="button" className="btn btn-primary">Send Message</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
