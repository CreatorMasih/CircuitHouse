// import React, { useEffect, useState } from 'react';
// import "../components/Allbooking.css";

// const AllBooking = () => {
//     const [customers, setCustomers] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     // Function to fetch bookings from the backend
//     const fetchBookings = async () => {
//         try {
//             const response = await fetch('http://localhost:5000/api/dashboard?location=yourLocation'); // Update with correct server URL and location query

//             if (!response.ok) {
//                 throw new Error(`Error: ${response.statusText}`);
//             }

//             const data = await response.json();
            
//             if (data.status === 'success') {
//                 setCustomers(data.bookings || []); // Handle cases where bookings array might be empty or undefined
//             } else {
//                 setError(data.message || 'No bookings available');
//             }
//         } catch (err) {
//             setError('Error fetching bookings: ' + err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchBookings();
//     }, []);

//     return (
//         <div className="booking-list">
//             <h2 className='all-head'>Booking List</h2>
//             {loading && <p>Loading...</p>}
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//             <table className='booking-table'>
//                 <thead className='Allbooking-table-header'>
//                     <tr>
//                         <th className="Allbooking-table-header">Name</th>
//                         <th className="Allbooking-table-header">Phone</th>
//                         <th className="Allbooking-table-header">Room Type</th>
//                         <th className="Allbooking-table-header">Status</th>
//                         <th className="Allbooking-table-header">Location</th>
//                         <th className="Allbooking-table-header">Last Check-out Date</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {customers.map(customer => (
//                         <tr key={customer.id} className="table-row">
//                             <td className="Allbooking-table-data">{customer.name}</td>
//                             <td className="Allbooking-table-data">{customer.phone}</td>
//                             <td className="Allbooking-table-data">{customer.roomType}</td>
//                             <td className="Allbooking-table-data">{customer.status}</td>
//                             <td className="Allbooking-table-data">{customer.location}</td>
//                             <td className="Allbooking-table-data">{customer.lastCheckOutDate || 'N/A'}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// // export default AllBooking;
// import React, { useEffect, useState } from 'react';
// import "../components/Allbooking.css";

// const CustomerList = () => {
//     const [customers, setCustomers] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const [filteredCustomers, setFilteredCustomers] = useState([]); // New state for filtered data
//     const [selectedLocation, setSelectedLocation] = useState(''); // State for selected location

//     useEffect(() => {
//         // Fetch data from Google Sheets
//         const fetchCustomers = async () => {
//             try {
//                 const response = await fetch('https://script.google.com/macros/s/AKfycby6DMPxZjcharYUawfWHpOzrpuFyO5kosubVGtOIVAj1nN1DvjHbmpMj24vGO85JYI/exec', {
//                     method: 'GET',
//                     mode: 'cors', // Ensure CORS is set
//                 });

//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }

//                 const data = await response.json();
//                 console.log(data);
                
//                 // Format the data based on the structure received from the API
//                 const formattedData = data.rooms; // Access the rooms array directly

//                 // Set the formatted data to state
//                 setCustomers(formattedData);

//                 // Show all locations' current date data on load
//                 filterByDate(formattedData, '');
//             } catch (error) {
//                 setError('Error fetching data: ' + error.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchCustomers();
//     }, []);

//     // Function to filter customers based on location and current date
//     const filterByDate = (data, location) => {
//         const today = new Date().toLocaleDateString();
        
//         let filtered;
        
//         if (location === '') {
//             // Show all locations' bookings for today
//             filtered = data.filter(customer => {
//                 const checkInDate = new Date(customer.checkInTime).toLocaleDateString();
//                 return checkInDate === today;
//             });
//         } else {
//             // Show bookings for selected location and today's date
//             filtered = data.filter(customer => {
//                 const checkInDate = new Date(customer.checkInTime).toLocaleDateString();
//                 return customer.location === location && checkInDate === today;
//             });
//         }
        
//         setFilteredCustomers(filtered);
//     };

//     // Handle location selection change
//     const handleLocationChange = (location) => {
//         setSelectedLocation(location);
//         filterByDate(customers, location);
//     };

//     // Render loading state, error message, or customer data
//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>{error}</div>;
//     }

