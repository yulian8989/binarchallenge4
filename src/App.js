import React from "react";
import Main from "./components/Main";
import { Routes, Route } from "react-router-dom";
import MovieDetail from "./components/MovieDetail";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <GoogleOAuthProvider clientId={`690282842723-o2k1n6fj9vjvuspa0jgecs6a0sla90h3.apps.googleusercontent.com`}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movieDetail/:id" element={<MovieDetail />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
      </GoogleOAuthProvider>
  );
}

export default App;
