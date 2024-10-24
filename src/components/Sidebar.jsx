import React, { useState } from 'react';
import './Sidebar.css'; // Ensure the path is correct

const Sidebar = ({ onSidebarClick }) => {
    const [showBookingDropdown, setShowBookingDropdown] = useState(false);
    const [showRoomDropdown, setShowRoomDropdown] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); 
    const [activeMenu, setActiveMenu] = useState(''); // Track active menu

    // Toggle Booking dropdown
    const toggleBookingDropdown = () => {
        setShowBookingDropdown(!showBookingDropdown);
        setActiveMenu('bookings'); // Set bookings as active
    };

    // Toggle Room dropdown
    const toggleRoomDropdown = () => {
        setShowRoomDropdown(!showRoomDropdown);
        setActiveMenu('rooms'); // Set rooms as active
    };

    // Handle clicking on a menu item (dashboard, bookings, etc.)
    const handleMenuClick = (menu) => {
        setActiveMenu(menu); // Set the clicked menu as active
        onSidebarClick(menu); // Pass the clicked menu to the parent component
    };

    // Toggle Sidebar visibility
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="sidebar-container">
            <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
                <button className="hamburger" onClick={toggleSidebar}>
                    &#9776;
                    <span className="sidebar-title">{isSidebarOpen && '𝐑𝐞𝐬𝐭 𝐇𝐨𝐮𝐬𝐞 𝐝𝐚𝐧𝐭𝐞𝐰𝐚𝐝𝐚'}</span>
                </button>

                <ul>
                    <li className={activeMenu === 'dashboard' ? 'active' : ''} onClick={() => handleMenuClick('dashboard')}>
                        <i className="fa fa-dashboard"></i>
                        <span>{isSidebarOpen && 'Dashboard'}</span>
                    </li>

                    <li className={activeMenu === 'bookings' ? 'active' : ''} onClick={toggleBookingDropdown}>
                        <i className="fa fa-book"></i>
                        <span>{isSidebarOpen && 'Bookings'}</span>
                        <i className={`fa ${showBookingDropdown ? 'fa-chevron-down' : 'fa-chevron-right'}`}></i>
                        <ul className={showBookingDropdown ? 'open' : ''}>
                            <li className={activeMenu === 'allBookings' ? 'active' : ''} onClick={() => handleMenuClick('allBookings')}>
                                <i className="fa fa-list"></i>
                                <span>{isSidebarOpen && 'All Bookings'}</span>
                            </li>
                            <li className={activeMenu === 'addBooking' ? 'active' : ''} onClick={() => handleMenuClick('addBooking')}>
                                <i className="fa fa-plus"></i>
                                <span>{isSidebarOpen && 'Add Booking'}</span>
                            </li>
                        </ul>
                    </li>

                    <li className={activeMenu === 'rooms' ? 'active' : ''} onClick={toggleRoomDropdown}>
                        <i className="fa fa-bed"></i>
                        <span>{isSidebarOpen && 'Room'}</span>
                        <i className={`fa ${showRoomDropdown ? 'fa-chevron-down' : 'fa-chevron-right'}`}></i>
                        <ul className={showRoomDropdown ? 'open' : ''}>
                            <li className={activeMenu === 'allRooms' ? 'active' : ''} onClick={() => handleMenuClick('allRooms')}>
                                <i className="fa fa-th"></i>
                                <span>{isSidebarOpen && 'All Rooms'}</span>
                            </li>
                        </ul>
                    </li>

                    <li className={activeMenu === 'customers' ? 'active' : ''} onClick={() => handleMenuClick('customers')}>
                        <i className="fa fa-users"></i>
                        <span>{isSidebarOpen && 'Customers'}</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;