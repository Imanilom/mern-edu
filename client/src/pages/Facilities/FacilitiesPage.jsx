import React, { useState, useEffect } from "react";
import axios from "axios";

const FacilitiesPage = () => {
  const [supports, setSupports] = useState([]);
  const [formData, setFormData] = useState({
    resourceType: "",
    description: "",
    quantity: 1,
    available: true,
    location: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Fetch supports from the backend
  useEffect(() => {
    fetchSupports();
  }, []);

  const fetchSupports = async () => {
    try {
      const response = await axios.get("/api/supports");
      setSupports(response.data);
    } catch (error) {
      console.error("Error fetching supports:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`/api/supports/${editingId}`, formData);
      } else {
        await axios.post("/api/supports", formData);
      }
      fetchSupports();
      setFormData({
        resourceType: "",
        description: "",
        quantity: 1,
        available: true,
        location: "",
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving support:", error);
    }
  };

  const handleEdit = (support) => {
    setFormData({
      resourceType: support.resourceType,
      description: support.description,
      quantity: support.quantity,
      available: support.available,
      location: support.location.join(", "),
    });
    setEditingId(support._id);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/supports/${id}`);
      fetchSupports();
    } catch (error) {
      console.error("Error deleting support:", error);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Manage Facilities</h1>

      {/* Form to Add/Edit Facilities */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg mb-10"
      >
        <h2 className="text-xl font-semibold mb-4">
          {isEditing ? "Edit Facility" : "Add Facility"}
        </h2>
        <div className="mb-4">
          <label className="block font-medium mb-2">Resource Type</label>
          <input
            type="text"
            name="resourceType"
            value={formData.resourceType}
            onChange={handleInputChange}
            placeholder="Type of Resource (e.g., Computer, Textbook)"
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
            placeholder="Short description of the facility"
            className="w-full border rounded px-4 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            placeholder="Number of items available"
            className="w-full border rounded px-4 py-2"
            required
          />
        </div>
        <div className="mb-4 flex items-center gap-2">
          <label className="block font-medium">Available</label>
          <input
            type="checkbox"
            name="available"
            checked={formData.available}
            onChange={handleInputChange}
            className="h-5 w-5"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="Locations (comma-separated)"
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

      {/* List of Facilities */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {supports.map((support) => (
          <div
            key={support._id}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-lg font-bold">{support.resourceType}</h3>
            <p className="text-gray-600">{support.description}</p>
            <p className="text-gray-600">Quantity: {support.quantity}</p>
            <p className="text-gray-600">
              Available: {support.available ? "Yes" : "No"}
            </p>
            <p className="text-gray-600">
              Location: {support.location.join(", ")}
            </p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleEdit(support)}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(support._id)}
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

export default FacilitiesPage;
