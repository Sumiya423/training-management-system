import React from "react";
import { Routes, Route} from "react-router-dom";

import Profile from "../../component/profile/profile";
import WrongUrl from "../../component/wrongUrl/wrongUrl"
import CourseList from "../../component/course/courseList"
import CreateTrainer from '../../component/auth/createTrainer';
import CreateTrainee from '../../component/auth/createTrainee';
import Trainer from '../../component/auth/trainerList';
import EditProfile from "../../component/auth/editProfile";
import CourseDetails from "../../component/course/courseDetails";
import BatchList from "../../component/batch/batchList";
import BatchDetails from "../../component/batch/batchDetails";
import Login from '../../component/auth/login';
import SetNewPassword from '../../component/auth/setNewPassword'
import ForgetPassword from "../../component/auth/forgetPassword";
import { AuthContext } from '../../App';
import CreateBatch from "../../component/batch/createBatch";
import EditBatch from "../../component/batch/editBatch";
import CreateCourse from "../../component/course/createCourse";
import EditCourse from "../../component/course/editCourse";
import UserProfile from "../../component/auth/userDetails";
import UserList from "../../component/auth/traineeList";

function Layout() {
    const { state: authState } = React.useContext(AuthContext)
    return (
        <div className="layout">
            <div className="layout__container">
                <div className="layout__container__body">
                    <Routes>
                        <Route path="/*" element={<WrongUrl />} />
                        {authState.isAuthenticated && <Route exact path="/" element={<Profile />} />}
                        {!authState.isAuthenticated && <Route exact path="/" element={<Login />} />}
                        <Route path="/profile" element={<Profile />} />
                        <Route exact path="/admin/courses" element={<CourseList />} />
                        <Route exact path="/courses" element={<CourseList />} />
                        <Route exact path="/admin/trainer/create" element={<CreateTrainer />} />
                        <Route exact path="/admin/trainee/create" element={<CreateTrainee />} />
                        <Route exact path="/admin/user/:userId" element={<UserProfile />} />
                        <Route exact path="/profile/edit" element={<EditProfile />} />
                        {!authState.isAuthenticated &&  <Route exact path="/signin" element={<Login />} />}
                        <Route exact path="/admin/users" element={<UserList />} />
                        <Route exact path="/admin/trainer" element={<Trainer />} />
                        <Route exact path="/change-password/:token/:user_id" element={<SetNewPassword />} />
                        <Route exact path="/reset-password/:token/:user_id" element={<SetNewPassword />} />
                        <Route exact path="/forget-password" element={<ForgetPassword />} />
                        <Route exact path="/admin/courses/:courseId" element={<CourseDetails />} />
                        <Route exact path="/admin/courses/:courseId/edit" element={<EditCourse />} />
                        <Route exact path="/admin/batches" element={<BatchList />} />
                        <Route exact path="/batches" element={<BatchList />} />
                        <Route exact path="/admin/batches/create" element={<CreateBatch />} />
                        <Route exact path="/admin/courses/create" element={<CreateCourse />} />
                        <Route exact path="/admin/batches/:batchId" element={<BatchDetails />} />
                        <Route exact path="/admin/batches/:batchId/edit" element={<EditBatch />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default Layout;