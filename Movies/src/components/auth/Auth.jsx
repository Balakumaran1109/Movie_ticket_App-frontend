import React from "react";
import AuthForm from "./AuthForm";
import { sendUserAuthRequest } from "../../api-helpers/api-helpers";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/Index";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onRecievedData = (data) => {
    console.log(data);
    dispatch(userActions.login());
    localStorage.setItem("userId", data.id);
    navigate("/");
  };

  // user authentication
  const getData = async (data) => {
    console.log("Auth", data);

    sendUserAuthRequest(data.inputs, data.signup)
      .then(onRecievedData)
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={false} />
    </div>
  );
};

export default Auth;
