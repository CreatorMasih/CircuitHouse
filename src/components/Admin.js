import React, { useState } from 'react';
import './Admin.css';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard'
import AllBooking from './AllBooking';
import AddBooking from "./AddBooking"
import AllRooms from './AllRooms';
import Customers from "./Customers"
import '@fortawesome/fontawesome-free/css/all.min.css';


function Admin() {
  const [activePage, setActivePage] = useState('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [customers, setCustomers] = useState([]); // State to hold customer data

 // Function to handle new customer addition
 const handleAddCustomer = (newCustomer) => {
  setCustomers([...customers, newCustomer]); // Add the new customer to the state
};
  // Handle sidebar item click and page switching
  const handleSidebarClick = (page) => {
    setActivePage(page);
  };

  // Toggle Sidebar visibility
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className={`container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Sidebar isOpen={isSidebarOpen} onSidebarClick={handleSidebarClick} onToggle={toggleSidebar} />
        
          <div className="content">
            {/* content */}
            {activePage === 'dashboard' && <Dashboard />}
            {activePage === 'allBookings' && <AllBooking customers={customers} />}
            {activePage === 'addBooking' && <AddBooking onAddCustomer={handleAddCustomer} />}
            {activePage === 'allRooms' && <AllRooms />}
            {activePage === 'customers' && <Customers customers={customers} onCustomerUpdate={setCustomers} />}
          </div>
        {/* </div> */}
      </div>
    </>
  );
}

export default Admin;
