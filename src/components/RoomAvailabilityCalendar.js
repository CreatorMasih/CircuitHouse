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
          'https://script.google.com/macros/s/AKfycbymCVh2pLtwKTr-YM2tAlKMqnfn3TMzCbg_mOnG_uJGW4l4ee5kBOD_T3iJlDj5yac2/exec?location=Geedam'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setRoomData(data);
        console.log(data)
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
    if (!roomData || !roomData.data) return [];
    return roomData.data.map((day) => ({
      date: day.date,
      room_data: day.room_data.filter(
        (room) => room.location === selectedLocation
      ),
    }));
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
          {locationRoomData.map((day, index) => (
            <React.Fragment key={index}>
              <div className="date-box">
              <div className="date-item">
                  {day.date}
              </div>
              </div>
              {day.room_data.length > 0 ? (
                day.room_data.map((room, i) => (
                  <React.Fragment key={i}>
                    <div className="room-item">
                      {room.available_room}
                    </div>
                    <div className="room-item">
                      {room.unavailable_room}
                    </div>
                    <div className="room-item">
                      {room.total_room}
                    </div>
                  </React.Fragment>
                ))
              ) : (
                <div className="room-item">No data for this day</div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
export default RoomAvailabilityCalendar;