//     return (
//         <div className='booking-list'>
//             <h1 className='all-head'>Bookings For Today</h1>

//             {/* Filter dropdown */}
//             <div className="filter-section">
//                 <label htmlFor="location">Filter by Location:</label>
//                 <select
//                     id="location"
//                     value={selectedLocation}
//                     onChange={(e) => handleLocationChange(e.target.value)}
//                 >
//                     <option value="">All Locations (Current Date)</option>
//                     <option value="Dantewada">Dantewada</option>
//                     <option value="Geedam">Geedam</option>
//                     <option value="Barsoor">Barsoor</option>
//                 </select>
//             </div>

//             <table className='booking-table'>
//                 <thead className='Allbooking-table-header'>
//                     <tr>
//                         <th>ID</th>
//                         <th>Check-In Date</th>
//                         <th>Check-Out Date</th>
//                         <th>Total Days</th>
// {/*                         <th>Created At</th> */}
//                         <th>Full Name</th>
//                         <th>Mobile No</th>
//                         <th>Location</th>
//                         <th>Customer Type</th>
// {/*                         <th>Aadhar/Pan</th> */}
//                         <th>No of Rooms</th>
//                         <th>Total Guests</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {filteredCustomers.map((customer) => (
//                         <tr key={customer.id}>
//                             <td>{customer.id}</td>
//                             <td>{new Date(customer.checkInTime).toLocaleDateString()}</td>
//                             <td>{new Date(customer.checkOutTime).toLocaleDateString()}</td>
//                             <td>{customer.totalDays}</td>
// {/*                             <td>{customer.createdAt}</td> */}
//                             <td>{customer.fullName}</td>
//                             <td>{customer.moNo}</td>
//                             <td>{customer.location}</td>
//                             <td>{customer.customerType}</td>
// {/*                             <td>{customer.aadharPan}</td> */}
//                             <td>{customer.noOffRoom}</td>
//                             <td>{customer.totalGuest}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default CustomerList;
import React, { useEffect, useState } from 'react';
import "../components/Allbooking.css";

