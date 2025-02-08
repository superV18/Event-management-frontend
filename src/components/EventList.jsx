import React, { useState, useEffect } from 'react';
import io from "socket.io-client";
import EventCard from './EventCard';

const socket = io("https://event-management-backend-jgy8.onrender.com");

const EventList = ({events}) => {
  const [token,setToken]= useState(null);
  const [attendees, setAttendees] = useState({});

  useEffect(() => {
    const storedToken = localStorage.getItem('user');
    if (storedToken) {
      const parsedToken = JSON.parse(storedToken); // Parse the string to an object
      setToken(parsedToken.token); // Extract the token from the parsed object
    }
    // Listen for real-time updates
    socket.on("attendeeJoined", (data) => {
      // Update the attendee count for the corresponding event
      setAttendees((prev) => ({
        ...prev,
        [data.eventId]: data.attendeeCount,
      }));
    });

    return () => {
      socket.off("attendeeJoined"); // Cleanup when component unmounts
    };
  }, []);

  const handleJoinEvent = (eventId) => {
    fetch("https://event-management-backend-jgy8.onrender.com/api/events/join", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
       },
      body: JSON.stringify({ eventId }),
    })
      .then(res => res.json())
      .then(() => {
        // Emit real-time update to backend
        socket.emit("attendeeJoined", {
          eventId,
          attendeeCount: attendees[eventId] ? attendees[eventId] + 1 : 1
        });
      });
  };

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {events?.map((event) => {
        const attendeeCount = attendees[event._id] || event.attendees.length;

        return (
          <EventCard
            key={event._id}
            event={event}
            attendeeCount={attendeeCount} // Passing the correct attendee count
            onJoin={() => handleJoinEvent(event._id)} // Pass handleJoin function to EventCard
          />
        );
      })}
    </div>
  );
};

export default EventList;
