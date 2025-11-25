import Link from 'next/link';
import './Home.css';

export default function Hero() {
  return (
    <div className="hero-section">
      <div className="container text-center">
        <h1 className="display-4 text-white">Find the Best Services on Campus</h1>
        <p className="lead text-white-50">
          A peer-to-peer marketplace for students to exchange services and skills.
        </p>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <Link href="/services" className="btn btn-primary btn-lg">
            <i className="bi bi-search me-2"></i>
            Explore Services
          </Link>
          <Link href="/profile#offer-skill" className="btn btn-light btn-lg">
            <i className="bi bi-tag me-2"></i>
            Offer a Skill
          </Link>
        </div>
      </div>
    </div>
  );
}
