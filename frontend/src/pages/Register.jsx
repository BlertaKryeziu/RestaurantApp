import React, { useState } from "react";
import bgRestaurant from "../assets/bg-restaurant.avif";
import restaurantImage from "../assets/restaurant.jpg";

const Register = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(""); // For error messages

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    // Email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(form.email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("Error: " + response.statusText);
      const data = await response.json();
      alert("User registered! Now login.");
      console.log("Dërgimi i të dhënave:", user);

      setForm({ firstName: "", lastName: "", email: "", password: "" }); 
      setErrorMessage(""); 
    } catch (err) {
      setErrorMessage("Error: " + err.message); 
    }
  };

  return (
    <div
    className="min-h-screen  flex items-center justify-center"
    style={{ backgroundImage: `url(${bgRestaurant})` }}
  >
    <div className="flex flex-col md:flex-row bg-white bg-opacity-90 rounded-3xl overflow-hidden shadow-2xl max-w-4xl w-full m-4">
      
      {/* Ana e Majte */}
      <div className="relative md:w-1/2 h-64 md:h-auto">
        <img
          src={restaurantImage}
          alt="Restaurant"
          className="w-full h-full object-cover"
        />
      
      </div>
        {/* Ana e djathte */}
        <div className="md:w-1/2 p-8 bg-white bg-opacity-90 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-2 text-center">Register</h2>
          <p className="text-gray-600 text-center mb-6">
            We're excited to have you on board, please activate your account by
            filling the details below
          </p>

          {/* Display error message */}
          {errorMessage && (
            <p className="text-red-500 text-center mb-4">{errorMessage}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col md:flex-row md:space-x-2">
              <input
                name="firstName"
                onChange={handleChange}
                placeholder="First Name"
                className="w-full border-2 border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-orange-500"
              />
              <input
                name="lastName"
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full border-2 border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-orange-500"
              />
            </div>

            <input
              name="email"
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full border-2 border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-orange-500"
            />
            <input
              name="password"
              type="password"
              onChange={handleChange}
              placeholder="Password"
              className="w-full border-2 border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-orange-500"
            />

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold py-2 rounded transition transform hover:scale-105 hover:shadow-lg"
            >
              Register
            </button>

            <p className="text-center text-gray-600 text-sm mt-4">
              Already have an account?
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
