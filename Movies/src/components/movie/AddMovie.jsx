import {
  Box,
  Button,
  Checkbox,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { addMovie } from "../../api-helpers/api-helpers";
import { useNavigate } from "react-router-dom";

const AddMovie = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    posterUrl: "",
    releaseDate: "",
    featured: false,
  });

  const [actors, setActors] = useState([]);
  const [actor, setActor] = useState("");

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // adding new movie
  const handleSubmit = (e) => {
    e.preventDefault();
    addMovie({ ...inputs, actors })
      .then((res) => {
        alert("Movie added successfully");
        console.log(res);
        navigate("/movie");
      })
      .catch((err) => console.log(err));
  };

  const labelProps = {
    mt: 1,
    mb: 1,
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          width={"50%"}
          padding={10}
          margin={"auto"}
          display={"flex"}
          flexDirection={"column"}
          boxShadow={"10px 10px 20px #ccc"}
        >
          <Typography textAlign={"center"} variant="h5" fontFamily={"verdana"}>
            Add New Movie
          </Typography>
          <FormLabel sx={labelProps}>Title</FormLabel>
          <TextField
            value={inputs.title}
            onChange={handleChange}
            name="title"
            variant="standard"
            margin="normal"
            required
          ></TextField>

          <FormLabel sx={labelProps}>Description</FormLabel>
          <TextField
            value={inputs.description}
            onChange={handleChange}
            name="description"
            variant="standard"
            margin="normal"
            required
          ></TextField>

          <FormLabel sx={labelProps}>Poster URL</FormLabel>
          <TextField
            value={inputs.posterUrl}
            onChange={handleChange}
            name="posterUrl"
            variant="standard"
            margin="normal"
            required
          ></TextField>

          <FormLabel sx={labelProps}>Release Date</FormLabel>
          <TextField
            type={"date"}
            value={inputs.releaseDate}
            onChange={handleChange}
            name="releaseDate"
            variant="standard"
            margin="normal"
            required
          ></TextField>

          <FormLabel sx={labelProps}>Actors</FormLabel>
          <Box display={"flex"}>
            <TextField
              name="actor"
              value={actor}
              onChange={(e) => setActor(e.target.value)}
              variant="standard"
              margin="normal"
              required
            ></TextField>
            <Button
              onClick={() => {
                setActors([...actors, actor]);
                setActor("");
              }}
            >
              Add
            </Button>
          </Box>
          <FormLabel sx={labelProps}>Featured</FormLabel>
          <Checkbox
            name="featured"
            checked={inputs.featured}
            onClick={(e) =>
              setInputs((prevState) => ({
                ...prevState,
                featured: e.target.checked,
              }))
            }
            sx={{ mr: "auto" }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              margin: "auto",
              width: "30%",
              bgcolor: "#2b2d42",
              ":hover": { bgcolor: "#121217" },
            }}
          >
            Add Movie
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddMovie;
