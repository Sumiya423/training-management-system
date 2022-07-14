const Course = require('../models/course');
const HTTP_STATUS = require('../utils/httpStatus');
const { success, failure } = require('../utils/commonResponse');
const { validationResult } = require('express-validator');

class courseController{

    async createCourse(req, res, next){
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure('Invalid Inputs', errors.array()));
            }

            const title = req.body.title;
            const description = req.body.description;
            const topics = req.body.topics;
            const startDate = req.body.startDate;
            const endDate = req.body.endDate;
            
            const course = new Course({ title, description, topics, startDate, endDate});
            await course.save();

            return res.status(HTTP_STATUS.OK).send(success('Course is created successfully!', course));
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async getCourses(req, res, next){
        try {
            const courses = await Course.find()
            return res
            .status(HTTP_STATUS.OK)
            .send(
                success('All users are fetched successfully', courses)
            );
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async getCourse(req, res, next){
        try {
            const courseId = req.params.courseId;
            const course= await Course.findById(courseId);
            if (course) {
                return res.status(HTTP_STATUS.OK).send(success('Course is found', course));
            }

            return res.status(HTTP_STATUS.OK).send(success('Course is not Found'));
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async editCourse(req, res, next){
        try {
            const errors = validationResult(req);
            const courseId = req.params.courseId;
            const updatedCourse= await Course.findById(courseId);
    
            if (!errors.isEmpty()) {
                return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure('Invalid Inputs', errors.array()));
            }

            if (updatedCourse) {
                updatedCourse.title = req.body.title? req.body.title : updatedCourse.title;
                updatedCourse.description = req.body.description? req.body.description : updatedCourse.description;
                updatedCourse.topics = req.body.topics? req.body.topics : updatedCourse.topics;
                updatedCourse.startDate = req.body.startDate? req.body.startDate : updatedCourse.startDate;
                updatedCourse.endDate = req.body.endDate? req.body.endDate : updatedCourse.endDate;

                await updatedCourse.save();
                return res.status(HTTP_STATUS.OK).send(success('Course is updated successfully!', updatedCourse));
            }
            return res.status(HTTP_STATUS.NOT_FOUND).send(failure('Course is not found to update' ))
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async deleteCourse(req,res,next){
        try {
            const  courseId = req.params.courseId;
            await Course.findByIdAndDelete(courseId).exec();
            return res
                .status(HTTP_STATUS.OK)
                .send(success('Course is deleted successfully'));
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new courseController();