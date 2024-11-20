import React, { useState, useEffect } from "react";
import axios from "axios";

const TeacherPage = () => {
  const [teachers, setTeachers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    qualifications: "",
    subjects: "",
    location: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Fetch teachers from the backend
  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get("/api/teachers");
      setTeachers(response.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
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
        await axios.put(`/api/teachers/${editingId}`, formData);
      } else {
        await axios.post("/api/teachers", formData);
      }
      fetchTeachers();
      setFormData({
        name: "",
        qualifications: "",
        subjects: "",
        location: "",
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving teacher:", error);
    }
  };

  const handleEdit = (teacher) => {
    setFormData({
      name: teacher.name,
      qualifications: teacher.qualifications,
      subjects: teacher.subjects.join(", "),
      location: teacher.location,
    });
    setEditingId(teacher._id);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/teachers/${id}`);
      fetchTeachers();
    } catch (error) {
      console.error("Error deleting teacher:", error);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Manage Teachers</h1>

      {/* Form to Add/Edit Teachers */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg mb-10"
      >
        <h2 className="text-xl font-semibold mb-4">
          {isEditing ? "Edit Teacher" : "Add Teacher"}
        </h2>
        <div className="mb-4">
          <label className="block font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Teacher's Name"
            className="w-full border rounded px-4 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Qualifications</label>
          <input
            type="text"
            name="qualifications"
            value={formData.qualifications}
            onChange={handleInputChange}
            placeholder="Teacher's Qualifications"
            className="w-full border rounded px-4 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Subjects</label>
          <input
            type="text"
            name="subjects"
            value={formData.subjects}
            onChange={handleInputChange}
            placeholder="Comma-separated subjects (e.g., Math, Science)"
            className="w-full border rounded px-4 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="Teacher's Location"
            className="w-full border rounded px-4 py-2"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {isEditing ? "Update" : "Save"}
        </button>
      </form>

      {/* List of Teachers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachers.map((teacher) => (
          <div
            key={teacher._id}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-lg font-bold">{teacher.name}</h3>
            <p className="text-gray-600">Qualifications: {teacher.qualifications}</p>
            <p className="text-gray-600">Subjects: {teacher.subjects.join(", ")}</p>
            <p className="text-gray-600">Location: {teacher.location}</p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleEdit(teacher)}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(teacher._id)}
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

export default TeacherPage;
