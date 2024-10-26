import React, { useState, useEffect } from "react";
import './BookRoom.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from "sweetalert2";

const AddBooking = ({ bookingUrl }) => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    userType: "ordinary",
    checkInDate: new Date(),
    checkOutDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    location: "Dantewada",
    numberOfGuests: "",
    numberOfRooms: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [roomData, setRoomData] = useState([]);

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await fetch(
          `${bookingUrl}?location=${formData.location}`
        );
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setRoomData(data);
      } catch (err) {
        console.error("Room data fetch error:", err.message);
      }
    };
    fetchRoomData();
  }, [formData.location, bookingUrl]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let validatedValue = value;

    // Validation cases
    if (name === "name") validatedValue = value.replace(/[0-9]/g, '');
    else if (name === "mobile") validatedValue = value.replace(/[^0-9]/g, '').slice(0, 10);
    else if (name === "numberOfGuests") validatedValue = Math.max(1, parseInt(value, 10) || 1).toString();
    else if (name === "numberOfRooms") {
      const maxRooms = formData.location === "Dantewada" ? 6 : 2;
      validatedValue = Math.max(1, Math.min(parseInt(value, 10), maxRooms)).toString();
    }

    setFormData((prevData) => ({ ...prevData, [name]: validatedValue }));
  };

  const handleDateChange = (date, fieldName) => setFormData({ ...formData, [fieldName]: date });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const apiUrl = bookingUrl;

    const formatDateTime = (date) => new Intl.DateTimeFormat('en-US', {
      year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit',
      minute: '2-digit', hour12: true
    }).format(date).replace(/,/g, '');

    const checkInTime = formatDateTime(formData.checkInDate);
    const checkOutTime = formatDateTime(formData.checkOutDate);

    const dataToSend = {
      checkInTime, checkOutTime, fullName: formData.name,
      moNo: formData.mobile, location: formData.location,
      customerType: formData.userType === "ordinary" ? "Non-Government" : "Government Official",
      aadharPan: 'ABCDE1234F',
      noOffRoom: formData.numberOfRooms,
      total_Guest: formData.numberOfGuests,
    };

    try {
      await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
        mode: "no-cors",
      });
      Swal.fire("Success!", "Booking has been successfully added.", "success");
      setFormData({
        name: "", mobile: "", userType: "ordinary", checkInDate: new Date(),
        checkOutDate: new Date(new Date().setDate(new Date().getDate() + 1)),
        location: "Dantewada", numberOfGuests: "", numberOfRooms: ""
      });
      setIsSubmitted(true);
    } catch (error) {
      Swal.fire("Error!", "An error occurred during booking.", "error");
      console.error("Booking error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="book-room-form">
      <h2>Add New Booking</h2>
      <form onSubmit={handleSubmit}>
        {/* Form fields, identical to BookRoom component */}
        {/* Name, Mobile, Location, Number of Guests, Number of Rooms, Check-in/out, User Type */}
        {/* Button */}
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Booking"}
        </button>
      </form>
    </div>
  );
};

export default AddBooking;
