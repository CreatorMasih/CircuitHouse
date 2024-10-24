const express = require('express');
// Use dynamic import for node-fetch to support ESM
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Endpoint for login
app.post('/api/login', async (req, res) => {
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbz7Lp6XqV95bK2NNoz4zlh4brxuE-sVm1e6726fNFetY_jyXSeQH_2lf1RDw5erjnbP/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
        });

        const responseBody = await response.text(); // Get the raw response
        const data = JSON.parse(responseBody); // Parse JSON only if the response is OK

        if (!response.ok) {
            console.error('Login error:', response.status, responseBody); // Log error details
            return res.status(response.status).json({ status: 'error', message: data.message || 'Unknown error from server' });
        }

        res.json(data);
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});

// Endpoint for dashboard
app.get('/api/dashboard', async (req, res) => {
    const location = req.query.location; // Get location from query parameters
    
    try {
        // Fetch data from Google Apps Script with correct query parameter
        const response = await fetch(`https://script.google.com/macros/s/AKfycbzAiLHNhwj9G5vbkUtBGxc09kOM5T0XU2KUR0FIHOK1X3V0l24MPXJpA2R1t7sxuS5S/exec?location=${encodeURIComponent(location)}`);
        
        const responseBody = await response.text(); // Get the raw response
        console.log('Raw Response Body:', responseBody); // Log the raw response

        // Check if the response is OK before parsing
        if (!response.ok) {
            console.error('Dashboard fetch error:', response.status, responseBody); // Log error details
            return res.status(response.status).json({ status: 'error', message: 'Failed to fetch data' });
        }

        const data = JSON.parse(responseBody); // Attempt to parse JSON

        // Set CORS headers for the response
        res.set('Access-Control-Allow-Origin', '*'); // Allow all origins
        res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Specify allowed methods

        if (data.status === 'success') {
            res.json(data);
        } else {
            res.json({
                status: 'fail',
                message: 'No data available'
            });
        }
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).json({
            status: 'fail',
            message: 'Server error: ' + error.message
        });
    }
});

// Endpoint for adding bookings
app.post('/api/addBooking', async (req, res) => {
    try {
        // Send the booking data to Google Sheets API
        const response = await fetch('https://script.google.com/macros/s/AKfycbzkDniAc1GxNSGyJheMRyd5GvA3LpBZbwrM3Gu9eK96_AcC2gXaQ5ffI6CfuNC3nEm8/exec', { // Replace with your actual endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
        });

        const responseBody = await response.text(); // Get the raw response
        const data = JSON.parse(responseBody); // Parse JSON response

        if (!response.ok) {
            console.error('Add booking error:', response.status, responseBody); // Log error details
            return res.status(response.status).json({ status: 'error', message: data.message || 'Unknown error from server' });
        }

        res.json(data); // Return the response from the Google Sheets API
    } catch (error) {
        console.error('Error during adding booking:', error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
