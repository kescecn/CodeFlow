import authActions from "./authActions";
import axios from "axios";

// konvencije radi, dispatch se predaje kao drugi poziv funkcije (poput middlewarea)

const login = ({ username, password }) => (authDispatch) => {
  authDispatch({
    type: authActions.LOGIN_LOADING,
  });

  axios
    .post(
      "/authenticate",
      {
        username,
        password,
      },
      { baseURL: "http://localhost:8080", withCredentials: true }
    )
    .then((res) => {
      authDispatch({
        type: authActions.LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      authDispatch({
        type: authActions.LOGIN_ERROR,
        payload: err.response ? err.response.data : "COULD NOT CONNECT",
      });
    });
};

export default login;