const AllBooking = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchDate, setSearchDate] = useState('');
    const [loadingRowId, setLoadingRowId] = useState(null);
    const [buttonA, setButtonA] = useState(false);
    const [buttonR, setButtonR] = useState(false);

    const API_BASE_URL = 'https://script.google.com/macros/s/AKfycbyk-6RM66Dc9rgUMrxVzYxQHsGCwNWamTTFsmWAVol0kdpS4JmwLSOQIT1vZ7vxnIth/exec';

    const fetchCustomers = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}?action=fetch`);
            if (!response.ok) throw new Error('Network response was not ok');
            
            const data = await response.json();
            if (data.rooms) {
                const formattedData = data.rooms;
                setCustomers(formattedData);
                filterCustomers(formattedData, searchQuery, searchDate, selectedLocation);
            } else {
                throw new Error("Data format is incorrect: 'rooms' property not found");
            }
        } catch (error) {
            setError('Error fetching data: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const filterCustomers = (data, query, date, location) => {
        const today = new Date().toLocaleDateString();
        let filtered = data;

        if (query) {
            const lowerCaseQuery = query.toLowerCase();
            filtered = filtered.filter(customer => 
                (customer["Full Name"] && customer["Full Name"].toLowerCase().includes(lowerCaseQuery)) ||
                (customer["Mo No"] && customer["Mo No"].toString().includes(query)) ||
                (customer.Location && customer.Location.toLowerCase().includes(lowerCaseQuery))
            );
        }

        if (date) {
            filtered = filtered.filter(customer => {
                const checkInDate = new Date(customer["Check In Time"]).toLocaleDateString();
                return checkInDate === new Date(date).toLocaleDateString();
            });
        } else {
            // Filter by current date if no specific date is provided
            filtered = filtered.filter(customer => {
                const checkInDate = new Date(customer["Check In Time"]).toLocaleDateString();
                return checkInDate === today;
            });
        }

        if (location) {
            filtered = filtered.filter(customer => customer.Location === location);
        }

        setFilteredCustomers(filtered);
    };

    const handleLocationChange = (location) => {
        setSelectedLocation(location);
        filterCustomers(customers, searchQuery, searchDate, location);
    };

    const handleSearchQueryChange = (query) => {
        setSearchQuery(query);
        filterCustomers(customers, query, searchDate, selectedLocation);
    };

    const handleSearchDateChange = (date) => {
        setSearchDate(date);
        filterCustomers(customers, searchQuery, date, selectedLocation);
    };

    const updateBookingStatus = async (id, status) => {
        if(status === "Accepted"){
            setButtonA(true);
        } else {
            setButtonR(true);
        }
        setLoadingRowId(id);

        try {
            const response = await fetch(`${API_BASE_URL}?action=update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                mode: "no-cors",
                body: JSON.stringify({ id, status })
            });
            await fetchCustomers();
        } catch (error) {
            console.error("Error updating booking status:", error.message);
            setError(`Error updating booking status: ${error.message}`);
        } finally {
            setTimeout(() => {
                setButtonA(false);
                setButtonR(false);
                setLoadingRowId(null);
            }, 200);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className='booking-list'>
            <h1 className='all-head'>All Bookings</h1>

            <div className="filter-section">
                <label htmlFor="location">Filter by Location:</label>
                <select
                    id="location"
                    value={selectedLocation}
                    onChange={(e) => handleLocationChange(e.target.value)}
                >
                    <option value="">All Locations (Current Date)</option>
                    <option value="Dantewada">Dantewada</option>
                    <option value="Geedam">Geedam</option>
                    <option value="Barsoor">Barsoor</option>
                </select>

                <label htmlFor="searchQuery">Search by Name, Mobile, or Location:</label>
                <input
                    type="text"
                    id="searchQuery"
                    value={searchQuery}
                    onChange={(e) => handleSearchQueryChange(e.target.value)}
                    placeholder="Enter Name, Mobile, or Location"
                />

                <label htmlFor="searchDate">Search by Date:</label>
                <input
                    type="date"
                    id="searchDate"
                    value={searchDate}
                    onChange={(e) => handleSearchDateChange(e.target.value)}
                />
            </div>

            <table className='booking-table'>
                <thead className='Allbooking-table-header'>
                    <tr>
                        <th>ID</th>
                        <th>Check-In Date</th>
                        <th>Check-Out Date</th>
                        <th>Total Days</th>
                        <th>Full Name</th>
                        <th>Mobile No</th>
                        <th>Location</th>
                        <th>Customer Type</th>
                        <th>Aadhar/Pan</th>
                        <th>No of Rooms</th>
                        <th>Total Guests</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCustomers.map((customer) => (
                        <tr key={customer["ID"]}>
                            <td>{customer["ID"]}</td>
                            <td>{new Date(customer["Check In Time"]).toLocaleDateString()}</td>
                            <td>{new Date(customer['Check Out Time']).toLocaleDateString()}</td>
                            <td>{customer["Total Days"]}</td>
                            <td>{customer["Full Name"]}</td>
                            <td>{customer["Mo No"]}</td>
                            <td>{customer["Location"]}</td>
                            <td>{customer["Customer Type"]}</td>
                            <td>{customer["Aadhar-Pan/link"]}</td>
                            <td>{customer["No Off Room"]}</td>
                            <td>{customer["Total Guest"]}</td>
                            <td>
                                {loadingRowId === customer["ID"] ? (
                                    <span>Processing...</span>
                                ) : customer.Status === 'Accepted' ? (
                                    <span style={{ color: 'green' }}>Booked</span>
                                ) : customer.Status === 'Rejected' ? (
                                    <span>❌</span>
                                ) : (
                                    <span>Pending</span>
                                )}
                            </td>
                            <td>
                                <button 
                                    onClick={() => updateBookingStatus(customer["ID"], 'Accepted')}
                                    disabled={buttonA && loadingRowId === customer["ID"]}
                                >
                                    {buttonA && loadingRowId === customer["ID"] ? "Accepting..." : "Accept"}
                                </button>
                                <button 
                                    onClick={() => updateBookingStatus(customer["ID"], 'Rejected')}
                                    disabled={buttonR && loadingRowId === customer["ID"]}
                                >
                                    {buttonR && loadingRowId === customer["ID"] ? "Rejecting..." : "Reject"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllBooking;
