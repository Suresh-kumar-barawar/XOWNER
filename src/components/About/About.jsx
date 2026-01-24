import React from 'react';
import { FaShieldAlt, FaUsers, FaGlobe, FaHandshake, FaRocket, FaHeart, FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';

const About = () => {
  const features = [
    {
      icon: <FaShieldAlt />,
      title: 'Secure Trading',
      description: 'Safe and secure platform for all your electronic device transactions'
    },
    {
      icon: <FaUsers />,
      title: 'Trusted Community',
      description: 'Join thousands of verified buyers and sellers in our marketplace'
    },
    {
      icon: <FaGlobe />,
      title: 'Wide Reach',
      description: 'Connect with users across India for the best deals and exchanges'
    },
    {
      icon: <FaHandshake />,
      title: 'Fair Deals',
      description: 'Transparent pricing and honest product descriptions guaranteed'
    }
  ];

  const team = [
    {
      name: 'Rajesh Kumar',
      role: 'Founder & CEO',
      image: 'https://ui-avatars.com/api/?name=Rajesh+Kumar&background=007bff&color=fff&size=150',
      social: { linkedin: '#', twitter: '#' }
    },
    {
      name: 'Priya Sharma',
      role: 'CTO',
      image: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=28a745&color=fff&size=150',
      social: { linkedin: '#', github: '#' }
    },
    {
      name: 'Amit Patel',
      role: 'Head of Operations',
      image: 'https://ui-avatars.com/api/?name=Amit+Patel&background=ffc107&color=000&size=150',
      social: { linkedin: '#', twitter: '#' }
    }
  ];

  const stats = [
    { number: '50K+', label: 'Active Users' },
    { number: '1M+', label: 'Products Listed' },
    { number: '25+', label: 'Cities Covered' },
    { number: '4.8/5', label: 'User Rating' }
  ];

  return (
    <div className="about-container">
      <div className="about-hero">
        <div className="hero-content">
          <h1>About XOWNER</h1>
          <p>India's most trusted marketplace for buying, selling, and exchanging electronic devices</p>
        </div>
      </div>

      <div className="about-content">
        <section className="mission-section">
          <div className="section-header">
            <h2>Our Mission</h2>
            <p>Making electronic device trading simple, secure, and accessible for everyone</p>
          </div>
          
          <div className="mission-content">
            <div className="mission-text">
              <p>
                At XOWNER, we believe that everyone should have access to quality electronic devices 
                at fair prices. Our platform connects buyers and sellers across India, creating a 
                trusted ecosystem where technology changes hands safely and efficiently.
              </p>
              <p>
                Whether you're looking to upgrade your smartphone, sell your laptop, or exchange 
                your tablet for something new, XOWNER provides the tools and community to make 
                it happen seamlessly.
              </p>
            </div>
            <div className="mission-stats">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="features-section">
          <div className="section-header">
            <h2>Why Choose XOWNER?</h2>
            <p>We're committed to providing the best experience for our users</p>
          </div>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="story-section">
          <div className="section-header">
            <h2>Our Story</h2>
            <p>From idea to India's leading electronics marketplace</p>
          </div>
          
          <div className="story-content">
            <div className="story-text">
              <div className="story-item">
                <div className="year">2022</div>
                <div className="story-details">
                  <h4>The Beginning</h4>
                  <p>Started as a small project to help friends buy and sell used electronics safely</p>
                </div>
              </div>
              
              <div className="story-item">
                <div className="year">2023</div>
                <div className="story-details">
                  <h4>Growing Community</h4>
                  <p>Expanded to 10 cities with over 10,000 active users and verified sellers</p>
                </div>
              </div>
              
              <div className="story-item">
                <div className="year">2024</div>
                <div className="story-details">
                  <h4>National Presence</h4>
                  <p>Now serving 25+ cities across India with 50,000+ users and 1M+ listings</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="team-section">
          <div className="section-header">
            <h2>Meet Our Team</h2>
            <p>The passionate people behind XOWNER</p>
          </div>
          
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-card">
                <div className="member-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="member-info">
                  <h4>{member.name}</h4>
                  <p>{member.role}</p>
                  <div className="social-links">
                    {member.social.linkedin && (
                      <a href={member.social.linkedin} aria-label="LinkedIn">
                        <FaLinkedin />
                      </a>
                    )}
                    {member.social.twitter && (
                      <a href={member.social.twitter} aria-label="Twitter">
                        <FaTwitter />
                      </a>
                    )}
                    {member.social.github && (
                      <a href={member.social.github} aria-label="GitHub">
                        <FaGithub />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="values-section">
          <div className="section-header">
            <h2>Our Values</h2>
            <p>The principles that guide everything we do</p>
          </div>
          
          <div className="values-content">
            <div className="value-item">
              <FaHeart className="value-icon" />
              <h4>Customer First</h4>
              <p>Every decision we make puts our users' needs and safety first</p>
            </div>
            
            <div className="value-item">
              <FaShieldAlt className="value-icon" />
              <h4>Trust & Transparency</h4>
              <p>Building trust through honest communication and transparent processes</p>
            </div>
            
            <div className="value-item">
              <FaRocket className="value-icon" />
              <h4>Innovation</h4>
              <p>Continuously improving our platform with cutting-edge technology</p>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-content">
            <h2>Ready to Join XOWNER?</h2>
            <p>Start buying, selling, and exchanging electronic devices today</p>
            <div className="cta-buttons">
              <button className="cta-btn primary">Start Selling</button>
              <button className="cta-btn secondary">Browse Products</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;