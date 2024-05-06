import { Route, Routes } from "react-router-dom";
import Header from "./components/Header.jsx";
import Admin from "./components/auth/Admin.jsx"
import Auth from "./components/auth/Auth.jsx"
import Movies from "./components/movie/Movies.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { adminActions, userActions } from "./store/Index.jsx";
import Booking from "./components/Bookings/Booking.jsx";
import UserProfile from "./profile/UserProfile.jsx";
import AddMovie from "./components/movie/AddMovie.jsx";
import AdminProfile from "./profile/AdminProfile.jsx";
import HomePage from "./components/HomePage.jsx";



function App() {
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);

  console.log("isAdminLoggedIn", isAdminLoggedIn);
  console.log("isUserLoggedIn", isUserLoggedIn);

  useEffect(() => {
    if(localStorage.getItem("userId")){
      dispatch(userActions.login());
    }
    else if(localStorage.getItem("adminId")){
      dispatch(adminActions.login());
    }
  },[dispatch])
  return (  
    <>
      <Header />

      <section>
        <Routes>
          <Route path="/" element={<HomePage/>}></Route>
          <Route path="/movie" element={<Movies/>}></Route>
          { !isUserLoggedIn && !isAdminLoggedIn && (<><Route path="/admin" element={<Admin/>}></Route>
          <Route path="/auth" element={<Auth/>}></Route></>)}
          {isUserLoggedIn && !isAdminLoggedIn && (<><Route path="/user" element={<UserProfile/>}></Route>
          <Route path="/booking/:id" element={<Booking/>}></Route></>)}
         { isAdminLoggedIn && !isUserLoggedIn && (<><Route path="/add" element={<AddMovie/>}></Route>
          <Route path="/user-admin" element={<AdminProfile/>}></Route></>)}
          
        </Routes>
      </section>
    </>
  );
} 

export default App;
 
 