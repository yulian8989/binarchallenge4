import React from 'react'
import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState({});
	const navigate = useNavigate();

	const token = localStorage.getItem("token");

	useEffect(() => {
		const fetchData = async () => {
			axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
			await axios
				.get("https://shy-cloud-3319.fly.dev/api/v1/auth/me")
				.then((response) => {
					console.log(response.data);
					setUser(response.data.data);
				})
				.catch((error) => console.log(error.response));
		};

		if (!token) {
			navigate("/");
		}
		fetchData();
	}, [navigate, token]);
 
    return (
      <div className="container" style={{ marginTop: "50px" }}>
          <div className="row justify-content-center">
              <div className="col-md-12">
                  <div className="card border-0 rounded shadow-sm">
                      <div className="card-body">
                          SELAMAT DATANG <strong className="text-uppercase">{user.name}</strong>
                          <hr />
                          {/* <button onClick={logoutHandler} className="btn btn-md btn-danger">LOGOUT</button> */}
                      </div>
                  </div>
              </div>
          </div>
      </div>
  )

}

