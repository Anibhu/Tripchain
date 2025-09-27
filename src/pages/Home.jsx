import React from 'react';
import { Link } from 'react-router-dom';
import { getStats } from '../utils/storage';
import { Shield, QrCode, Smartphone } from 'lucide-react';
import heroBackgroundImage from '../styles/133816013698662877.jpg'; 
import '../styles/Home.css';

const Home = () => {
  const stats = getStats();

  return (
    <div className="page-container">
      {/* Enhanced Hero Section */}
      <div className="hero-main-section">
        <div className="hero-background-overlay"></div>
        <div className="hero-background-image">
          <img 
            src={heroBackgroundImage} 
            alt="Digital tourism safety concept with QR code and landmarks" 
          />
        </div>
        
        <div className="hero-content-wrapper">
          <h1 className="hero-main-title">
            Safe Travel,<br />
            <span className="hero-accent-text">Digital Trust</span>
          </h1>
          <p className="hero-description-text">
            Revolutionary blockchain-powered digital ID system ensuring tourist safety with 
            real-time tracking, emergency features, and instant verification.
          </p>
          
          <div className="hero-buttons-container">
            <Link to="/apply" className="hero-primary-btn">
              <Shield className="hero-btn-icon" />
              Get Digital Tourist ID
            </Link>
            <Link to="/app" className="hero-secondary-btn">
              <Smartphone className="hero-btn-icon" />
              Download Mobile App
            </Link>
          </div>

          {/* Stats Section */}
          <div className="hero-stats-grid">
            <div className="hero-stat-item">
              <h3 className="hero-stat-number">{stats.total}+</h3>
              <p className="hero-stat-label">IDs Issued</p>
            </div>
            <div className="hero-stat-item">
              <h3 className="hero-stat-number">{stats.approved}+</h3>
              <p className="hero-stat-label">Active IDs</p>
            </div>
          </div>
        </div>
      </div>

      {/* Rest of your existing content remains the same */}
      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">🆔</div>
          <h3>Apply for Digital ID</h3>
          <p>Create your secure digital tourist identity with KYC verification</p>
          <Link to="/apply" className="feature-link">Get Started →</Link>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">📱</div>
          <h3>QR Code Verification</h3>
          <p>Instant verification using QR codes scanned from mobile devices</p>
          <Link to="/verify" className="feature-link">Verify Now →</Link>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">⛓️</div>
          <h3>Blockchain Secured</h3>
          <p>All IDs are securely stored on our blockchain for tamper-proof records</p>
          <Link to="/admin" className="feature-link">Learn More →</Link>
        </div>
      </div>

      <div className="how-it-works">
        <div className="decorative-dots dots-1"></div>
        <div className="decorative-dots dots-2"></div>
        
        <h2>How It Works</h2>
        <div className="steps">
            <div className="step">
                <span className="step-number">1</span>
                <div className="step-icon">
                    <i className="fas fa-file-signature"></i>
                </div>
                <h4>Submit Application</h4>
                <p>Complete our streamlined online form with your personal details and travel itinerary</p>
            </div>
            <div className="step">
                <span className="step-number">2</span>
                <div className="step-icon">
                    <i className="fas fa-user-check"></i>
                </div>
                <h4>Identity Verification</h4>
                <p>Our advanced system securely validates your identity documents and information</p>
            </div>
            <div className="step">
                <span className="step-number">3</span>
                <div className="step-icon">
                    <i className="fas fa-id-card"></i>
                </div>
                <h4>Digital ID Creation</h4>
                <p>Receive your personalized digital identification with enhanced security features</p>
            </div>
            <div className="step">
                <span className="step-number">4</span>
                <div className="step-icon">
                    <i className="fas fa-qrcode"></i>
                </div>
                <h4>QR Code Generation</h4>
                <p>Obtain your unique QR code for swift verification at all authorized checkpoints</p>
            </div>
            <div className="step">
                <span className="step-number">5</span>
                <div className="step-icon">
                    <i className="fas fa-mobile-alt"></i>
                </div>
                <h4>Mobile Integration</h4>
                <p>Access your digital ID seamlessly through our dedicated mobile application</p>
            </div>
            <div className="step">
                <span className="step-number">6</span>
                <div className="step-icon">
                    <i className="fas fa-shield-alt"></i>
                </div>
                <h4>Secure Travel Experience</h4>
                <p>Enjoy a hassle-free journey with continuous protection and verification support</p>
            </div>
        </div>
      </div>

      <div className="contact-section">
        <h2>Contact Us</h2>
        <p className="contact-description">
          Have questions or need support? Reach out to our team and we'll get back to you quickly.
        </p>
        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="5" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Home;