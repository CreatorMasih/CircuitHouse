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
    location: "Dantewada", // Set default location
    numberOfGuests: "",
    numberOfRooms: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // To show loading state
  const [roomData, setRoomData] = useState([]);


  useEffect(() => {
    // Fetch the room data from API
    const fetchRoomData = async () => {
      try {
        const response = await fetch(
          'https://script.google.com/macros/s/AKfycbykXHy-Z9XF3ZBKg_7-al0bYYBkhqP_-A3KMwEYleL0A6M8t0LSHzEgqYY7zP_ZTkC5/exec'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setRoomData(data);
        console.log(data)
      } catch (err) {
        // setError(err.message);
      } finally {
        // setLoading(false);
      }
    };
    fetchRoomData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validation for Name (Only allow text, no numbers)
    if (name === "name") {
      const textOnly = value.replace(/[0-9]/g, ''); // Remove numbers
      setFormData({
        ...formData,
        [name]: textOnly,
      });
    }

    // Validation for Mobile Number (Only allow numbers, limit to 10 digits)
    else if (name === "mobile") {
      const numberOnly = value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
      if (numberOnly.length <= 10) { // Limit to 10 digits
        setFormData({
          ...formData,
          [name]: numberOnly,
        });
      }
    }

    // Validation for Number of Guests (Minimum 1, no upper limit)
    else if (name === "numberOfGuests") {
      let guests = parseInt(value, 10);
      if (guests < 1) guests = 1; // Set minimum value to 1
      setFormData({
        ...formData,
        [name]: guests.toString(),
      });
    }

    // Validation for Number of Rooms based on location
    else if (name === "numberOfRooms") {
      let rooms = parseInt(value, 10);

      // Set location-based room limits
      let maxRooms;
      switch (formData.location) {
        case 'Dantewada':
          maxRooms = 6;
          break;
        case 'Barsoor':
        case 'Geedam':
          maxRooms = 2;
          break;
        default:
          maxRooms = 10; // Default max rooms if location changes
      }

      if (rooms < 1) rooms = 1; // Set minimum value to 1
      if (rooms > maxRooms) rooms = maxRooms; // Apply location-based max rooms
      setFormData({
        ...formData,
        [name]: rooms.toString(),
      });
    }

    // Handle other input fields normally
    else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleDateChange = (date, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: date,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state
    console.log(formData, 'This is the form Rooms Data-----');


    const apiUrl = 'https://script.google.com/macros/s/AKfycbzsd7W4vDo4C8RHC9Rt85ix4xf14eqm6AJj2C0FQbwP1SdJe4fdB2GXVEkya2ZATnyx/exec'; // Replace with your API URL

    // Format the check-in and check-out dates
    const formatDateTime = (date) => {
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      };
      return new Intl.DateTimeFormat('en-US', options).format(date).replace(/,/g, '').replace(' ', ' '); // Remove extra commas and space
    };

    const checkInTime = formatDateTime(formData.checkInDate);
    const checkOutTime = formatDateTime(formData.checkOutDate);

    // Prepare the payload to send to the server
    const dataToSend = {
      checkInTime,
      checkOutTime,
      fullName: formData.name,
      moNo: formData.mobile,
      location: formData.location,
      customerType: formData.userType === "ordinary" ? "Non-Government" : "Government Official",
      aadharPan: 'ABCDE1234F', // Static Aadhar/PAN value
      noOffRoom: formData.numberOfRooms,
      total_Guest: formData.numberOfGuests,
    };

    // Function to parse DD-MM-YYYY format into a Date object
    function parseDate(dateString) {
      if (typeof dateString === 'string') {
        var parts = dateString.split('-'); // Assuming the format is DD-MM-YYYY
        return new Date(parts[2], parts[1] - 1, parts[0]); // Create Date object (months are 0-indexed)
      }
      // If it's already a Date object, return it as-is
      return dateString instanceof Date ? dateString : new Date(dateString); // Ensure it's a Date object
    }


    // Function to format the date as 'DD-MM-YYYY'
    function formatDate(date) {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`; // Format: DD-MM-YYYY
    }

    // Assuming you have check-in and check-out dates as Date objects
    // let checkInTime = new Date("2024-10-20");
    // let checkOutTime = new Date("2024-10-21");

    // Calculate the day difference
    let netCheckInTime = new Date(checkInTime);
    let netCheckOutTime = new Date(checkOutTime);
    let dayDifference = Math.ceil((netCheckOutTime - netCheckInTime) / (1000 * 3600 * 24)); // Ensure positive difference
    let roomsNeeded = 1; // Adjust as necessary
    let unavailableDates = [];

    // Loop through each day in the range
    for (let day = 0; day < dayDifference; day++) {
      // Create a new Date object for each day
      let currentDate = new Date(netCheckInTime);
      currentDate.setDate(netCheckInTime.getDate() + day); // Move to the next day

      // Format the current date to match the structure
      let formattedCurrentDate = formatDate(currentDate);

      // Find the room data for the current date
      let currentRoomData = roomData.data.find(entry => entry.date === formattedCurrentDate);

      // Check if room data was found
      if (!currentRoomData) {
        console.log(`No room data available for ${formattedCurrentDate}`);
        unavailableDates.push(formattedCurrentDate); // Track unavailable dates
        continue; // Skip to the next date
      }

      // Count available rooms for the current date
      let availableRoomsForDate = 0;

      // Iterate over the room_data array
      for (const room of currentRoomData.room_data) {
        // Check for availability at the specified location
        if (room.available_room > 0 && room.location === formData.location) {
          availableRoomsForDate += room.available_room;
        }
      }

      console.log(availableRoomsForDate, 'Available rooms for:', formattedCurrentDate);

      // Check if there are enough available rooms
      if (availableRoomsForDate < roomsNeeded) {
        unavailableDates.push(formattedCurrentDate); // Track unavailable dates
      }
    }


    // If rooms are not available on any date, return an error response
    if (unavailableDates.length > 0) {
      // alert(`Rooms are not available for the following dates: ${unavailableDates.join(', ')}`);
      Swal.fire({
        title: "Error!",
        text: `Rooms are not available for the following dates: ${unavailableDates.join(', ')}`,
        icon: "error",
      });
      setIsLoading(false); // Reset loading state
      // return;
    } else {

      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
        mode: "no-cors",
      })
        .then((response) => {
          console.log("Success:", response);

          // Clear form data after submission
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

          // setIsSubmitted(true); // Set form as submitted
          Swal.fire({
            title: "Success!",
            text: "Your booking has been submitted successfully.",
            icon: "success",
          });
          console.log("Success:", roomData);

          setTimeout(() => {
            fetch('https://script.google.com/macros/s/AKfycbykXHy-Z9XF3ZBKg_7-al0bYYBkhqP_-A3KMwEYleL0A6M8t0LSHzEgqYY7zP_ZTkC5/exec')
              .then(response => response.json())
              .then(data => {
                console.log('Success:', data);
                setRoomData(data);
              })
              .catch((error) => {
                console.error("Error:", error);
                alert("Error occurred during booking.");
              });

          }
            , 2000);
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Error occurred during booking.");
        })
        .finally(() => {
          setIsLoading(false); // Reset loading state
        });
    }



  };

  return (
    <>
      <div className="book-room-bg-overlay"></div>
      <div className="book-room-form">
        <h2>Plan Your Stay With Us</h2>

        {isSubmitted ? (
          <div className="submission-success">
            <h3>Thank you! Your booking has been submitted successfully.</h3>
          </div>
        ) : (
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
              <label className="book-room-dif">Number of Rooms:</label>
              <input
                className="book-room-input"
                type="number"
                name="numberOfRooms"
                value={formData.numberOfRooms}
                onChange={handleInputChange}
                required
                min="1"
                max="10"
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
                <option value="government">Government Official</option>
              </select>
            </div>
            <button type="submit" className="book-room-btn-book-now" disabled={isLoading}>
              {isLoading ? "Booking..." : "Book Now"}
            </button>
          </form>
        )}
      </div>
    </>
  );
};




