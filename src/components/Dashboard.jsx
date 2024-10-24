import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = () => {
    const [selectedLocation, setSelectedLocation] = useState("Dantewada");
    const [dashboardData, setDashboardData] = useState({
        totalBookings: 0,
        roomsAvailable: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const handleLocationChange = (event) => {
        setSelectedLocation(event.target.value);
    };

    useEffect(() => {
        const fetchDashboardData = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await fetch(`http://localhost:5000/api/dashboard?location=${selectedLocation}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                console.log('Fetched data:', data);

                if (data.status === 'success') {
                    // Adjust this to use the 'summary' object
                    const { available, booked } = data.summary;
                    setDashboardData({
                        totalBookings: booked, // or total bookings you want to show
                        roomsAvailable: available,
                    });
                } else {
                    setError('Dashboard data is unavailable.');
                }
            } catch (err) {
                console.error('Error fetching dashboard data:', err);
                setError('Unable to fetch data, please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [selectedLocation]);

    return (
        <div className="dashboard-container">
            <h2 className='dashboard-heading'>Hello Sir!</h2>
            <label htmlFor="location-select">Select Location:</label>
            <select 
                id="location-select" 
                className="location-dropdown" 
                value={selectedLocation} 
                onChange={handleLocationChange}
            >
                <option value="Dantewada">Dantewada</option>
                <option value="Geedam">Geedam</option>
                <option value="Barsur">Barsoor</option>
            </select>
            {loading && <p className="loading-indicator">Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="dashboard-stats">
                <div className="dashboard-card">
                    <h3>Total Bookings</h3>
                    <p>{dashboardData.totalBookings !== undefined ? dashboardData.totalBookings : 0}</p>
                </div>
                <div className="dashboard-card">
                    <h3>Rooms Available</h3>
                    <p>{dashboardData.roomsAvailable !== undefined ? dashboardData.roomsAvailable : 0}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
