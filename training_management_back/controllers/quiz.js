const Quiz = require('../models/quiz');
const HTTP_STATUS = require('../utils/httpStatus');
const { success, failure } = require('../utils/commonResponse');
const { validationResult } = require('express-validator');

class quizController{

    async createQuiz(req, res, next){
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure('Invalid Inputs', errors.array()));
            }

            const title = req.body.title;
            const description = req.body.description;
            const score = req.body.score;
            const trainee = req.body.trainee;
            const date = req.body.date;
            
            const quiz = new Quiz({ title, description, score, trainee, date});
            await quiz.save();

            return res.status(HTTP_STATUS.OK).send(success('Quiz is created successfully!', quiz));
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async getQuizes(req, res, next){
        try {
            const quizes = await Quiz.find()
            return res
            .status(HTTP_STATUS.OK)
            .send(
                success('All quizes are fetched successfully', quizes)
            );
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async getQuiz(req, res, next){
        try {
            const quizId = req.params.quizId;
            const quiz= await Quiz.findById(quizId);
            if (quiz) {
                return res.status(HTTP_STATUS.OK).send(success('Quiz is found', quiz));
            }

            return res.status(HTTP_STATUS.OK).send(success('Quiz is not Found'));
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async deleteQuiz(req,res,next){
        try {
            const  quizId = req.params.quizId;
            await Quiz.findByIdAndDelete(quizId).exec();
            return res
                .status(HTTP_STATUS.OK)
                .send(success('Quiz is deleted successfully'));
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new quizController();