const gateway = require('../config/gateway.config.json');
const axios = require('../config/axios').default;
import CircuitBreaker from 'opossum';
import getRedis from '../config/redis';

// Khởi tạo một mạch Circuit Breaker duy nhất
const breaker = new CircuitBreaker(async (semester) => {
    const response = await axios.get(gateway.services['enrollment-service'].url + gateway.routes['get-course-registers'].path + `?semester=${semester}`);
    return response;
}, {
    enabled: true,
    timeout: 10000, // If our function takes longer than 10 seconds, trigger a failure
    errorThresholdPercentage: 50, // When 50% of requests fail, trip the circuit
    volumeThreshold: 2,
    rollingCountTimeout: 300000,
    resetTimeout: 60000 // After 60 seconds, try again.
});

const getCourseRegistersBySemester = async (req, res, next) => {
    try {
        const semester = req.query.semester;
        // Gọi API thông qua mạch Circuit Breaker
        const result = await breaker.fire(semester);
        return res.status(200).json(result);
    } catch (error) {
        if (!error.message)
            error.message = 'Server is busy, please try again later';
        else 
            error.message = error.message + ', please try again later';
        next(error);
    }
};


const newCourseRegister = async (req, res, next) => {
    try {
        const root = gateway.services['enrollment-service'].url;
        const path = gateway.routes['new-course-register'].path;
        const enrollRes = await axios.post(root + path, req.body);
        return res.status(200).json(enrollRes);
    } catch (error) {
        next(error);
    }
}

const deleteCourseRegister = async (req, res, next) => {
    try {
        const registerId = req.body.registerId;
        const root = gateway.services['enrollment-service'].url;
        const path = gateway.routes['delete-course-register'].path;
        const enrollRes = await axios.delete(root + path, { data: { registerId } });
        return res.status(200).json(enrollRes);
    } catch (error) {
        next(error);
    }

}

const createNewClazz = async (req, res, next) => {
    try {
        const root = gateway.services['enrollment-service'].url;
        const path = gateway.routes['new-clazz'].path;
        const enrollRes = await axios.post(root + path, req.body);
        return res.status(200).json(enrollRes);
    } catch (error) {
        next(error);
    }
}

const getClazzByRegisterId = async (req, res, next) => {
    try {
        const courseRegisterId = req.query.courseRegisterId;
        const root = gateway.services['enrollment-service'].url;
        const path = gateway.routes['get-clazzes'].path + `?courseRegisterId=${courseRegisterId}`;
        const enrollRes = await axios.get(root + path);
        return res.status(200).json(enrollRes);
    } catch (error) {
        next(error);
    }
}

const deleteClazz = async (req, res, next) => {
    try {
        const clazzId = req.body.clazzId;
        const root = gateway.services['enrollment-service'].url;
        const path = gateway.routes['delete-clazz'].path;
        const enrollRes = await axios.delete(root + path, { data: { clazzId } });
        return res.status(200).json(enrollRes);
    } catch (error) {
        next(error);
    }
}

const getDaysOfWeek = async (req, res, next) => {
    try {
        const root = gateway.services['enrollment-service'].url;
        const path = gateway.routes['get-days'].path;
        const enrollRes = await axios.get(root + path);
        return res.status(200).json(enrollRes);
    } catch (error) {
        next(error);
    }
}

const getLessions = async (req, res, next) => {
    try {
        const root = gateway.services['enrollment-service'].url;
        const path = gateway.routes['get-lessions'].path;
        const enrollRes = await axios.get(root + path);
        return res.status(200).json(enrollRes);
    } catch (error) {
        next(error);
    }
}

const createNewSchedule = async (req, res, next) => {
    try {
        const root = gateway.services['enrollment-service'].url;
        const path = gateway.routes['new-schedule'].path;
        const enrollRes = await axios.post(root + path, req.body);
        return res.status(200).json(enrollRes);
    } catch (error) {
        next(error);
    }
}

