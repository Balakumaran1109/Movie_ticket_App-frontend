import React, { useEffect, useState } from "react";
import {
  AppBar,
  Autocomplete,
  Box,
  IconButton,
  Tab,
  Tabs,
  TextField,
  Toolbar,
} from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import { getAllMovies } from "../api-helpers/api-helpers";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminActions, userActions } from "../store/Index";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [movies, setMovies] = useState([]);

  // getting initial data
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);

  // logout using dispatch
  const logout = (isAdmin) => {
    dispatch(isAdmin ? adminActions.logout() : userActions.logout());
  };

  const handleChange = (e, val) => {
    const movie = movies.find((e) => e.title === val);
    if (isUserLoggedIn) {
      navigate(`/booking/${movie._id}`);
    }
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: "#2b2d42" }}>
      <Toolbar>
        <Box width={"20%"}>
          <IconButton sx={{ color: "white" }} LinkComponent={Link} to="/">
            <MovieIcon />
          </IconButton>
        </Box>
        <Box width={"30%"} margin={"auto"}>
          <Autocomplete
            onChange={handleChange}
            freeSolo
            options={movies && movies.map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                sx={{ input: { color: "white" } }}
                variant={"standard"}
                {...params}
                placeholder="Search for Movies"
              />
            )}
          />
        </Box>
        <Box display={"flex"}>
          <Tabs textColor={"inherit"}>
            <Tab LinkComponent={Link} to="/movie" label="Movies" />

            {!isAdminLoggedIn && !isUserLoggedIn && (
              <>
                {" "}
                <Tab LinkComponent={Link} to="/admin" label="Admin" />
                <Tab LinkComponent={Link} to="/auth" label="Auth" />
              </>
            )}

            {isUserLoggedIn && (
              <>
                {" "}
                <Tab LinkComponent={Link} to="/user" label="Profile" />
                <Tab
                  onClick={() => logout(false)}
                  LinkComponent={Link}
                  to="/"
                  label="Logout"
                />
              </>
            )}

            {isAdminLoggedIn && (
              <>
                {" "}
                <Tab LinkComponent={Link} to="/add" label="Add Movie" />
                <Tab LinkComponent={Link} to="/user-admin" label="Profile" />
                <Tab
                  onClick={() => logout(true)}
                  LinkComponent={Link}
                  to="/"
                  label="Logout"
                />
              </>
            )}
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
