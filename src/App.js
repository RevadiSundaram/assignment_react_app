import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

export default function App() {
  const API_URL = "https://randomuser.me/api";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const json = await axios.get(API_URL);

      const userName = json.data.results[0].name;
      const userFullName =
        userName.title + " " + userName.first + " " + userName.last;
      setName(userFullName);
      localStorage.setItem("name", JSON.stringify(userFullName));

      const userEmail = json.data.results[0].email;
      setEmail(userEmail);
      localStorage.setItem("email", JSON.stringify(userEmail));
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="App">
      <form onSubmit={(e) => e.preventDefault()}>
        <h1>Application Page</h1>
        <h3>Full Name:</h3>
        <p>{name}</p>
        <h3>Email: </h3>
        <p>{email}</p>
        <button type="button" onClick={fetchData}>
          Refresh
        </button>
      </form>
    </div>
  );
}