const getScheduleByClazzId = async (req, res, next) => {
    try {
        const clazzId = req.query.clazzId;
        const root = gateway.services['enrollment-service'].url;
        const path = gateway.routes['get-schedules'].path + `?clazzId=${clazzId}`;
        const enrollRes = await axios.get(root + path);
        return res.status(200).json(enrollRes);
    } catch (error) {
        next(error);
    }
}

const createNewEnrollment = async (req, res, next) => {
    try {
        const root = gateway.services['enrollment-service'].url;
        const path = gateway.routes['new-enrollment'].path;
        const enrollRes = await axios.post(root + path, req.body);
        // update redis
        const redis = await getRedis();
        const key = `getScheduleMyself_${req.body.week}`;
        await redis.del(key);
        return res.status(200).json(enrollRes);
    } catch (error) {
        next(error);
    }

}

const deleteEnrollment = async (req, res, next) => {
    try {
        const enrollmentId = req.body.enrollmentId;
        const root = gateway.services['enrollment-service'].url;
        const path = gateway.routes['delete-enrollment'].path;
        const enrollRes = await axios.delete(root + path, { data: { enrollmentId } });
        // update redis
        const redis = await getRedis();
        const key = `getScheduleMyself_${req.body.week}`;
        await redis.del(key);
        return res.status(200).json(enrollRes);
    } catch (error) {
        next(error);
    }
}

const getEnrollments = async (req, res, next) => {
    try {
        const semester = req.query.semester;
        const root = gateway.services['enrollment-service'].url;
        const path = gateway.routes['get-enrollments'].path + `?semester=${semester}`;
        const enrollRes = await axios.get(root + path);
        return res.status(200).json(enrollRes);
    } catch (error) {
        next(error);
    }
}

const getCourseEnrollments = async (req, res, next) => {
    try {
        const semester = req.query.semester;
        const root = gateway.services['enrollment-service'].url;
        const path = gateway.routes['get-all-course-enrollments'].path + `?semester=${semester}`;
        const enrollRes = await axios.get(root + path);
        return res.status(200).json(enrollRes);
    } catch (error) {
        next(error);
    }

}

const getScheduleMyself = async (req, res, next) => {
    try {
        const week = +req.params.week;
        const cache = req.query.cache;
        const startRequestTime = Date.now();
        if (cache === 'CACHE'){
            const redis = await getRedis();
            const key = `getScheduleMyself_${week}`;
            const value = await redis.get(key);
            if (value) {
                const endRequestTime = Date.now();
                return res.status(200).json({
                    ...JSON.parse(value),
                    time: endRequestTime - startRequestTime
                });
            }
        }else if (cache === 'NO-CACHE') {
            const redis = await getRedis();
            const key = `getScheduleMyself_${week}`;
            await redis.del(key);
        }
        
        if (!cache) {
            return res.status(200).json({ message: 'Cache is not implemented yet' });
        }
        if (!week) {
            return res.status(400).json({ message: 'Week is required' });
        }
        const root = gateway.services['enrollment-service'].url;
        const path = gateway.routes['get-schedule-by-week'].path + `/${week}`;
        const enrollRes = await axios.get(root + path);
        const endRequestTime = Date.now();
        if (cache === 'CACHE') {
            const redis = await getRedis();
            const key = `getScheduleMyself_${week}`;
            await redis.set(key, JSON.stringify(enrollRes));
        }
        return res.status(200).json({
            ...enrollRes,
            time: endRequestTime - startRequestTime
        });
    } catch (error) {
        next(error);
    }

}


module.exports = {
    getCourseRegistersBySemester, newCourseRegister, deleteCourseRegister,
    createNewClazz, getClazzByRegisterId, deleteClazz, getDaysOfWeek,
    getLessions, createNewSchedule, getScheduleByClazzId, createNewEnrollment,
    deleteEnrollment, getEnrollments, getCourseEnrollments, getScheduleMyself
}