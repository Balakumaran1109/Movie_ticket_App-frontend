import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import MovieItem from "./movie/MovieItem";
import { Link } from "react-router-dom";
import { getAllMovies } from "../api-helpers/api-helpers";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const getMovies = async () => {
    setLoading(true)
    const data = await getAllMovies();
    setMovies(data.movies);
    setLoading(false)

  };

  // getting initial data
  useEffect(() => {
    getMovies();
  }, []);
  return (
    <Box width={"100%"} height={"100%"} margin={"auto"} marginTop={2}>
      <Box margin={"auto"} width={"80%"} height={"40vh"} padding={2}>
        <img
          width={"100%"}
          height={"100%"}
          src="https://www.brandsynario.com/wp-content/uploads/2021/12/spiderman.jpg"
          alt="Spiderman"
        />
      </Box>
      <Box padding={5} margin={"auto"}>
        <Typography variant="h4" textAlign={"center"}>
          Latest Releases
        </Typography>
      </Box>
      <Box
        margin={"auto"}
        display={"flex"}
        width={"80%"}
        justifyContent={"center"}
        flexWrap={"wrap"}
        alignItems={"center"}
      >
        {loading ? (
          <h3>Fetching Latest Movies... Please Wait...</h3>
        ) : (
          movies
            .slice(0, 4)
            .map((movie, index) => (
              <MovieItem
                key={index}
                id={movie._id}
                title={movie.title}
                posterUrl={movie.posterUrl}
                releaseDate={movie.releaseDate}
              />
            ))
        )}
      </Box>
      <Box display={"flex"} padding={5} margin={"auto"}>
        <Button
          LinkComponent={Link}
          to="/movie"
          variant="outlined"
          sx={{ margin: "auto", color: "#2b2d42" }}
        >
          View All Movies
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
