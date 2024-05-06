import React from "react";
import AuthForm from "./AuthForm";
import { sendAdminAuthRequest } from "../../api-helpers/api-helpers";
import { useDispatch } from "react-redux";
import { adminActions } from "../../store/Index";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onResRecieved = (data) => {
    console.log(data);
    dispatch(adminActions.login());
    localStorage.setItem("adminId", data.id);
    localStorage.setItem("token", data.token);
    navigate("/");
  };

  // admin authentication
  const getData = (data) => {
    console.log("Admin", data);
    sendAdminAuthRequest(data.inputs)
      .then(onResRecieved)
      .catch((err) => console.log(err));
  };
  return <AuthForm onSubmit={getData} isAdmin={true} />;
};

export default Admin;
