import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const MovieItem = ({ title, releaseDate, posterUrl, id }) => {
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const navigate = useNavigate();

  const handleClick = () => {
    if (isUserLoggedIn) {
      navigate(`/booking/${id}`);
    } else {
      navigate("/auth");
    }
  };
  return (
    <Card
      sx={{
        margin: 1,
        width: 250,
        height: 320,
        borderRadius: 5,
        ":hover": {
          boxShadow: "10px 10px 20px #ccc",
        },
      }}
    >
      <img height={"50%"} width={"100%"} src={posterUrl} alt={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {new Date(releaseDate).toDateString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          LinkComponent={Link}
          onClick={handleClick}
          sx={{
            margin: "auto",
            bgcolor: "#2b2d42",
            ":hover": { bgcolor: "#121217" },
          }}
          size="small"
        >
          Book
        </Button>
      </CardActions>
    </Card>
  );
};

export default MovieItem;
