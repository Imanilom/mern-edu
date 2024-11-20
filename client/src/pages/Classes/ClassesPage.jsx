import React, { useState, useEffect } from "react";
import axios from "axios";

const ClassesPage = () => {
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    classname: "",
    packageType: "A",
    students: [],
    teacher: "",
    facilities: [],
    onlineLink: "", // Tambahkan properti untuk kelas online
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Fetch data
  useEffect(() => {
    fetchClasses();
    fetchTeachers();
    fetchStudents();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axios.get("/api/classes");
      setClasses(response.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await axios.get("/api/teachers?withoutClass=true");
      setTeachers(response.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get("/api/students");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMultiSelectChange = (e) => {
    const { name, selectedOptions } = e.target;
    const values = Array.from(selectedOptions).map((option) => option.value);
    setFormData({ ...formData, [name]: values });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`/api/classes/${editingId}`, formData);
      } else {
        await axios.post("/api/classes", formData);
      }
      fetchClasses();
      resetForm();
    } catch (error) {
      console.error("Error saving class:", error);
    }
  };

  const handleEdit = (classData) => {
    setFormData({
      classname: classData.classname,
      packageType: classData.packageType,
      students: classData.students.map((s) => s._id),
      teacher: classData.teacher?._id || "",
      facilities: classData.facilities,
      onlineLink: classData.onlineLink || "", // Properti onlineLink
    });
    setEditingId(classData._id);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/classes/${id}`);
      fetchClasses();
    } catch (error) {
      console.error("Error deleting class:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      classname: "",
      packageType: "A",
      students: [],
      teacher: "",
      facilities: [onlineLink, ],
      onlineLink: "", // Reset onlineLink
    });
    setIsEditing(false);
    setEditingId(null);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Manage Classes</h1>

      {/* Form to Add/Edit Class */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg mb-10">
        <h2 className="text-xl font-semibold mb-4">
          {isEditing ? "Edit Class" : "Add Class"}
        </h2>
        <div className="mb-4">
          <label className="block font-medium mb-2">Class Name</label>
          <input
            type="text"
            name="classname"
            value={formData.classname}
            onChange={handleInputChange}
            className="w-full border rounded px-4 py-2"
            placeholder="Enter name of class (XII, etc)"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Package Type</label>
          <select
            name="packageType"
            value={formData.packageType}
            onChange={handleInputChange}
            className="w-full border rounded px-4 py-2"
          >
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Teacher</label>
          <select
            name="teacher"
            value={formData.teacher}
            onChange={handleInputChange}
            className="w-full border rounded px-4 py-2"
          >
            <option value="">Select a teacher</option>
            {teachers.map((teacher) => (
              <option key={teacher._id} value={teacher._id}>
                {teacher.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Students</label>
          <select
            name="students"
            multiple
            value={formData.students}
            onChange={handleMultiSelectChange}
            className="w-full border rounded px-4 py-2"
          >
            {students.map((student) => (
              <option key={student._id} value={student._id}>
                {student.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Facilities</label>
          <input
            type="text"
            name="facilities"
            value={formData.facilities.join(", ")} // Tampilkan sebagai string dipisahkan koma
            onChange={(e) =>
              setFormData({ ...formData, facilities: e.target.value.split(", ") })
            }
            className="w-full border rounded px-4 py-2"
            placeholder="Enter facilities separated by commas (e.g., Papan Tulis, Proyektor)"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Online Link</label>
          <input
            type="text"
            name="onlineLink"
            value={formData.onlineLink}
            onChange={handleInputChange}
            className="w-full border rounded px-4 py-2"
            placeholder="Enter online class link (e.g., Zoom link)"
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {isEditing ? "Update Class" : "Save Class"}
        </button>
      </form>

      {/* List of Classes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((classData) => (
          <div key={classData._id} className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold">Class {classData.classname}</h2>
            <p className="text-gray-700">Package: {classData.packageType}</p>
            <p className="text-gray-600">Teacher: {classData.teacher?.name || "N/A"}</p>
            <p className="text-gray-600">Students: {classData.students.length}</p>
            <p className="text-gray-600">Facilities: {classData.facilities.join(", ")}</p>
            <p className="text-gray-600">
              Online Link:{" "}
              {classData.onlineLink ? (
                <a href={classData.onlineLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                  {classData.onlineLink}
                </a>
              ) : (
                "N/A"
              )}
            </p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleEdit(classData)}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(classData._id)}
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

export default ClassesPage;
