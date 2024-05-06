import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllMovies } from "../../api-helpers/api-helpers";
import MovieItem from "./MovieItem";

const Movies = () => {
  const [movies, setMovies] = useState();

  // getting initial data
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Box margin={"auto"} marginTop={4}>
      <Typography
        margin={"auto"}
        variant="h4"
        padding={2}
        width={"40%"}
        bgcolor={"#900C3F"}
        color={"white"}
        textAlign={"center"}
      >
        All Movies
      </Typography>
      <Box
        width={"90%"}
        margin={"auto"}
        marginTop={5}
        display={"flex"}
        justifyContent={"center"}
        flexWrap={"wrap"}
      >
        {movies &&
          movies.map((movie, index) => (
            <MovieItem
              key={index}
              id={movie._id}
              title={movie.title}
              posterUrl={movie.posterUrl}
              releaseDate={movie.releaseDate}
            />
          ))}
      </Box>
    </Box>
  );
};

export default Movies;
