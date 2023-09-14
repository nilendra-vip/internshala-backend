exports.generatedErrors = (err , req ,res ,next)=>{
    const statusCode = res.statusCode || 500;


    if(err.name === 'MongoServerError' && err.message.includes('E11000 duplicate key')){
        err.message = "Student with this Email address is already exists";
    }


    res.status(statusCode).json({
        message: err.message,
        errName : err.name,
        // stack: err.stack
    });
};