import React, { useState, useEffect } from "react";
import axios from "axios";

const SubjectPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [formData, setFormData] = useState({ name: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await axios.get("/api/subjects");
      setSubjects(response.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`/api/subjects/${editingId}`, formData);
      } else {
        await axios.post("/api/subjects", formData);
      }
      fetchSubjects();
      resetForm();
    } catch (error) {
      console.error("Error saving subject:", error);
    }
  };

  const handleEdit = (subject) => {
    setFormData({ name: subject.name });
    setEditingId(subject._id);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/subjects/${id}`);
      fetchSubjects();
    } catch (error) {
      console.error("Error deleting subject:", error);
    }
  };

  const resetForm = () => {
    setFormData({ name: "" });
    setIsEditing(false);
    setEditingId(null);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8">Manage Subjects</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow-lg p-6 rounded-lg mb-10">
        <h2 className="text-2xl font-semibold mb-4">
          {isEditing ? "Edit Subject" : "Add Subject"}
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Subject Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full border rounded px-4 py-2"
            placeholder="Enter subject name"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          {isEditing ? "Update Subject" : "Save Subject"}
        </button>
      </form>

      {/* Subject List */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {subjects.map((subject) => (
          <div key={subject._id} className="bg-white shadow-lg p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">{subject.name}</h3>
            <div className="mt-4 flex gap-4">
              <button
                onClick={() => handleEdit(subject)}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(subject._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
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

export default SubjectPage;