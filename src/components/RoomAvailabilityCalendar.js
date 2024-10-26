import React, { useState, useEffect } from 'react';
import './RoomAvailabilityCalendar.css';

const RoomAvailabilityCalendar = () => {
  const [roomData, setRoomData] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState('Dantewada');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the room data from API
    const fetchRoomData = async () => {
      try {
        const response = await fetch(
          // 'https://script.google.com/macros/s/AKfycbx8klWs3OtanH8THw6PUi-x0n0lyEtKw_RwWtGfpddrBc3OJ2Xo5_imesHb15gthY4_/exec?location=Geedam'
          https://script.google.com/macros/s/AKfycbx7IRBeLVJfX5Ch50xZf5J7G1xAQe_jZmbFVWN9HfiIsduQU12vrlLN0zCRpMCeyEGA/exec"
        );
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setRoomData(data);
        console.log(data); // Log the data to inspect its structure
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRoomData();
  }, []);

  // Filter room data based on selected location
  const getLocationRoomData = () => {
    if (!roomData || !roomData.rooms) return []; // Check for roomData and rooms property

    // Extract data for the selected location
    const selectedRooms = roomData.rooms[selectedLocation] || [];

    // Initialize counters
    const roomCounts = {
      available_rooms: 0,
      booked_rooms: 0,
      total_rooms: 0,
    };

    // Create an array of room availability
    const roomAvailability = selectedRooms.map((room) => {
      roomCounts.available_rooms += room.available_room || 0; // Sum available rooms
      roomCounts.booked_rooms += room.unavailable_room || 0; // Sum booked rooms
      roomCounts.total_rooms += room.total_room || 0; // Sum total rooms

      return {
        date: room.date || 'No date provided', // Ensure there’s a date
        available_room: room.available_room || 0, // Default to 0 if undefined
        unavailable_room: room.unavailable_room || 0, // Default to 0 if undefined
        total_room: room.total_room || 0, // Default to 0 if undefined
      };
    });

    // Add summary row for total counts
    if (roomAvailability.length > 0) {
      roomAvailability.push({
        date: 'Total',
        available_room: roomCounts.available_rooms,
        unavailable_room: roomCounts.booked_rooms,
        total_room: roomCounts.total_rooms,
      });
    }

    return roomAvailability;
  };

  const locationRoomData = getLocationRoomData();

  return (
    <div className="room-availability-calendar">
      <h2 className="calendar-title">Room Availability Calendar</h2>
      {/* Dropdown for selecting location */}
      <label htmlFor="location-select" className="loclab">
        Select Location:
      </label>
      <select
        id="location-select"
        value={selectedLocation}
        onChange={(e) => setSelectedLocation(e.target.value)}
      >
        <option value="Dantewada">Dantewada</option>
        <option value="Barsur">Barsur</option>
        <option value="Geedam">Geedam</option>
      </select>
      {/* Loading and error states */}
      {loading && <p>Loading room data...</p>}
      {error && <p>Error: {error}</p>}
      {/* Legend */}
      <div className="calendar-wrapper">
        <div className="calendar-table">
          <div className="room-header">Date</div>
          <div className="room-header">Available Rooms</div>
          <div className="room-header">Booked</div>
          <div className="room-header">Total Rooms</div>
          {locationRoomData.length > 0 ? (
            locationRoomData.map((room, index) => (
              <React.Fragment key={index}>
                <div className="date-box">
                  <div className="date-item">{room.date}</div>
                </div>
                <div className="room-item">{room.available_room}</div>
                <div className="room-item">{room.unavailable_room}</div>
                <div className="room-item">{room.total_room}</div>
              </React.Fragment>
            ))
          ) : (
            <div className="room-item">No data for this day</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomAvailabilityCalendar;
