import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetch(`/api/events/${id}`)
      .then((res) => res.json())
      .then((data) => setEvent(data));
  }, [id]);

  if (!event) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">{event.name}</h1>
      <p className="text-gray-600">{event.description}</p>
      <p className="mt-2">
        <strong>Date:</strong> {new Date(event.date).toLocaleString()}
      </p>
      <p><strong>Attendees:</strong> {event.attendees.length}</p>
    </div>
  );
};

export default EventDetail;
