const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Sample bus routes
const busRoutes = [
  {
    id: 'route-1',
    name: 'Downtown to Central Park',
    stops: ['Downtown Station', 'City Hall', 'Main Street', 'Central Park Entrance', 'Central Park Exit'],
    timings: {
      firstBus: '7:00 AM',
      lastBus: '8:00 PM',
      frequency: 'Every 30 minutes during peak hours, hourly during off-peak hours.'
    }
  },
  {
    id: 'route-2',
    name: 'Airport to North Terminal',
    stops: ['Airport Main Terminal', 'Departure Gate 1', 'Arrival Terminal', 'North Terminal Entrance'],
    timings: {
      firstBus: '6:00 AM',
      lastBus: '10:00 PM',
      frequency: 'Every 15 minutes during high-traffic periods, every 45 minutes during late-night hours.'
    }
  }
];

// Storage for student registrations (in-memory, could be a database)
let studentRegistrations = [];

// Route to get all bus routes
app.get('/api/routes', (req, res) => {
  res.json(busRoutes);
});

// Route to register a student for a bus route
app.post('/api/register', (req, res) => {
  const { name, routeId } = req.body;

  // Find the selected bus route
  const selectedRoute = busRoutes.find(route => route.id === routeId);
  
  if (!selectedRoute) {
    return res.status(404).json({ message: 'Bus route not found' });
  }

  // Register student (you can add more validation here)
  const student = {
    name: name,
    routeId: selectedRoute.id,
    routeName: selectedRoute.name
  };

  studentRegistrations.push(student);
  
  res.status(201).json({ message: 'Student registered successfully', student });
});

// Route to get all registered students for a specific route
app.get('/api/students/:routeId', (req, res) => {
  const { routeId } = req.params;
  const studentsForRoute = studentRegistrations.filter(student => student.routeId === routeId);

  if (studentsForRoute.length === 0) {
    return res.status(404).json({ message: 'No students registered for this route' });
  }

  res.json(studentsForRoute);
});

// Start the server
app.listen(port, () => {
  console.log(`Bus management system running on http://localhost:${port}`);
});
