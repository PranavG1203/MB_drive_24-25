import { useState } from "react";
import axios from "axios";

function RegisterForm() {
  const [isFormValid, setIsFormValid] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    branch: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    branch: "",
    email: "",
    phone: "",
    photo: "",
    resume: "",
  });

  const [photo, setPhoto] = useState(null);
  const [resume, setResume] = useState(null);
  const checkFormValidity = () => {
    const hasErrors = Object.values(errors).some((error) => error !== "");
    const hasAllFields =
      formData.name && formData.branch && formData.email && formData.phone;
    const hasFiles = photo && resume;
    setIsFormValid(!hasErrors && hasAllFields && hasFiles);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: validateForm(name, value) });
    checkFormValidity();
  };
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    if (name === "photo") {
      setPhoto(file);
      setErrors({ ...errors, photo: validateForm("photo", null, file) });
    } else if (name === "resume") {
      setResume(file);
      setErrors({ ...errors, resume: validateForm("resume", null, file) });
    }
    checkFormValidity();
  };

  const validateForm = (name, value, file = null) => {
    switch (name) {
      case "name":
        if (!value) return "Name is required";
        if (value.length < 2) return "Name must be at least 2 characters";
        if (!/^[a-zA-Z\s]+$/.test(value))
          return "Name should only contain letters";
        return "";

      case "branch":
        if (!value) return "Please select a branch";
        return "";

      case "email": {
        if (!value) return "Email is required";
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(value))
          return "Please enter a valid email address";
        if (value.length > 254) return "Email is too long";
        if (value.split("@")[0].length > 64)
          return "Local part of email is too long";
        return "";
      }

      case "phone":
        if (!value) return "Phone number is required";
        if (!/^\d{10}$/.test(value)) return "Phone number must be 10 digits";
        return "";

      case "photo":
        if (!file) return "Photo is required";
        if (!file.type.startsWith("image/"))
          return "Please upload an image file";
        if (file.size > 5000000) return "Photo must be less than 5MB";
        return "";

      case "resume":
        if (!file) return "Resume is required";
        if (!file.type.includes("pdf")) return "Please upload a PDF file";
        if (file.size > 10000000) return "Resume must be less than 10MB";
        return "";

      default:
        return "";
    }
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  //   setErrors({ ...errors, [name]: validateForm(name, value) });
  // };

  // const handleFileChange = (e) => {
  //   const { name, files } = e.target;
  //   const file = files[0];

  //   if (name === "photo") {
  //     setPhoto(file);
  //     setErrors({ ...errors, photo: validateForm("photo", null, file) });
  //   } else if (name === "resume") {
  //     setResume(file);
  //     setErrors({ ...errors, resume: validateForm("resume", null, file) });
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {
      name: validateForm("name", formData.name),
      branch: validateForm("branch", formData.branch),
      email: validateForm("email", formData.email),
      phone: validateForm("phone", formData.phone),
      photo: validateForm("photo", null, photo),
      resume: validateForm("resume", null, resume),
    };

    setErrors(newErrors);

    // Check if there are any errors
    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }

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
    <div className="w-full p-4 sm:p-8 rounded-xl sm:mb-0">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 max-w-md mx-auto bg-gray-900 p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-3xl font-bold text-center text-white font-[verdana]">Register</h2>

        <div className="space-y-4">
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className={`w-full h-[3.5vh] sm:h-[5.5vh] px-4 py-2 bg-gray-700 text-white rounded-md border ${
                errors.name ? "border-red-500" : "border-gray-600"
              } focus:outline-none`}
              required
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <select
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              className={`w-full h-[4vh] sm:h-[6vh] px-2 py-1 bg-gray-700 text-white rounded-md border ${
                errors.branch ? "border-red-500" : "border-gray-600"
              } focus:outline-none`}
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
            {errors.branch && (
              <p className="text-red-500 text-sm mt-1">{errors.branch}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className={`w-full h-[3.5vh] sm:h-[5.5vh] px-4 py-2 bg-gray-700 text-white rounded-md border ${
                errors.email ? "border-red-500" : "border-gray-600"
              } focus:outline-none`}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className={`w-full h-[3.5vh] sm:h-[5.5vh] px-4 py-2 bg-gray-700 text-white rounded-md border ${
                errors.phone ? "border-red-500" : "border-gray-600"
              } focus:outline-none`}
              required
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          <div className="photo flex gap-4 items-center">
            <div className="text w-16 sm:w-24 text-white font-bold text-[2vh] sm:text-xl">
              Photo
            </div>
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
            {errors.photo && (
              <p className="text-red-500 text-sm">{errors.photo}</p>
            )}
          </div>

          <div className="resume flex gap-4 pt-2 pb-2 items-center">
            <div className="text w-16 sm:w-24 text-white font-bold text-[2vh] sm:text-xl">
              Resume
            </div>
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
            {errors.resume && (
              <p className="text-red-500 text-sm">{errors.resume}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          onClick={() => console.log("Form submitted successfully!")}
          disabled={!isFormValid}
          className={`w-full py-3 ${
            isFormValid
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-400 cursor-not-allowed"
          } text-white rounded-lg transition-colors duration-300`}
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
