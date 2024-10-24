import React from 'react';
import './TermsAndConditions.css'; // CSS file for this component

const TermsAndConditions = () => {
  return (
    <div className="terms-and-conditions">
      <h2 className="terms-title">Terms and Conditions / नियम और शर्तें</h2>
      
      <div className="terms-container">
        {/* English Section */}
        <div className="terms-section english">
          <p className="terms-text">
            By booking a room at our Circuit House, you agree to the following terms and conditions:
          </p>
          <ul className="terms-list">
            <li>Booking is non-transferable and non-refundable within 24 hours of check-in.</li>
            <li>No food facilities are provided. Guests must arrange their own meals.</li>
            <li>Check-in from 2:00 PM, check-out by 12:00 PM.</li>
            <li>Guests must provide valid identification upon check-in.</li>
            <li>Any property damages caused by the guest will incur additional charges.</li>
            <li>Circuit House is not liable for lost or stolen items.</li>
            <li>No smoking is allowed inside the premises.</li>
            <li>Pets are not allowed.</li>
          </ul>
        </div>

        {/* Hindi Section */}
        <div className="terms-section hindi">
          <p className="terms-text">
            हमारे सर्किट हाउस में कमरा बुक करके, आप निम्नलिखित नियम और शर्तों से सहमत होते हैं:
          </p>
          <ul className="terms-list">
            <li>बुकिंग गैर-हस्तांतरणीय है और चेक-इन से 24 घंटे के भीतर गैर-वापसी योग्य है।</li>
            <li>कोई भोजन सुविधा उपलब्ध नहीं है। अतिथियों को अपने भोजन की व्यवस्था स्वयं करनी होगी।</li>
            <li>चेक-इन समय दोपहर 2:00 बजे से है और चेक-आउट समय दोपहर 12:00 बजे तक है।</li>
            <li>अतिथियों को चेक-इन के समय वैध पहचान पत्र दिखाना आवश्यक है।</li>
            <li>अतिथि द्वारा संपत्ति को नुकसान पहुंचाने पर अतिरिक्त शुल्क लगेगा।</li>
            <li>सर्किट हाउस खोए या चोरी हुए सामान के लिए उत्तरदायी नहीं है।</li>
            <li>परिसर के अंदर धूम्रपान की अनुमति नहीं है।</li>
            <li>पालतू जानवरों की अनुमति नहीं है।</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
