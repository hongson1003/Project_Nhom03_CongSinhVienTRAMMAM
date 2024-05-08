
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode ?? 500;
    res.status(statusCode ?? 500).json({
        error: statusCode,
        message: err.message
    })
}

// const errorHandler = (err, req, res, next) => {
//     const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
//     res.status(statusCode);
//     res.json({
//         message: err.message,
//         stack: process.env.NODE_ENV === 'production' ? null : err.stack,
//     })
// };

const notFoundHandler = (req, res, next) => {
    const response = {
        error: 404,
        message: `Not found - ${req.originalUrl}`
    }
    res.status(200).json(response)
}

module.exports = {
    errorHandler,
    notFoundHandler
}

