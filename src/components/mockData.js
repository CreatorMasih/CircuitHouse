// mockData.js
export const mockRoomData = {
    Dantewada: {
      rooms: Array.from({ length: 6 }, (_, i) => ({
        roomNumber: i + 1,
        bookings: [], // Array of booking date ranges
      })),
    },
    Geedam: {
      rooms: Array.from({ length: 2 }, (_, i) => ({
        roomNumber: i + 1,
        bookings: [],
      })),
    },
    Barsoor: {
      rooms: Array.from({ length: 2 }, (_, i) => ({
        roomNumber: i + 1,
        bookings: [],
      })),
    },
  };
  
  // Example of pre-defined bookings (for testing purposes)
  mockRoomData.Dantewada.rooms[0].bookings.push({ start: '2024-10-15', end: '2024-10-17' }); // Room 1 booked from Oct 15 to Oct 17
  mockRoomData.Dantewada.rooms[1].bookings.push({ start: '2024-10-20', end: '2024-10-22' }); // Room 2 booked from Oct 20 to Oct 22
  mockRoomData.Geedam.rooms[0].bookings.push({ start: '2024-10-16', end: '2024-10-18' }); // Room 1 booked from Oct 16 to Oct 18
  // Add more bookings as needed for testing
  