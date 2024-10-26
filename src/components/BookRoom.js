import React, { useState, useEffect } from "react";
import './BookRoom.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from "sweetalert2";

const BookRoom = () => {
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

  const [isLoading, setIsLoading] = useState(false);
  const [roomData, setRoomData] = useState([]);

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await fetch(
          'https://script.google.com/macros/s/AKfycbzPzDx1Qsy7yYskighHvnZHhIraV2bfftInuzGhafZCYM5C0K8BzjRZfvmOXlWrDJTr/exec'
        );
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setRoomData(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRoomData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      setFormData({ ...formData, [name]: value.replace(/[0-9]/g, '') });
    } else if (name === "mobile") {
      const numberOnly = value.replace(/[^0-9]/g, '');
      if (numberOnly.length <= 10) {
        setFormData({ ...formData, [name]: numberOnly });
      }
    } else if (name === "numberOfGuests") {
      setFormData({ ...formData, [name]: Math.max(1, parseInt(value, 10)).toString() });
    } else if (name === "numberOfRooms") {
      let rooms = parseInt(value, 10);
      const maxRooms = formData.location === "Dantewada" ? 6 : 2;
      setFormData({ ...formData, [name]: Math.min(maxRooms, Math.max(1, rooms)).toString() });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleDateChange = (date, fieldName) => {
    setFormData({ ...formData, [fieldName]: date });
  };

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const checkInTime = formatDate(formData.checkInDate);
    const checkOutTime = formatDate(formData.checkOutDate);

    const dataToSend = {
      checkInTime,
      checkOutTime,
      fullName: formData.name,
      moNo: formData.mobile,
      location: formData.location,
      customerType: formData.userType === "ordinary" ? "Non-Government" : "Government Official",
      aadharPan: 'ABCDE1234F',
      noOffRoom: formData.numberOfRooms,
      total_Guest: formData.numberOfGuests,
    };

    const unavailableDates = [];
    let currentDate = new Date(formData.checkInDate);

    while (currentDate <= formData.checkOutDate) {
      const formattedDate = formatDate(currentDate);
      const roomDataForDate = roomData.data.find(entry => entry.date === formattedDate);

      if (roomDataForDate) {
        const availableRooms = roomDataForDate.room_data
          .filter(room => room.location === formData.location)
          .reduce((sum, room) => sum + room.available_room, 0);

        if (availableRooms < formData.numberOfRooms) unavailableDates.push(formattedDate);
      } else {
        unavailableDates.push(formattedDate);
      }
      
      currentDate.setDate(currentDate.getDate() + 1);
    }

    if (unavailableDates.length > 0) {
      Swal.fire({
        title: "Error!",
        text: `Rooms are not available for the following dates: ${unavailableDates.join(', ')}`,
        icon: "error",
      });
      setIsLoading(false);
      return;
    }

    fetch('https://script.google.com/macros/s/AKfycbzkDniAc1GxNSGyJheMRyd5GvA3LpBZbwrM3Gu9eK96_AcC2gXaQ5ffI6CfuNC3nEm8/exec', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSend),
      mode: "no-cors",
    })
      .then(() => {
        setFormData({
          name: "",
          mobile: "",
          userType: "ordinary",
          checkInDate: new Date(),
          checkOutDate: new Date(new Date().setDate(new Date().getDate() + 1)),
          location: "Dantewada",
          numberOfGuests: "",
          numberOfRooms: "",
        });

        Swal.fire({
          title: "Success!",
          text: "Your booking has been submitted successfully.",
          icon: "success",
        });

        setTimeout(fetchRoomData, 2000);
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire({
          title: "Error",
          text: "Error occurred during booking.",
          icon: "error",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className="book-room-bg-overlay"></div>
      <div className="book-room-form">
        <h2>Plan Your Stay With Us</h2>
        <form onSubmit={handleSubmit}>
          <div className="book-room-form-group">
            <label> Full Name:</label>
            <input
              className="book-room-input"
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="book-room-form-group">
            <label> Mobile Number:</label>
            <input
              className="book-room-input"
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="book-room-form-group">
            <label>Select location:</label>
            <select
              className="book-room-select"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
            >
              <option value="Dantewada">Dantewada</option>
              <option value="Geedam">Geedam</option>
              <option value="Barsoor">Barsoor</option>
            </select>
          </div>
          <div className="book-room-form-group">
            <label>Number of Guests:</label>
            <input
              className="book-room-input"
              type="number"
              name="numberOfGuests"
              value={formData.numberOfGuests}
              onChange={handleInputChange}
              required
              min="1"
            />
          </div>
          <div className="book-room-form-group">
            <label>Number of Rooms:</label>
            <input
              className="book-room-input"
              type="number"
              name="numberOfRooms"
              value={formData.numberOfRooms}
              onChange={handleInputChange}
              required
              min="1"
            />
          </div>
          <div className="book-room-date-container">
            <div className="book-room-form-group">
              <label>Check-in Date:</label>
              <DatePicker
                selected={formData.checkInDate}
                onChange={(date) => handleDateChange(date, 'checkInDate')}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                className="book-room-date-picker"
              />
            </div>
            <div className="book-room-form-group">
              <label>Check-out Date:</label>
              <DatePicker
                selected={formData.checkOutDate}
                onChange={(date) => handleDateChange(date, 'checkOutDate')}
                dateFormat="dd/MM/yyyy"
                minDate={formData.checkInDate}
                className="book-room-date-picker"
              />
            </div>
          </div>
          <div className="book-room-form-group">
            <label>Type:</label>
            <select
              className="book-room-select"
              name="userType"
              value={formData.userType}
              onChange={handleInputChange}
              required
            >
              <option value="ordinary">Non-Government</option>
              <option value="official">Government Official</option>
            </select>
          </div>
          <button className="book-room-button" type="submit" disabled={isLoading}>
            {isLoading ? "Booking..." : "Book Room"}
          </button>
        </form>
      </div>
    </>
  );
};

export default BookRoom;

