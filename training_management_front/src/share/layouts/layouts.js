import React, { useState, useEffect } from "react";
import { Routes, Route, useParams } from "react-router-dom";

import Header from "../header/header";
import Profile from "../../component/profile/profile";
import WrongUrl from "../../component/wrongUrl/wrongUrl"
import CourseList from "../../component/course/courseList"
import CreateTrainer from '../../component/auth/createTrainer';
import CreateTrainee from '../../component/auth/createTrainee';
import Trainee from '../../component/auth/traineeList';
import Trainer from '../../component/auth/trainerList';
import EditProfile from "../../component/auth/editProfile";
import CourseDetails from "../../component/course/courseDetails";
import BatchList from "../../component/batch/batchList";
import BatchDetails from "../../component/batch/batchDetails";
import Login from '../../component/auth/login';
import SetNewPassword from '../../component/auth/setNewPassword'

function Layout() {

    return (
        <div className="layout">
            <div className="layout__container">
                <div className="layout__container-body">
                    <Routes>
                        <Route path="/*" element={<WrongUrl />} />
                        <Route exact path="/" element={<Profile />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route exact path="/admin/courses" element={<CourseList />} />
                        <Route exact path="/courses" element={<CourseList />} />
                        <Route exact path="/admin/trainer/create" element={<CreateTrainer />} />
                        <Route exact path="/admin/trainee/create" element={<CreateTrainee />} />
                        <Route exact path="/profile" element={<Profile />} />
                        <Route exact path="/profile/edit" element={<EditProfile />} />
                        <Route exact path="/signin" element={<Login />} />
                        <Route exact path="/admin/trainee" element={<Trainee />} />
                        <Route exact path="/admin/trainer" element={<Trainer />} />
                        <Route exact path="/change-password/:token/:user_id" element={<SetNewPassword />} />
                        <Route exact path="/admin/courses/:courseId" element={<CourseDetails />} />
                        <Route exact path="/admin/batches" element={<BatchList />} />
                        <Route exact path="/admin/batches/:batchId" element={<BatchDetails />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default Layout;