import React, { useState, useEffect } from "react";
import './App.css';
import { Routes, Route, useParams } from "react-router-dom";

import StartPage from "./component/startPage/startPage";
import WrongUrl from "./component/wrongUrl/wrongUrl";
import CourseList from "./component/course/courseList";
import CourseDetails from "./component/course/courseDetails";
import BatchList from "./component/batch/batchList";
import BatchDetails from "./component/batch/batchDetails";
import Profile from "./component/profile/profile";

function App() {
  
  return (
    <div >
      
        <Routes>
          <Route path="/*" element={<WrongUrl />} />
          <Route exact path="/" element={<StartPage />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/admin/courses" element={<CourseList/>} />
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
  )
}

export default App;