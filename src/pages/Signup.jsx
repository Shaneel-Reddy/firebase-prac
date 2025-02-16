import React, { useState } from "react";
import { app } from "../../firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const auth = getAuth(app);
const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const googleProvider = new GoogleAuthProvider();
  const handleGoogleSignup = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        alert("User signed up with Google!");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then((value) => alert("User created!"))
      .catch((error) => alert(error.message));

    console.log("Form submitted:", formData);
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
        <button type="button" onClick={handleGoogleSignup}>
          Sign Up with Google
        </button>
      </form>
    </div>
  );
};

export default Signup;
