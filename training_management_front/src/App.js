import './styles/style.css';
import './App.css';
import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from './share/header/header'

import Layout from './share/layouts/layouts';

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: "token" in localStorage,
  user: JSON.parse(localStorage.getItem("user")),
  token: JSON.parse(localStorage.getItem("token")),
};

const  reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("token", JSON.stringify(action.payload.access_token));
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.access_token,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <AuthContext.Provider value={{state, dispatch}}>
      <div>
        <Header/>
        <Layout/>
      </div>
    </AuthContext.Provider>
  )
}

export default App;
