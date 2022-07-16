const Batch = require('../models/batch')
const HTTP_STATUS = require('../utils/httpStatus');
const { success, failure } = require('../utils/commonResponse');
const { validationResult } = require('express-validator');

class batchController {

    async createBatch(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure('Invalid Inputs', errors.array()));
            }

            const title = req.body.title;
            const description = req.body.description;
            const startDate = req.body.startDate;
            const endDate = req.body.endDate;
            const trainees = req.body.trainees;
            const courses = req.body.courses;

            const batch = new Batch({ title, description, startDate, endDate, trainees, courses });
            await batch.save();

            return res.status(HTTP_STATUS.OK).send(success('Batch is created successfully!', batch));
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async getBatches(req, res, next) {
        try {
            const batches = await Batch.find()
            return res
                .status(HTTP_STATUS.OK)
                .send(
                    success('All batches are fetched successfully', batches)
                );

        } catch (error) {
            next(error);
        }
    }

    async getBatch(req, res, next) {
        try {
            const batchId = req.params.batchId;
            const batch = await Batch.findOne({ batchId }).populate('trainees', 'name email _id imageUrl').populate('courses').exec();
            return res
                .status(HTTP_STATUS.OK)
                .send(
                    success('Batch is found', batch)
                );

        } catch (error) {
            next(error);
        }
    }

    async editBatch(req, res, next) {
        try {
            const errors = validationResult(req);
            const batchId = req.params.batchId;
            const updatedBatch = await Batch.findById(batchId);
    
            if (!errors.isEmpty()) {
                return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure('Invalid Inputs', errors.array()));
            }

            if (updatedBatch) {
                updatedBatch.title = req.body.title? req.body.title : updatedBatch.title;
                updatedBatch.description = req.body.description? req.body.description : updatedBatch.description;
                updatedBatch.startDate = req.body.startDate? req.body.startDate : updatedBatch.startDate;
                updatedBatch.endDate = req.body.endDate? req.body.endDate : updatedBatch.endDate;
                updatedBatch.trainees = req.body.trainees? req.body.trainees : updatedBatch.trainees;
                updatedBatch.courses = req.body.courses? req.body.courses : updatedBatch.courses;

                await updatedBatch.save();
                return res.status(HTTP_STATUS.OK).send(success('Batch is updated successfully!', updatedBatch));
            }
            return res.status(HTTP_STATUS.NOT_FOUND).send(failure('Batch is not found to update' ))


        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async deleteBatch(req, res, next) {
        try {
            const  batchId = req.params.batchId;
            await Batch.findByIdAndDelete(batchId).exec();
            return res
                .status(HTTP_STATUS.OK)
                .send(success('Batch is deleted successfully'));
        } catch (error) {
            next(error);
        }
    }
}


module.exports = new batchController();