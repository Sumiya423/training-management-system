import React, { useState, useEffect } from "react";
import { Routes, Route, useParams } from "react-router-dom";

import Header from "../header/Header";
import Profile from "../../component/profile/profile";
import WrongUrl from "../../views/wrongUrl/wrongUrl";

function Layout() {

    return (
        <div className="layout">
            <div className="layout__container">
                <Header />
                <div className="layout__container-body">
                    <Routes>
                        <Route path="/*" element={<WrongUrl />} />
                        <Route path="/profile" element={<Profile />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default Layout;