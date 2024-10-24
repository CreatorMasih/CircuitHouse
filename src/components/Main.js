import React from 'react';
import Header from './Header';
import ImageSlider from './ImageSlider';
import BookingForm from './BookingForm';
import '../App.css';
import RoomAvailabilityCalendar from './RoomAvailabilityCalendar';
import TermsAndConditions from './TermsAndConditions';
import Footer from './Footer.js'
import '@fortawesome/fontawesome-free/css/all.min.css';


const Main = () => {
  return (
    <div className="app">
      <Header />
      <ImageSlider />
      
      {/* Centered Section for Comment and Availability Heading */}
      <div className="centered-section">
        <p className="comfort-comment">Your Comfort Is Our Priority!</p>
        <h2 className="availability-heading">
          Check Availability | उपलब्धता जांचें
        </h2>
      </div>

      <BookingForm />
      <RoomAvailabilityCalendar />
      <TermsAndConditions />
      <Footer />
    </div>
  );
};

export default Main;
