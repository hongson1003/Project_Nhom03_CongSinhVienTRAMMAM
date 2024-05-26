const { RateLimiterMemory } = require('rate-limiter-flexible');

const rateLimiter = new RateLimiterMemory({
    points: 10, // Số điểm tối đa mà một người dùng có thể nhận trước khi bị chặn
    duration: 15 * 60, // Khoảng thời gian (seconds) mà số điểm được tính toán
});

// Middleware để áp dụng rate limiting cho tất cả các yêu cầu
const rateLimiterMiddleware = (req, res, next) => {
    rateLimiter.consume(1)
        .then(() => {
            next();
        })
        .catch(() => {
            res.status(429).send({
                errCode: 429,
                message: 'Too many requests, please try again later. To DDOS this server is not a good idea!',
            });
        });
};

module.exports = rateLimiterMiddleware;
