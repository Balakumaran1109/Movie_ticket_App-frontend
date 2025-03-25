import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieDetails, newBooking } from "../../api-helpers/api-helpers";
import { Box, Button, FormLabel, TextField, Typography } from "@mui/material";

const Booking = () => {
  const [movie, setmovie] = useState();
  const [inputs, setInputs] = useState({ seatNumber: "", date: new Date().toDateString() });
  const id = useParams().id;
  const navigate = useNavigate();

  // getting initial details
  useEffect(() => {
    getMovieDetails(id)
      .then((res) => setmovie(res.movie))
      .catch((err) => console.log(err));
  }, [id]);

  // new booking request
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("inputs", inputs);
    newBooking({ ...inputs, movie: movie._id })
      .then((res) => {
        alert("Movie Booked successfully");
        console.log(res);
        navigate("/user");
      })
      .catch((err) => console.log(err));
  };

  const numbers = Array.from({ length: 51 }, (_, index) => index);

  const handleSelect = (e) => {
    setInputs((prevState) => ({ ...prevState, seatNumber: e.target.value }));
  };

  const getNext3Days = () => {
    const dates = [];
    for (let i = 1; i < 5; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date.toDateString());
    }
    return dates;
  };

  const handleDateChange = (event) => {
    setInputs((prevState) => ({ ...prevState, date: event.target.value }));
  };

  const dates = getNext3Days();
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
              marginLeft={5}
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
                  Release Date: {new Date().toDateString()}
                </Typography>
              </Box>
            </Box>
            <Box marginRight={9} marginTop={5} width={"50%"}>
              <form onSubmit={handleSubmit}>
                <Box
                  padding={5}
                  margin={"auto"}
                  display={"flex"}
                  flexDirection={"row"}
                  justifyContent={"space-evenly"}
                  marginRight={5}
                  textAlign={"center"}
                >
                  <Box>
                    <FormLabel>Seat Number</FormLabel>
                    <br></br>
                    <br></br>

                    <select onChange={handleSelect}>
                      {numbers.map((number) => (
                        <option key={number} value={number}>
                          {number}
                        </option>
                      ))}
                    </select>
                    <p>
                      Selected Seat Number : <b>{inputs.seatNumber}</b>
                    </p>
                  </Box>
                  <br></br>
                  <br></br>

                  <Box>
                    <FormLabel>Date</FormLabel>
                    <br></br>
                    <br></br>
                    <select value={inputs.date} onChange={handleDateChange}>
                      {dates.map((date) => (
                        <option key={date} value={date}>
                          {date}
                        </option>
                      ))}
                    </select>
                    <p>
                      Selected Date: <b>{inputs.date}</b>
                    </p>
                  </Box>
                </Box>
                <Box textAlign={"center"}>
                  <Button type="submit" variant="contained" sx={{ mt: 3 }}>
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
