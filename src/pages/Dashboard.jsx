import React, { useState, useEffect } from 'react';
import EventList from "../components/EventList";
import EventForm from "../components/EventForm";

const Dashboard = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    fetch("http://localhost:5000/api/events")
      .then(res => res.json())
      .then(data => setEvents(data))      
      .catch((error) => console.error('Error fetching events:', error));
  }
  const addEvent = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upcoming Events</h1>
         <EventForm addEvent={addEvent} />   
         <EventList events={events} />
    </div>
  );
};

export default Dashboard;
