
const sendDeveError = (err,res)=>{
    res.status(err.statusCode).json({
        status:err.status,
        message:err.message,
        error:err,
        stack:err.stack
    });
}

module.exports = (err,req,res,next)=>{
    console.log(err.stack);
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    sendDeveError(err,res);
}