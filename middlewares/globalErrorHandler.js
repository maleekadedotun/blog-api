const globalErrorhandler =(err, req, res, next)=>{
    // status
    // message
    // stack
    const stack = err.stack;
    const message = err.message;
    const status = 'failed'
    const statusCode = err?.stackCode? err.statusCode : 404;
    // Send the response
    res.status(statusCode).json({
        message,
        stack, 
        status,
      
    })
}

module.exports = globalErrorhandler