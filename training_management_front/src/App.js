import './App.css';
import React from "react";
import { Routes, Route } from "react-router-dom";

import StartPage from "./component/startPage/startPage";
import WrongUrl from "./component/wrongUrl/wrongUrl";
import CourseList from "./component/course/courseList";
import CourseDetails from "./component/course/courseDetails";
import BatchList from "./component/batch/batchList";
import BatchDetails from "./component/batch/batchDetails";
import Profile from "./component/profile/profile";
import Login from './component/auth/login';
import SetNewPassword from './component/auth/setNewPassword'
import Header from './share/header/header'
import CreateTrainer from './component/auth/createTrainer';


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
        <Routes>
          <Route path="/*" element={<WrongUrl />} />
          <Route exact path="/" element={<StartPage />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/signin" element={<Login/>} />
          <Route exact path="/change-password/:token/:user_id" element={<SetNewPassword/>} />
          <Route exact path="/admin/courses" element={<CourseList/>} />
          <Route exact path="/admin/trainer/create" element={<CreateTrainer/>} />
          <Route exact path="/admin/courses/:courseId" element={<CourseDetails/>} />
          <Route exact path="/admin/batches" element={<BatchList/>} />
          <Route exact path="/admin/batches/:batchId" element={<BatchDetails/>} />
          {/* <Route exact path="/login" element={<SignInPage setUser={setUser} />} />
          <Route exact path="/signup" element={<SignUpPage />} />
          <Route path="/forget-password" element={ <ForgetPasswordPage/> } />
          <Route path="/reset-password/:token/:id" element={ <ResetPasswordPage/> } /> */}
        </Routes>
      
        {/* {user && <Layouts setUser={setUser}/>} */}
      </div>
    </AuthContext.Provider>
  )
}

export default App;
