import React, { useState, useEffect } from "react";
import './App.css';
import { Routes, Route, useParams } from "react-router-dom";

import StartPage from "./component/startPage/startPage";
import WrongUrl from "./component/wrongUrl/wrongUrl";

function App() {
  
  return (
    <div >
      
        <Routes>
          <Route path="/*" element={<WrongUrl />} />
          <Route exact path="/" element={<StartPage />} />
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