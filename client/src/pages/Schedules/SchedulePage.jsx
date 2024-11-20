import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SchedulePage = () => {
  const [packageTypes] = useState(['A', 'B', 'C']);
  const [selectedPackageType, setSelectedPackageType] = useState('');
  const [classesWithSubjects, setClassesWithSubjects] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [subject, setSubject] = useState('');
  const [day, setDay] = useState('Monday'); // Default selected day
  const [time, setTime] = useState('08:00 - 10:00'); // Default time
  const [schedules, setSchedules] = useState([]);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const fetchClassesByPackageType = async () => {
    if (!selectedPackageType) return;

    try {
      const response = await axios.get(`/api/curriculums/classes/${selectedPackageType}`);
      setClassesWithSubjects(response.data);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  const fetchSchedules = async () => {
    try {
      const response = await axios.get('/api/schedules'); // Fetch existing schedules
      setSchedules(response.data);
    } catch (error) {
      console.error('Error fetching schedules:', error);
    }
  };

  useEffect(() => {
    fetchClassesByPackageType();
    fetchSchedules(); // Fetch schedules when the component mounts
  }, [selectedPackageType]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedClass || !subject) {
      alert("Please select a class and enter a subject");
      return;
    }

    const newSchedule = {
      day,
      time,
      classes: [{ class: selectedClass, subject }],
    };

    try {
      await axios.post('/api/schedules', newSchedule);
      setSchedules([...schedules, newSchedule]); // Update local state
      setSelectedClass(''); // Reset class selection
      setSubject(''); // Reset subject input
      setDay('Monday'); // Reset to default day
      setTime('08:00 - 10:00'); // Reset to default time
    } catch (error) {
      console.error('Error saving schedule:', error);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Manage Schedule</h1>

      <div className="mb-4">
        <label className="block font-medium mb-2">Select Package Type</label>
        <select
          value={selectedPackageType}
          onChange={(e) => setSelectedPackageType(e.target.value)}
          className="w-full border rounded px-4 py-2"
        >
          <option value="">Select Package Type</option>
          {packageTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {classesWithSubjects.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Classes</h2>
          <div className="mb-4">
            <label className="block font-medium mb-2">Select Class</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full border rounded px-4 py-2"
            >
              <option value="">Select Class</option>
              {classesWithSubjects.map((item) => (
                <option key={item.class._id} value={item.class._id}>{item.class.classname}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter Subject"
              className="w-full border rounded px-4 py-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">Day</label>
            <select
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="w-full border rounded px-4 py-2"
            >
              {daysOfWeek.map((dayOption) => (
                <option key={dayOption} value={dayOption}>{dayOption}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">Time</label>
            <input
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="e.g., 08:00 - 10:00"
              className="w-full border rounded px-4 py-2"
              required
            />
          </div>
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Schedule
      </button>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Current Schedules</h2>
        {schedules.length > 0 ? (
          schedules.map((schedule, index) => (
            <div key={index} className="mb-4 p-4 border rounded">
              <h3 className="text-lg font-semibold">{schedule.day} - {schedule.time}</h3>
              {schedule.classes.map((classItem, idx) => (
                <p key={idx}>
                  Class: {classItem.class ? classItem.class.classname : 'Unknown'} | Subject: {classItem.subject}
                </p>
              ))}
            </div>
          ))
        ) : (
          <p>No schedules added yet.</p>
        )}
      </div>
    </div>
  );
};

export default SchedulePage;