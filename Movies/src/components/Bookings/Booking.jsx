import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieDetails, newBooking } from "../../api-helpers/api-helpers";
import { Box, Button, FormLabel, TextField, Typography } from "@mui/material";

const Booking = () => {
  const [movie, setmovie] = useState();
  const [inputs, setInputs] = useState({ seatNumber: "", date: "" });
  const id = useParams().id;
  const navigate = useNavigate();

  // getting initial details
  useEffect(() => {
    getMovieDetails(id)
      .then((res) => setmovie(res.movie))
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // new booking request
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    newBooking({ ...inputs, movie: movie._id })
      .then((res) => {
        alert("Movie Booked successfully");
        console.log(res);
        navigate("/user");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {movie && (
        <Fragment>
          <Typography
            padding={3}
            fontFamily={"fantasy"}
            variant="h4"
            textAlign={"center"}
          >
            Book Ticket of movies : {movie.title}
          </Typography>
          <Box display={"flex"} justifyContent={"center"}>
            <Box
              display={"flex"}
              justifyContent={"column"}
              flexDirection={"column"}
              paddingTop={3}
              width={"50%"}
              marginRight={"auto"}
            >
              <Box width={"70%"} textAlign={"center"}>
                <img
                  width={"80%"}
                  height={"300px"}
                  src={movie.posterUrl}
                  alt={movie.title}
                ></img>
              </Box>

              <Box width={"65%"} padding={2} textAlign={"center"}>
                <Typography paddingTop={2}>{movie.description}</Typography>
                <Typography fontWeight={"bold"} marginTop={1}>
                  Movie: {movie.title}
                </Typography>

                <Typography fontWeight={"bold"} marginTop={1}>
                  Starrer: {movie.actors.map((actor) => " " + actor + " ")}
                </Typography>
                <Typography fontWeight={"bold"} marginTop={1}>
                  Release Date: {new Date(movie.releaseDate).toDateString()}
                </Typography>
              </Box>
            </Box>
            <Box padding={3} width={"50%"}>
              <form onSubmit={handleSubmit}>
                <Box
                  padding={5}
                  margin={"auto"}
                  display={"flex"}
                  flexDirection={"column"}
                >
                  <FormLabel>Seat Number</FormLabel>
                  <TextField
                    value={inputs.seatNumber}
                    onChange={handleChange}
                    name="seatNumber"
                    type={"number"}
                    margin="normal"
                    variant="standard"
                  ></TextField>

                  <FormLabel>Date</FormLabel>
                  <TextField
                    value={inputs.date}
                    onChange={handleChange}
                    name="date"
                    type={"date"}
                    margin="normal"
                    variant="standard"
                  ></TextField>
                  <Button type="submit" sx={{ mt: 3 }}>
                    Book Now
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
        </Fragment>
      )}
    </div>
  );
};

export default Booking;
