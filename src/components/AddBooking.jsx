import React, { useState, useEffect } from 'react';
import './AddBooking.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, differenceInDays } from 'date-fns';
import Swal from "sweetalert2";

const AddBooking = ({ onAddCustomer = () => {} }) => {
    const [customerName, setCustomerName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [checkInDate, setCheckInDate] = useState(new Date());
    const [checkOutDate, setCheckOutDate] = useState(new Date());
    const [userType, setUserType] = useState('Non-Government');
    const [location, setLocation] = useState('Dantewada');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [numberOfRooms, setNumberOfRooms] = useState(1);
    const [numberOfDays, setNumberOfDays] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    // Function to update max rooms based on location
    const maxRooms = location === 'Dantewada' ? 6 : 2;

    useEffect(() => {
        if(checkOutDate === (checkInDate) + 1){
            setNumberOfDays(differenceInDays(checkOutDate, checkInDate) );
        }else if (checkOutDate > checkInDate) {
            setNumberOfDays(differenceInDays(checkOutDate, checkInDate) );
        } else if(checkOutDate === checkInDate) {
            setNumberOfDays(1);
        }
    }, [checkInDate, checkOutDate]);

    const handleNameChange = (e) => {
        const regex = /^[A-Za-z\s]*$/;  // Allow only letters and spaces
        if (regex.test(e.target.value)) {
            setCustomerName(e.target.value);
        }
    };

    const handlePhoneNumberChange = (e) => {
        const regex = /^[0-9]*$/;  // Allow only numbers
        const value = e.target.value;

    if (regex.test(value) && value.length <= 10) {
        setMobileNumber(value);
    }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (checkOutDate < checkInDate) {
            alert('Check-out date must be the same as or after check-in date./चेक-आउट तिथि चेक-इन तिथि के बाद की होनी चाहिए।');
            setIsLoading(false);
            return;
        }

        const newCustomer = {
            id: new Date().getTime(),
            checkInTime: format(checkInDate, 'dd/MM/yyyy'),
            checkOutTime: format(checkOutDate, 'dd/MM/yyyy'),
            fullName: customerName,
            moNo: mobileNumber,
            location: location,
            customerType: userType,
            noOffRoom: numberOfRooms,
            totalGuest: numberOfGuests,
            totalDays: numberOfDays,
        };

        try {
            await fetch('https://script.google.com/macros/s/AKfycbzAES6vIe7PRtls0bQfLxBclgoekMfxPEJpyl6yac1t3W9lIg-BapBvojd_HDEd35pR/exec', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCustomer),
                mode: 'no-cors'
            });

            Swal.fire({
                title: "Booking Submitted Successfully!",
                text: `Your User ID is: ${newCustomer.id}`,
                icon: "success",
                confirmButtonText: "OK"
            });
        } catch (error) {
            console.error('Request failed:', error);
            alert('Error submitting the form');
        } finally {
            setIsLoading(false);
        }

        onAddCustomer(newCustomer);

        // Reset the form fields
        setCustomerName('');
        setMobileNumber('');
        setCheckInDate(new Date());
        setCheckOutDate(new Date());
        setUserType('Non-Government');
        setLocation('Dantewada');
        setNumberOfGuests(1);
        setNumberOfRooms(1);
        setNumberOfDays(1);
    };

    return (
        <div className="add-booking-container">
            <h2 className='add-booking-title'>Add Booking</h2>
            <form className="add-booking-form" onSubmit={handleSubmit}>
                <table className="add-booking-table">
                    <tbody>
                        <tr>
                            <td><label htmlFor="customerName" className="add-booking-label">Customer Name:</label></td>
                            <td><input type="text" id="customerName" value={customerName} onChange={handleNameChange} required className="add-booking-input" /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="phoneNumber" className="add-booking-label">Phone Number:</label></td>
                            <td><input type="tel" id="phoneNumber" value={mobileNumber} onChange={handlePhoneNumberChange} required className="add-booking-input" /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="checkIn" className="add-booking-label">Check-In Date:</label></td>
                            <td>
                                <DatePicker
                                    selected={checkInDate}
                                    onChange={(date) => setCheckInDate(date)}
                                    dateFormat="dd/MM/yyyy"
                                    className="add-booking-input"
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label htmlFor="checkOut" className="add-booking-label">Check-Out Date:</label></td>
                            <td>
                                <DatePicker
                                    selected={checkOutDate}
                                    onChange={(date) => setCheckOutDate(date)}
                                    dateFormat="dd/MM/yyyy"
                                    className="add-booking-input"
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label className="add-booking-label">Number of Days:</label></td>
                            <td><input type="number" value={numberOfDays} readOnly className="add-booking-input" /></td>
                        </tr>
                        <tr>
                            <td><label className="add-booking-label">Number of Guests:</label></td>
                            <td><input type="number" value={numberOfGuests} onChange={(e) => setNumberOfGuests(e.target.value)} required className="add-booking-input" min="1" /></td>
                        </tr>
                        <tr>
                            <td><label className="add-booking-label">Number of Rooms:</label></td>
                            <td><input type="number" value={numberOfRooms} onChange={(e) => setNumberOfRooms(e.target.value)} required className="add-booking-input" min="1" max={maxRooms} /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="location" className="add-booking-label">Location:</label></td>
                            <td>
                                <select id="location" value={location} onChange={(e) => setLocation(e.target.value)} required className="add-booking-select">
                                    <option value="Dantewada">Dantewada</option>
                                    <option value="Barsur">Barsur</option>
                                    <option value="Geedam">Geedam</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button type="submit" className="add-booking-button" disabled={isLoading}>
                    {isLoading ? "Booking...." : "Add Book Now"}
                </button>
            </form>
        </div>
    );
};

export default AddBooking;
