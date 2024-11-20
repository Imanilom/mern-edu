import React, { useState, useEffect } from "react";
import axios from "axios";

const ExtracurricularPage = () => {
  const [extracurriculars, setExtracurriculars] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    schedule: { day: "", time: "" },
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchExtracurriculars();
  }, []);

  const fetchExtracurriculars = async () => {
    try {
      const response = await axios.get("/api/extracurriculars");
      setExtracurriculars(response.data);
    } catch (error) {
      console.error("Error fetching extracurriculars:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("schedule")) {
      const scheduleField = name.split(".")[1];
      setFormData({
        ...formData,
        schedule: { ...formData.schedule, [scheduleField]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`/api/extracurriculars/${editingId}`, formData);
      } else {
        await axios.post("/api/extracurriculars", formData);
      }
      fetchExtracurriculars();
      setFormData({ name: "", description: "", schedule: { day: "", time: "" } });
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving extracurricular:", error);
    }
  };

  const handleEdit = (extracurricular) => {
    setFormData(extracurricular);
    setEditingId(extracurricular._id);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/extracurriculars/${id}`);
      fetchExtracurriculars();
    } catch (error) {
      console.error("Error deleting extracurricular:", error);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Manage Extracurriculars</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md mb-8"
      >
        <h2 className="text-xl font-semibold mb-4">
          {isEditing ? "Edit Extracurricular" : "Add Extracurricular"}
        </h2>
        <div className="mb-4">
          <label className="block font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Extracurricular Name"
            className="w-full border rounded px-4 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Extracurricular Description"
            className="w-full border rounded px-4 py-2"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-2">Day</label>
            <input
              type="text"
              name="schedule.day"
              value={formData.schedule.day}
              onChange={handleInputChange}
              placeholder="e.g., Monday"
              className="w-full border rounded px-4 py-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-2">Time</label>
            <input
              type="text"
              name="schedule.time"
              value={formData.schedule.time}
              onChange={handleInputChange}
              placeholder="e.g., 15:00 - 17:00"
              className="w-full border rounded px-4 py-2"
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {isEditing ? "Update" : "Save"}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {extracurriculars.map((extracurricular) => (
          <div key={extracurricular._id} className="bg-white p-6 rounded shadow-md">
            <h3 className="text-lg font-semibold">{extracurricular.name}</h3>
            <p className="text-sm text-gray-600">{extracurricular.description}</p>
            <p className="mt-2 text-gray-700">
              <strong>Schedule:</strong> {extracurricular.schedule.day}, {extracurricular.schedule.time}
            </p>
            <div className="mt-4">
              <button
                onClick={() => handleEdit(extracurricular)}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(extracurricular._id)}
                className="ml-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExtracurricularPage;
