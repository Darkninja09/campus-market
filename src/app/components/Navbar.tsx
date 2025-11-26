'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = document.cookie.split('; ').find(row => row.startsWith('auth_token='));
    setIsAuthenticated(!!token);
  }, [pathname]);

  const handleLogout = async () => {
    const response = await fetch('/api/logout', {
      method: 'POST',
    });

    if (response.ok) {
      setIsAuthenticated(false);
      window.location.href = '/';
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link href="/" className="navbar-brand">
          <i className="bi bi-shop me-2"></i>
          Campus Market
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>
                <i className="bi bi-house-door me-1"></i>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/services" className={`nav-link ${pathname === '/services' ? 'active' : ''}`}>
                <i className="bi bi-briefcase me-1"></i>
                Services
              </Link>
            </li>
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link href="/profile" className={`nav-link ${pathname === '/profile' ? 'active' : ''}`}>
                    <i className="bi bi-person-circle me-1"></i>
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <button onClick={handleLogout} className="btn btn-danger ms-lg-2">
                    <i className="bi bi-box-arrow-right me-1"></i>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link href="/login" className="btn btn-primary ms-lg-2">
                    <i className="bi bi-box-arrow-in-right me-1"></i>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/signup" className="btn btn-success ms-lg-2">
                    <i className="bi bi-person-plus me-1"></i>
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
