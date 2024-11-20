import React, { useState, useEffect } from "react";
import axios from "axios";

const CurriculumPage = () => {
  const [curriculums, setCurriculums] = useState([]);
  const [formData, setFormData] = useState({
    semester: "",
    startDate: "",
    endDate: "",
    packageType: "",
    subjects: [{ name: "", extraActivities: [] }],
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchCurriculums();
  }, []);

  const fetchCurriculums = async () => {
    try {
      const response = await axios.get("/api/curriculums");
      setCurriculums(response.data);
    } catch (error) {
      console.error("Error fetching curriculums:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    return `${day}:${month}:${year}`;
  };

  const handleInputChange = (e, index = null, isExtra = false) => {
    const { name, value } = e.target;

    if (index !== null && isExtra) {
      const updatedSubjects = [...formData.subjects];
      updatedSubjects[index].extraActivities = value.split(",");
      setFormData({ ...formData, subjects: updatedSubjects });
    } else if (index !== null) {
      const updatedSubjects = [...formData.subjects];
      updatedSubjects[index][name] = value;
      setFormData({ ...formData, subjects: updatedSubjects });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addSubject = () => {
    setFormData({
      ...formData,
      subjects: [...formData.subjects, { name: "", extraActivities: [] }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.semester || !formData.startDate || !formData.endDate || !formData.packageType) {
      alert("Please fill in all required fields.");
      return;
    }

    // Convert back to YYYY-MM-DD format for the API
    const formattedData = {
      ...formData,
      startDate: formData.startDate.split(":").reverse().join("-"),
      endDate: formData.endDate.split(":").reverse().join("-"),
    };

    try {
      if (isEditing) {
        await axios.put(`/api/curriculums/${editingId}`, formattedData);
      } else {
        await axios.post("/api/curriculums", formattedData);
      }
      fetchCurriculums();
      resetForm();
    } catch (error) {
      console.error("Error saving curriculum:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      semester: "",
      startDate: "",
      endDate: "",
      packageType: "",
      subjects: [{ name: "", extraActivities: [] }],
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEdit = (curriculum) => {
    setFormData({
      ...curriculum,
      startDate: formatDate(curriculum.startDate),
      endDate: formatDate(curriculum.endDate),
    });
    setEditingId(curriculum._id);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/curriculums/${id}`);
      fetchCurriculums();
    } catch (error) {
      console.error("Error deleting curriculum:", error);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Manage Curriculum</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">{isEditing ? "Edit Curriculum" : "Add Curriculum"}</h2>
        <div className="mb-4">
          <label className="block font-medium mb-2">Semester</label>
          <input
            type="text"
            name="semester"
            value={formData.semester}
            onChange={handleInputChange}
            placeholder="Semester"
            className="w-full border rounded px-4 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Start Date</label>
          <input
            type="text"
            name="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
            placeholder="dd:mm:yyyy"
            className="w-full border rounded px-4 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">End Date</label>
          <input
            type="text"
            name="endDate"
            value={formData.endDate}
            onChange={handleInputChange}
            placeholder="dd:mm:yyyy"
            className="w-full border rounded px-4 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Package Type</label>
          <select
            name="packageType"
            value={formData.packageType}
            onChange={handleInputChange}
            className="w-full border rounded px-4 py-2"
            required
          >
            <option value="">Select Package Type</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
        </div>

        {formData.subjects.map((subject, index) => (
          <div key={index} className="mb-4">
            <label className="block font-medium mb-2">Subject {index + 1}</label>
            <input
              type="text"
              name="name"
              value={subject.name}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="Subject Name"
              className="w-full border rounded px-4 py-2 mb-2"
              required
            />
            <input
              type="text"
              value={subject.extraActivities.join(",")}
              onChange={(e) => handleInputChange(e, index, true)}
              placeholder="Extra Activities (comma separated)"
              className="w-full border rounded px-4 py-2"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addSubject}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          Add Subject
        </button>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {isEditing ? "Update" : "Submit"}
        </button>
      </form>

      <div>
        <h2 className="text-xl font-semibold mb-4">Curriculums List</h2>
        {curriculums.map((curriculum) => (
          <div key={curriculum._id} className="mb-4 p-4 border rounded">
            <h3 className="text-lg font-semibold">{curriculum.semester}</h3>
            <p>Periode {formatDate(curriculum.startDate)} - {formatDate(curriculum.endDate)}</p>
            <p>Package {curriculum.packageType}</p>
            <button
              onClick={() => handleEdit(curriculum)}
              className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(curriculum._id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurriculumPage;