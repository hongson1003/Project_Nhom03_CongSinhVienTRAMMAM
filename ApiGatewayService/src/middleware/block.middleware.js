import { RateLimiterRedis } from 'rate-limiter-flexible';
import getRedis from '../config/redis';

// Tạo ra rate limiter
const createRateLimiter = async () => {
    const redisClient = await getRedis();
    const limiter = new RateLimiterRedis({
        storeClient: redisClient,
        keyPrefix: 'login_attempts', // tiền tố cho các khóa lưu trữ trong Redis
        points: 2, // số lần đăng nhập tối đa
        duration: 60, // khoảng thời gian tính bằng giây (ở đây là 60 giây hoặc 1 phút)
        blockDuration: 60 // chặn trong 1 phút nếu vượt quá số lần đăng nhập
    });
    return limiter;
};

// Middleware để kiểm tra rate limiting
const rateLimiterMiddleware = async (req, res, next) => {
    try {
        const codeId = req.body.codeId;
        const limiter = await createRateLimiter();
        await limiter.consume(codeId); // Sử dụng codeId của người dùng để theo dõi
        next();
    } catch (err) {
        if (err && err.msBeforeNext !== undefined) {
            const retryAfterSeconds = Math.ceil(err.msBeforeNext / 1000); // Chuyển đổi thời gian thành giây
            return res.status(429).json({ message: 'Too Many Requests - Try again later', retryAfterSeconds });
        }
        next(err);
    }
};

export { createRateLimiter, rateLimiterMiddleware };
