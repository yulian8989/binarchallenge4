import React, { useEffect, useState } from "react";
import { Box, Card, CardMedia, Grid } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import axios from "axios";

function Home() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [searchResult, setSearchResult] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await axios
        .get("https://shy-cloud-3319.fly.dev/api/v1/auth/me")
        .then((response) => {
          console.log(response.data);

        })
        .catch((error) => console.log(error.response));
    };

    if (!token) {
      navigate("/");
    }
    fetchData();
  }, [navigate, token]);

  useEffect(() => {
    const getMovie = async () => {
      try {
        const response = await axios.request(
          "https://shy-cloud-3319.fly.dev/api/v1/movie/popular",
          {
            method: "GET",
            params: { language: "en-US", page: "1" },
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMovies(response.data.data);
      } catch (err) {
        console.log(err.response);
      }
    };
    getMovie();
  }, [token]);

  console.log(movies);

  useEffect(() => {
    const getMovie = async () => {
      try {
        const response = await axios.request(
          `https://shy-cloud-3319.fly.dev/api/v1/search/movie?page=1&query=${search}`,
          {
            method: "GET",
            params: { language: "en-US", page: "1" },
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setSearchResult(response.data.data);
      } catch (err) {
        console.log(err.response);
      }
    };
    getMovie();
  }, [token, search]);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://image.tmdb.org/t/p/original${movies[2]?.poster_path})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "450px",
          width: "100%",
        }}
      >
        <div //button atas dan logo
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px",
          }}
        >
          <div style={{ padding: "10px" }}>
            <h1
              style={{ color: "#FF0000", fontSize: "60px", fontWeight: "bold" }}
            >
              MovieList
            </h1>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              style={{
                marginRight: "200px",
                border: "2px solid rgba(255, 0, 0, 0.5)",
                backgroundColor: "transparent",
                color: "white",
                fontSize: "20px",
                outline: "none",
                width: "500px",
                borderRadius: "20px",
              }}
              type="search"
              id="gsearch"
              name="gsearch"
              placeholder="What do you want to watch?"
              onChange={(e) => setSearch(e.target.value)}
            />
            { isLoggedIn ? (
              <div>
                <Button
                  onClick={logoutHandler}
                  color="error"
                  variant="outlined"
                  sx={{
                    height: "50px",
                    marginLeft: "10px",
                    borderRadius: "30px",
                  }}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div>
                <Button
                  onClick={() => navigate("/SignUp")}
                  color="error"
                  variant="contained"
                  sx={{ height: "50px", borderRadius: "30px" }}
                >
                  Register
                </Button>
                <Button
                  onClick={() => navigate("/Login")}
                  color="error"
                  variant="outlined"
                  sx={{
                    height: "50px",
                    marginRight: "20px",
                    marginLeft: "10px",
                    borderRadius: "30px",
                  }}
                >
                  Login
                </Button>
              </div>
            )}
          </div>
        </div>

        <div style={{ padding: "20px" }}>
          <h1
            style={{ color: "#F1F1F1", fontSize: "40px", fontWeight: "bolder" }}
          >
            {movies[2]?.original_title}
          </h1>
          <h5 style={{ color: "#F1F1F1", fontWeight: "lighter" }}>
            {movies[2]?.overview}
          </h5>
          <Button
            variant="contained"
            sx={{
              color: "white",
              bgcolor: "red",
              fontWeight: "bold",
              borderRadius: "20px",
            }}
          >
            {" "}
            Watch Trailer
          </Button>
        </div>
      </div>
      <div style={{ paddingTop: "10px", paddingLeft: "10px" }}>
        <h1 style={{ color: "#000000", fontSize: "40px" }}>Popular Movies</h1>
        <div style={{ paddingRight: "30px", textAlign: "right" }}>
          <h4 style={{ color: "#FF0000", fontSize: "20px" }}>See All Movies</h4>
        </div>
      </div>

      <div>
        <Grid
          container
          spacing={2}
          style={{
            paddingTop: "20px",
            paddingRight: "20px",
            paddingLeft: "20px",
          }}
        >
          {searchResult &&
            searchResult.map((movie) => {
              return (
                <Grid item xs={3}>
                  <Box>
                    <Link to={`/movieDetail/${movie.id}`}>
                      <Card>
                        <CardMedia
                          component="img"
                          height="450"
                          image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        ></CardMedia>
                      </Card>
                    </Link>
                  </Box>
                </Grid>
              );
            })}
          {movies.map((movie) => {
            return (
              <Grid item xs={3}>
                <Box>
                  <Link to={`/movieDetail/${movie.id}`}>
                    <Card>
                      <CardMedia
                        component="img"
                        height="450"
                        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      ></CardMedia>
                    </Card>
                  </Link>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </>
  );
}
export default Home;
