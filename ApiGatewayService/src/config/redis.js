import { createClient } from 'redis';

async function initRedis(){
    const redis = await createClient()
        .on('error', err => {
            err.message = 'Redis Client error';
            throw err;
        })
        .on('connect', () => console.log('Redis Client Connected'))
        .connect();

    return redis;
}

export default async function getRedis() {
    // Đảm bảo rằng Redis đã được khởi tạo trước khi trả về client
    const client = await initRedis();
    return client;
}