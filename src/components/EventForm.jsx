import React, { useState,useEffect } from 'react';

const EventForm = ({addEvent}) => {
  const [token,setToken]= useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    time: '',
  });
  useEffect(() => {
    // Parse the stored token if it exists
    const storedToken = localStorage.getItem('user');
    if (storedToken) {
      const parsedToken = JSON.parse(storedToken); // Parse the string to an object
      setToken(parsedToken.token); // Extract the token from the parsed object
    }
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form data
    if (!formData.name || !formData.description || !formData.date || !formData.time) {
      alert('Please fill in all fields');
      return;
    }

    // Check if token is valid
    if (!token) {
      alert('Invalid token. Please log in again.');
      return;
    }
    // Combine date and time into a single ISO string
    const eventDateTime = new Date(`${formData.date}T${formData.time}`).toISOString();

    fetch('https://event-management-backend-jgy8.onrender.com/api/events', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ ...formData, date: eventDateTime }),
    })
    .then((response) => response.json())
    .then((newEvent) => {
      addEvent(newEvent);
      alert('Event created successfully!');
      resetForm();
    }).catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      date: '',
      time: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Event Name"
        className="w-full p-2 border rounded"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Event Description"
        className="w-full p-2 border rounded"
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="time"
        name="time"
        value={formData.time}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded cursor-pointer">Create Event</button>
    </form>
  );
};

export default EventForm;
