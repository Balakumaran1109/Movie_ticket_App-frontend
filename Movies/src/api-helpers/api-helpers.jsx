import axios from "axios";

// api for getting all the movies
export const getAllMovies = async () => {
  const res = await axios.get("/movie").catch((error) => {
    console.log(error);
  });

  if (res.status !== 200) {
    return console.log("No data");
  }

  const data = await res.data;
  return data;
};

// api for user authentication
export const sendUserAuthRequest = async (data, signup) => {
  const res = await axios
    .post(`/user/${signup ? "signup" : "login"}`, {
      name: signup ? data.name : "",
      email: data.email,
      password: data.password,
    })
    .catch((error) => {
      const resError = error.response;
      const errorMessage = resError.data;
      const validation = errorMessage.message;
      alert(validation);
    });

  if (res.status != 200 && res.status != 201) {
    return console.log("Unexpected Error occured");
  }

  const resData = await res.data;
  return resData;
};

// api for admin authentiation
export const sendAdminAuthRequest = async (data) => {
  const res = await axios
    .post("/admin/login", {
      email: data.email,
      password: data.password,
    })
    .catch((error) => {
      const resError = error.response;
      const errorMessage = resError.data;
      const validation = errorMessage.message;
      alert(validation);
    });

  if (res.status != 200) {
    return console.log("Unexpected Error occured");
  }

  const resData = await res.data;
  return resData;
};

// api for getting the movie details using id
export const getMovieDetails = async (id) => {
  const res = await axios.get(`/movie/${id}`).catch((error) => {
    console.log(error);
  });

  if (res.status !== 200) {
    return console.log("Unexpected Error occured");
  }

  const resData = await res.data;
  return resData;
};

// api for creating new booking
export const newBooking = async (data) => {
  const res = await axios
    .post("/booking", {
      movie: data.movie,
      seatNumber: data.seatNumber,
      date: data.date,
      user: localStorage.getItem("userId"),
    })
    .catch((error) => {
      console.log(error);
    });

  if (res.status !== 201) {
    return console.log("Unexpected Error occured");
  }

  const resData = await res.data;
  return resData;
};

// api for getting user bookings
export const getUserBooking = async () => {
  const id = localStorage.getItem("userId");
  const res = await axios.get(`/user/bookings/${id}`).catch((error) => {
    console.log(error);
  });

  if (res.status !== 200) {
    return console.log("Unexpected Error occured");
  }

  const resData = await res.data;
  return resData;
};

// api to delete the booking
export const deleteBooking = async (id) => {
  const res = await axios.delete(`/booking/${id}`).catch((error) => {
    console.log(error);
  });

  if (res.status !== 200) {
    return console.log("Unexpected Error occured");
  }

  const resData = await res.data;
  return resData;
};

// api for getting user details
export const getUserDetails = async () => {
  const id = localStorage.getItem("userId");
  const res = await axios.get(`/user/${id}`).catch((error) => {
    console.log(error);
  });

  if (res.status !== 200) {
    return console.log("Unexpected Error occured");
  }

  const resData = await res.data;
  return resData;
};

// api for adding movie
export const addMovie = async (data) => {
  const res = await axios
    .post(
      "/movie",
      {
        title: data.title,
        description: data.description,
        releaseDate: data.releaseDate,
        posterUrl: data.posterUrl,
        featured: data.featured,
        actors: data.actors,
        admin: localStorage.getItem("adminId"),
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .catch((error) => {
      console.log(error);
    });

  if (res.status !== 201) {
    return console.log("Unexpected Error occured");
  }

  const resData = await res.data;
  return resData;
};

// api to get a admin details by admin id
export const getAdminById = async () => {
  const adminId = localStorage.getItem("adminId");
  const res = await axios.get(`/admin/${adminId}`).catch((error) => {
    console.log(error);
  });

  if (res.status !== 200) {
    return console.log("Unexpected Error occured");
  }

  const resData = await res.data;
  return resData;
};
