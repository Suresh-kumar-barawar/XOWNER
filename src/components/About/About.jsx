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
      name: 'Suresh Kumar',
      role: 'Founder & CEO',
      image: 'https://ui-avatars.com/api/?name=Suresh+Kumar&background=007bff&color=fff&size=150',
      social: { linkedin: '#', twitter: '#' }
    },
    {
      name: 'Nitin Kumar',
      role: 'CTO',
      image: 'https://ui-avatars.com/api/?name=Nitin+Kumar&background=28a745&color=fff&size=150',
      social: { linkedin: '#', github: '#' }
    },
    {
      name: 'Chander',
      role: 'Head of Operations',
      image: 'https://ui-avatars.com/api/?name=chander&background=ffc107&color=000&size=150',
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
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About XOWNER</h1>
          <p className="text-xl text-blue-100">India's most trusted marketplace for buying, selling, and exchanging electronic devices</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600">Making electronic device trading simple, secure, and accessible for everyone</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed">
                At XOWNER, we believe that everyone should have access to quality electronic devices 
                at fair prices. Our platform connects buyers and sellers across India, creating a 
                trusted ecosystem where technology changes hands safely and efficiently.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Whether you're looking to upgrade your smartphone, sell your laptop, or exchange 
                your tablet for something new, XOWNER provides the tools and community to make 
                it happen seamlessly.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-6 bg-white rounded-xl shadow-md">
                  <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose XOWNER?</h2>
            <p className="text-lg text-gray-600">We're committed to providing the best experience for our users</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="text-4xl text-primary mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-lg text-gray-600">From idea to India's leading electronics marketplace</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-start gap-6 p-6 bg-white rounded-xl shadow-md">
                <div className="flex-shrink-0 w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold">
                  2022
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">The Beginning</h4>
                  <p className="text-gray-600">Started as a small project to help friends buy and sell used electronics safely</p>
                </div>
              </div>
              
              <div className="flex items-start gap-6 p-6 bg-white rounded-xl shadow-md">
                <div className="flex-shrink-0 w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  2023
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Growing Community</h4>
                  <p className="text-gray-600">Expanded to 10 cities with over 10,000 active users and verified sellers</p>
                </div>
              </div>
              
              <div className="flex items-start gap-6 p-6 bg-white rounded-xl shadow-md">
                <div className="flex-shrink-0 w-16 h-16 bg-yellow-500 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  2024
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">National Presence</h4>
                  <p className="text-gray-600">Now serving 25+ cities across India with 50,000+ users and 1M+ listings</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600">The passionate people behind XOWNER</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="mb-4">
                  <img src={member.image} alt={member.name} className="w-24 h-24 rounded-full mx-auto" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h4>
                  <p className="text-gray-600 mb-4">{member.role}</p>
                  <div className="flex justify-center gap-3">
                    {member.social.linkedin && (
                      <a href={member.social.linkedin} className="text-blue-600 hover:text-blue-700 text-xl" aria-label="LinkedIn">
                        <FaLinkedin />
                      </a>
                    )}
                    {member.social.twitter && (
                      <a href={member.social.twitter} className="text-blue-400 hover:text-blue-500 text-xl" aria-label="Twitter">
                        <FaTwitter />
                      </a>
                    )}
                    {member.social.github && (
                      <a href={member.social.github} className="text-gray-700 hover:text-gray-900 text-xl" aria-label="GitHub">
                        <FaGithub />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600">The principles that guide everything we do</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <FaHeart className="text-4xl text-red-500 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Customer First</h4>
              <p className="text-gray-600">Every decision we make puts our users' needs and safety first</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <FaShieldAlt className="text-4xl text-green-500 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Trust & Transparency</h4>
              <p className="text-gray-600">Building trust through honest communication and transparent processes</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <FaRocket className="text-4xl text-purple-500 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Innovation</h4>
              <p className="text-gray-600">Continuously improving our platform with cutting-edge technology</p>
            </div>
          </div>
        </section>

        <section className="text-center py-16 bg-gradient-to-r from-primary to-primary-dark rounded-2xl text-white">
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-4">Ready to Join XOWNER?</h2>
            <p className="text-xl text-blue-100 mb-8">Start buying, selling, and exchanging electronic devices today</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-white text-primary rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                Start Selling
              </button>
              <button className="px-8 py-3 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-primary transition-colors">
                Browse Products
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;