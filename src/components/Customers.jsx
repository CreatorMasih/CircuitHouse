// import React, { useEffect, useState } from 'react';
// import "../components/Allbooking.css";

// const CustomerList = () => {
//     const [customers, setCustomers] = useState([]);
//     const [filteredCustomers, setFilteredCustomers] = useState([]); // State for filtered customers
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const [searchQuery, setSearchQuery] = useState(''); // State for search input

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
//                 let formattedData = data.rooms; // Access the rooms array directly
    
//                 // Sort customers by check-in date (ascending order)
//                 formattedData = formattedData.sort((a, b) => new Date(a.checkInTime) - new Date(b.checkInTime));
    
//                 // Set the formatted data to state
//                 setCustomers(formattedData);
//                 setFilteredCustomers(formattedData); // Initially set to show all customers
//             } catch (error) {
//                 setError('Error fetching data: ' + error.message);
//             } finally {
//                 setLoading(false);
//             }
//         };
    
//         fetchCustomers();
//     }, []);
    
//     // Handle search input change
//     const handleSearch = (e) => {
//         const query = e.target.value.toLowerCase();
//         setSearchQuery(query);
    
//         // Filter customers based on the search query (name or mobile number)
//         const filtered = customers.filter(customer =>
//             customer.fullName.toLowerCase().includes(query) || 
//             customer.moNo.toString().includes(query) // Convert moNo to string
//         );
        
//         setFilteredCustomers(filtered);
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
//             <h1 className='all-head'>Customers Bookings (History)</h1>
            
//             {/* Search Box */}
//             <input 
//                 type="text" 
//                 placeholder="Search by Name or Mobile Number" 
//                 value={searchQuery} 
//                 onChange={handleSearch} 
//                 className="search-input"
//             />

//             <div className="table-container">
//                 <table className='booking-table'>
//                     <thead className='Allbooking-table-header sticky-header'>
//                         <tr>
//                             <th>ID</th>
//                             <th>Check-In Date</th>
//                             <th>Check-Out Date</th>
//                             <th>Total Days</th>
// {/*                             <th>Created At</th> */}
//                             <th>Full Name</th>
//                             <th>Mobile No</th>
//                             <th>Location</th>
//                             <th>Customer Type</th>
// {/*                             <th>Aadhar/Pan</th> */}
//                             <th>No of Rooms</th>
//                             <th>Total Guests</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {filteredCustomers.map((customer) => (
//                             <tr key={customer.id}>
//                                 <td>{customer.id}</td>
//                                 <td>{new Date(customer.checkInTime).toLocaleDateString()}</td>
//                                 <td>{new Date(customer.checkOutTime).toLocaleDateString()}</td>
//                                 <td>{customer.totalDays}</td>
// {/*                                 <td>{customer.createdAt}</td> */}
//                                 <td>{customer.fullName}</td>
//                                 <td>{customer.moNo}</td>
//                                 <td>{customer.location}</td>
//                                 <td>{customer.customerType}</td>
// {/*                                 <td>{customer.aadharPan}</td> */}
//                                 <td>{customer.noOffRoom}</td>
//                                 <td>{customer.totalGuest}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default CustomerList;
import React, { useEffect, useState } from 'react';
import "../components/Allbooking.css";

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchDate, setSearchDate] = useState('');

    const API_BASE_URL = 'https://script.google.com/macros/s/AKfycbyk-6RM66Dc9rgUMrxVzYxQHsGCwNWamTTFsmWAVol0kdpS4JmwLSOQIT1vZ7vxnIth/exec';

    const fetchCustomers = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}?action=fetch`);
            if (!response.ok) throw new Error('Network response was not ok');
            
            const data = await response.json();
            if (data.rooms) {
                const formattedData = data.rooms;
                setCustomers(formattedData);
                setFilteredCustomers(formattedData); // Initial load shows all customers
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

    const filterCustomers = (data, query, date) => {
        let filtered = data;
    
        if (query) {
            const lowerCaseQuery = query.toLowerCase();
            filtered = filtered.filter(customer => 
                (customer["Full Name"] && customer["Full Name"].toLowerCase().includes(lowerCaseQuery)) ||
                (customer["Mo No"] && customer["Mo No"].toString().includes(query)) || // Convert Mo No to string
                (customer.Location && customer.Location.toLowerCase().includes(lowerCaseQuery))
            );
        }
        
        if (date) {
            filtered = filtered.filter(customer => {
                const checkInDate = new Date(customer["Check In Time"]).toLocaleDateString();
                return checkInDate === new Date(date).toLocaleDateString();
            });
        }
    
        setFilteredCustomers(filtered);
    };
    

    const handleSearchQueryChange = (query) => {
        setSearchQuery(query);
        filterCustomers(customers, query, searchDate);
    };

    const handleSearchDateChange = (date) => {
        setSearchDate(date);
        filterCustomers(customers, searchQuery, date);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className='booking-list'>
            <h1 className='all-head'>Customers Bookings (History)</h1>

            <div className="filter-section">
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
                                {customer.Status === 'Accepted' ? (
                                    <span style={{ color: 'green' }}>Booked</span>
                                ) : customer.Status === 'Rejected' ? (
                                    <span>❌</span>
                                ) : (
                                    <span>Pending</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Customers;
