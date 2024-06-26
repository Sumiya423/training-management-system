const express = require('express');
const databaseConnection = require('./config/database');
const dotenv = require('dotenv');
var cors = require('cors')
const { failure } = require('./utils/commonResponse');
const HTTP_STATUS = require('./utils/httpStatus');
const app = express();
const path = require('path')
dotenv.config();

const userRouter = require('./routes/user');
const authRouter = require('./routes/auth')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/images',express.static(path.join(__dirname, 'images')));

app.use('/admin',userRouter);
app.use(authRouter);
app.use((req, res, next) => {
    res.status(HTTP_STATUS.NOT_FOUND).send(failure('NOT FOUND'));
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(
        failure('Internal Server Error!', err.message)
    );
});

databaseConnection(()=>{
    app.listen(4000, () => {
        console.log('app listening at post 4000')
    });
})
