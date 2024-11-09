import React, { useState } from "react";
import axios from "axios";

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    branch: "",
    email: "",
    phone: "",
  });

  const [photo, setPhoto] = useState(null);
  const [resume, setResume] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.name === "photo") {
      setPhoto(e.target.files[0]);
    } else if (e.target.name === "resume") {
      setResume(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("branch", formData.branch);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("photo", photo);
    data.append("resume", resume);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/register",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Registration successful:", response.data);
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  return (
    <div className="w-full p-4 sm:p-8 rounded-xl bg-gray-800">
      <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto bg-gray-900 p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-white">Register</h2>

        <div className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full h-[3.5vh] sm:h-[5.5vh] px-4 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none"
            required
          />

          <select
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            className="w-full  h-[4vh] sm:h-[6vh] px-2 py-1 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none"
            required
          >
            <option value="">Select Branch</option>
            <option value="CSE">CSE</option>
            <option value="IT">IT</option>
            <option value="AI">AI</option>
            <option value="Eln">Electronics</option>
            <option value="Robotics">Robotics</option>
            <option value="Electrical">Electrical</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Civil">Civil</option>
          </select>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full h-[3.5vh] sm:h-[5.5vh] px-4 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none"
            required
          />

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full h-[3.5vh] sm:h-[5.5vh] px-4 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none"
            required
          />

          <div className="photo flex gap-4 items-center">
            <div className="text w-16 sm:w-24 text-white font-bold text-[2vh] sm:text-xl">Photo</div>
            <label
              htmlFor="photo-upload"
              className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Choose File
            </label>
            <input
              type="file"
              name="photo"
              id="photo-upload"
              onChange={handleFileChange}
              className="hidden"
              required
            />
          </div>

          <div className="resume flex gap-4 pt-2 pb-2 items-center">
            <div className="text w-16 sm:w-24 text-white font-bold text-[2vh] sm:text-xl">Resume</div>
            <label
              htmlFor="resume-upload"
              className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Choose File
            </label>
            <input
              type="file"
              name="resume"
              id="resume-upload"
              onChange={handleFileChange}
              className="hidden"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
