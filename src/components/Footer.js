import React from 'react';
import './Footer.css'; // Import the CSS for the footer
import ng from '../assets/nglogo.png';
import nic from '../assets/niclogo.png';
import di from '../assets/dilogo.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <ul className="admin-details">
            <li>Name: Kamal Kishore</li>
            <li>Post/designation : Deputy Collector (Protocol Officer)</li>
            <li>Mobile number : +91 7354637303</li>
            {/* <li>Email: admin@example.com</li> */}
          </ul>
        </div>
      </div>
      <div className="footer-right">
        <div className="ownership">
          <p>
            © Dantewada, Chhattisgarh This Website Is Designed And Developed By 
            <a href="https://navgurukul.org/" target="_blank" rel="noopener noreferrer"> NavGurukul Dantewada </a>
            And Managed By 
            <a href="https://nic.in/" target="_blank" rel="noopener noreferrer"> National Informatics Centre </a>, 
            Ministry Of Electronics & Information Technology, Government Of India.
          </p>
          <p>Last Updated: <strong>Oct 09, 2024</strong></p>
          <div className="logos">
            <a href="https://www.navgurukul.org/" target="_blank" rel="noopener noreferrer">
              <img src={ng} alt="NavGurukul Logo" />
            </a>
            <a href="https://www.nic.in/" target="_blank" rel="noopener noreferrer">
              <img src={nic} alt="NIC Logo" />
            </a>
            <a href="https://www.digitalindia.gov.in/" target="_blank" rel="noopener noreferrer">
              <img src={di} alt="Digital India Logo" />
            </a>
          </div>
        </div>
        <div className="social-icons">
          <p>Connect with us on:</p>
          <a href="https://www.facebook.com/Dantewadadist" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://www.instagram.com/dantewada_district/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
