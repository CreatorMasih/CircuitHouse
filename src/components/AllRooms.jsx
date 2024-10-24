import React, { useState, useEffect } from 'react';
import './AllRooms.css';

const AllRooms = () => {
    const [location, setLocation] = useState('Dantewada');
    const [roomsData, setRoomsData] = useState({}); // Stores rooms for all locations
    const [filteredRooms, setFilteredRooms] = useState([]); // Stores rooms filtered by location

    // Total room count for each location
    const totalRooms = {
        'Dantewada': 6,
        'Geedam': 2,
        'Barsur': 2,
    };

    // Fetching the room data from the Google Apps Script
    const fetchRooms = async () => {
        try {
            let res = await fetch("https://script.google.com/macros/s/AKfycbzKkHTAVZLLk7DjCIv1Wzay-egQROJLuVBzqIyNH-9mkJ5kfhAaYxfbdq4ltVOutYw3/exec");
            let data = await res.json();

            // Ensure rooms data contains rooms for all locations and set state
            if (data.rooms) {
                setRoomsData(data.rooms);  // Save all rooms data
                setFilteredRooms(data.rooms[location] || []);  // Filter for initial location (Dantewada)
            } else {
                console.error('Expected data.rooms to contain room information:', data.rooms);
                setRoomsData({});
                setFilteredRooms([]);
            }
        } catch (error) {
            console.error('Error fetching rooms:', error);
        }
    };

    // useEffect to fetch the rooms on component mount and when location changes
    useEffect(() => {
        fetchRooms();
    }, []);

    // Update the filtered rooms when the location changes
    useEffect(() => {
        // Log the rooms data and location for debugging
        console.log(`Rooms for ${location}:`, roomsData[location]);

        // Set filtered rooms for the selected location
        setFilteredRooms(roomsData[location] || []);
    }, [location, roomsData]);

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };

    // Render rooms based on the total room count for the selected location
    const renderRooms = () => {
        const rooms = [];

        for (let i = 1; i <= totalRooms[location]; i++) {
            // Find the room by its index in the array (or fallback to "Available")
            const room = filteredRooms[i - 1]; // Assuming rooms are indexed based on room numbers

            // If no room is found, default to 'Available'
            const roomStatus = room ? room.status : 'Available';

            rooms.push(
                <tr key={`${i}-${location}`} className="table-row">
                    <td className="AllRooms-table-data">{i}</td> {/* Room number starting from 1 */}
                    <td className="AllRooms-table-data">{roomStatus}</td>
                </tr>
            );
        }

        return rooms;
    };

    return (
        <div className="room-list">
            <h2 className='room-head'>Room List For Today !</h2>

            {/* Location Filters */}
            <label htmlFor="location-select">Select Location:</label>
            <select id="location-select" value={location} onChange={handleLocationChange}>
                <option value="Dantewada">Dantewada</option>
                <option value="Barsur">Barsur</option>
                <option value="Geedam">Geedam</option>
            </select>

            {/* Room Table */}
            <table className="room-table">
                <thead>
                    <tr>
                        <th className="AllRooms-table-header">Room No.</th>
                        <th className="AllRooms-table-header">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {renderRooms()}
                </tbody>
            </table>
        </div>
    );
};

export default AllRooms;
