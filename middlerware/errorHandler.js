const {constants} = require("../constant")

const errorHandler = (err, req, res, next) => {
    const statusCode = err.status || 500;
   switch(statusCode){
    case constants.VALIDATION_ERROR : 

    res.status(statusCode).json({
        title : "Validation failed ",
        message: err.message,
        stackTrace: err.stack, // For debugging; remove in production
    });

    break ; 
    case constants.NOT_FOUND : 
    res.status(statusCode).json({
        title : "not found  ",
        message: err.message,
        stackTrace: err.stack, // For debugging; remove in production
    });

    break ; 
    case constants.UNAUTHORIZED: 
    res.status(statusCode).json({
        title : "unothorized  ",
        message: err.message,
        stackTrace: err.stack, // For debugging; remove in production
    });

    break ; 
    case constants.FORBIDDEN : 
    res.status(statusCode).json({
        title : "forbidden  ",
        message: err.message,
        stackTrace: err.stack, // For debugging; remove in production
    });

    break ; 
    case constants.SERVER_ERROR : 
    res.status(statusCode).json({
        title : "internal server error  ",
        message: err.message,
        stackTrace: err.stack, // For debugging; remove in production
    });
    default: 

  console.log("No error all good")
    break ; 



   }
    console.log("Inside error handler");
};

module.exports = errorHandler ;
