import React, { useEffect, useState } from 'react';
import "../components/Allbooking.css";

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]); // State for filtered customers
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState(''); // State for search input

    useEffect(() => {
        // Fetch data from the backend
        const fetchCustomers = async () => {
            try {
                const response = await fetch('https://circuithouse-1.onrender.com/api/customers', { // Update this URL
                    method: 'GET',
                    mode: 'cors', // Ensure CORS is set
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log(data);
                
                // Format the data based on the structure received from the API
                let formattedData = data.rooms; // Access the rooms array directly

                // Sort customers by check-in date (ascending order)
                formattedData = formattedData.sort((a, b) => new Date(a.checkInTime) - new Date(b.checkInTime));

                // Set the formatted data to state
                setCustomers(formattedData);
                setFilteredCustomers(formattedData); // Initially set to show all customers
            } catch (error) {
                setError('Error fetching data: ' + error.message);
            } finally {
                setLoading(false);
            }
        };
    
        fetchCustomers();
    }, []);
    
    // Handle search input change
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
    
        // Filter customers based on the search query (name or mobile number)
        const filtered = customers.filter(customer =>
            customer.fullName.toLowerCase().includes(query) || 
            customer.moNo.toString().includes(query) // Convert moNo to string
        );
        
        setFilteredCustomers(filtered);
    };

    // Render loading state, error message, or customer data
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='booking-list'>
            <h1 className='all-head'>Customers Bookings (History)</h1>
            
            {/* Search Box */}
            <input 
                type="text" 
                placeholder="Search by Name or Mobile Number" 
                value={searchQuery} 
                onChange={handleSearch} 
                className="search-input"
            />

            <div className="table-container">
                <table className='booking-table'>
                    <thead className='Allbooking-table-header sticky-header'>
                        <tr>
                            <th>ID</th>
                            <th>Check-In Date</th>
                            <th>Check-Out Date</th>
                            <th>Total Days</th>
                            <th>Created At</th>
                            <th>Full Name</th>
                            <th>Mobile No</th>
                            <th>Location</th>
                            <th>Customer Type</th>
                            <th>Aadhar/Pan</th>
                            <th>No of Rooms</th>
                            <th>Total Guests</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCustomers.map((customer) => (
                            <tr key={customer.id}>
                                <td>{customer.id}</td>
                                <td>{new Date(customer.checkInTime).toLocaleDateString()}</td>
                                <td>{new Date(customer.checkOutTime).toLocaleDateString()}</td>
                                <td>{customer.totalDays}</td>
                                <td>{customer.createdAt}</td>
                                <td>{customer.fullName}</td>
                                <td>{customer.moNo}</td>
                                <td>{customer.location}</td>
                                <td>{customer.customerType}</td>
                                <td>{customer.aadharPan}</td>
                                <td>{customer.noOffRoom}</td>
                                <td>{customer.totalGuest}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CustomerList;

