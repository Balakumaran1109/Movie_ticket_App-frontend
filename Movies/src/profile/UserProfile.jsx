import React, { Fragment, useEffect, useState } from "react";
import {
  deleteBooking,
  getUserBooking,
  getUserDetails,
} from "../api-helpers/api-helpers";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const UserProfile = () => {
  const [bookings, setBookings] = useState();
  const [user, setUser] = useState();

  // getting initial data of user bookings

  const initialData = () => {
    getUserBooking()
      .then((res) => setBookings(res.bookings))
      .catch((err) => console.log(err));

    getUserDetails()
      .then((res) => {
        setUser(res.user);
      })
      .catch((err) => console.log(err));
  };
  // to delete a booking
  const handleDelete = (id) => {
    deleteBooking(id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    initialData();
  };

  useEffect(() => {
    initialData();
  }, []);

  return (
    <Box width={"100%"} display={"flex"}>
      {
        <Fragment>
          {" "}
          {user && (
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              width={"30%"}
              padding={3}
            >
              <AccountCircleIcon sx={{ fontSize: "10rem" }}></AccountCircleIcon>
              <Typography
                padding={1}
                width={"auto"}
                textAlign={"center"}
                border={"1px solid #ccc"}
                borderRadius={6}
              >
                Name: {user.name}
              </Typography>

              <Typography
                marginTop={1}
                padding={1}
                width={"auto"}
                textAlign={"center"}
                border={"1px solid #ccc"}
                borderRadius={6}
              >
                Email: {user.email}
              </Typography>
            </Box>
          )}
          {bookings && (
            <Box width={"70%"} display={"flex"} flexDirection={"column"}>
              <Typography
                variant="h3"
                fontFamily={"verdana"}
                textAlign={"center"}
                padding={2}
              >
                Bookings
              </Typography>
              <Box
                margin={"auto"}
                display={"flex"}
                flexDirection={"column"}
                width={"80%"}
              >
                <List>
                  {bookings.map((booking, index) => (
                    <ListItem
                      sx={{
                        bgcolor: "#00d386",
                        color: "white",
                        textAlign: "left",
                        margin: 1,
                      }}
                    >
                      <ListItemText sx={{ margin: "auto", width: "40%" }}>
                        Movie: {booking.movie.title}
                      </ListItemText>

                      <ListItemText sx={{ margin: "auto", width: "30%" }}>
                        Seat: {booking.seatNumber}
                      </ListItemText>

                      <ListItemText sx={{ margin: "auto", width: "30%" }}>
                        Date: {new Date(booking.date).toDateString()}
                      </ListItemText>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(booking._id)}
                      >
                        <DeleteForeverIcon></DeleteForeverIcon>
                      </IconButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Box>
          )}
        </Fragment>
      }
    </Box>
  );
};

export default UserProfile;
