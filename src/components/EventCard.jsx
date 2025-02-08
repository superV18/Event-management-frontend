import React from 'react';

const EventCard = ({ event, attendeeCount, onJoin }) => {
  return (
    <div className="border p-4 rounded shadow-md">
      <h3 className="text-xl font-semibold">{event.name}</h3>
      <p>{event.description}</p>
      <p className="text-sm text-gray-500">Date: {new Date(event.date).toLocaleString()}</p>
      <p className="font-bold">Attendees: {attendeeCount}</p>

      <button 
        onClick={onJoin} 
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
      >
        Join Event
      </button>
    </div>
  );
};

export default EventCard;
