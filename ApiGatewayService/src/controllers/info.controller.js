const gateway = require('../config/gateway.config.json');
const axios = require('../config/axios').default;

const createNewBasis = async (req, res, next) => {
    try {
        const root = gateway.services['info-service'].url;
        const path = gateway.routes['new-basic'].path;
        const infoRes = await axios.post(root + path, req.body);
        return res.status(200).json(infoRes.data);
    } catch (error) {
        next(error);
    }
}

const getBasis = async (req, res, next) => {
    try {
        const limit = req.query.limit;
        const root = gateway.services['info-service'].url;
        const path = gateway.routes['get-bases'].path + `?limit=${limit}`;
        const infoRes = await axios.get(root + path);
        return res.status(200).json(infoRes);
    } catch (error) {
        next(error);
    }
}

const getBasisById = async (req, res, next) => {
    try {
        const basisId = req.params.basisId;
        const root = gateway.services['info-service'].url;
        const path = gateway.routes['get-basis-by-id'].path + `/${basisId}`;
        const infoRes = await axios.get(root + path);
        return res.status(200).json(infoRes);
    } catch (error) {
        next(error);
    }
}

const updateBasis = async (req, res, next) => {
    try {
        const root = gateway.services['info-service'].url;
        const path = gateway.routes['update-basis'].path;
        const infoRes = await axios.put(root + path, req.body);
        return res.status(200).json(infoRes);
    } catch (error) {
        next(error);
    }
}

const deleteBasis = async (req, res, next) => {
    try {
        const basisId = req.params.basisId;
        const root = gateway.services['info-service'].url;
        const path = gateway.routes['delete-basis'].path + `/${basisId}`;
        const infoRes = await axios.delete(root + path);
        return res.status(200).json(infoRes);
    } catch (error) {
        next(error);
    }
}

const createNewRoom = async (req, res, next) => {
    try {
        const root = gateway.services['info-service'].url;
        const path = gateway.routes['new-room'].path;
        const infoRes = await axios.post(root + path, req.body);
        return res.status(200).json(infoRes);
    } catch (error) {
        next(error);
    }
}

const getRooms = async (req, res, next) => {
    try {
        const limit = req.query.limit;
        const root = gateway.services['info-service'].url;
        const path = gateway.routes['get-rooms'].path + `?limit=${limit}`;
        const infoRes = await axios.get(root + path);
        return res.status(200).json(infoRes);
    } catch (error) {
        next(error);
    }

}

const deleteRoom = async (req, res, next) => {
    try {
        const roomId = req.params.roomId;
        const root = gateway.services['info-service'].url;
        const path = gateway.routes['delete-room'].path + `/${roomId}`;
        const infoRes = await axios.delete(root + path);
        return res.status(200).json(infoRes);
    } catch (error) {
        next(error);
    }
}

const getRoomById = async (req, res, next) => {
    try {
        const roomId = req.params.roomId;
        const root = gateway.services['info-service'].url;
        const path = gateway.routes['get-room-by-id'].path + `/${roomId}`;
        const infoRes = await axios.get(root + path);
        return res.status(200).json(infoRes);
    } catch (error) {
        next(error);
    }

}

const createNewDepartment = async (req, res, next) => {
    try {
        const root = gateway.services['info-service'].url;
        const path = gateway.routes['new-department'].path;
        const infoRes = await axios.post(root + path, req.body);
        return res.status(200).json(infoRes);
    } catch (error) {
        next(error);
    }
}

const getDepartments = async (req, res, next) => {
    try {
        const limit = req.query.limit;
        const root = gateway.services['info-service'].url;
        const path = gateway.routes['get-departments'].path + `?limit=${limit}`;
        const infoRes = await axios.get(root + path);
        return res.status(200).json(infoRes);
    } catch (error) {
        next(error);
    }
}

const getDepartmentById = async (req, res, next) => {
    try {
        const departmentId = req.params.departmentId;
        const root = gateway.services['info-service'].url;
        const path = gateway.routes['get-department-by-id'].path + `/${departmentId}`;
        const infoRes = await axios.get(root + path);
        return res.status(200).json(infoRes);
    } catch (error) {
        next(error);
    }
}

const deleteDepartment = async (req, res, next) => {
    try {
        const departmentId = req.params.departmentId;
        const root = gateway.services['info-service'].url;
        const path = gateway.routes['delete-department'].path + `/${departmentId}`;
        const infoRes = await axios.delete(root + path);
        return res.status(200).json(infoRes);
    } catch (error) {
        next(error);
    }
}

const createNewSpecialize = async (req, res, next) => {
    try {
        const root = gateway.services['info-service'].url;
        const path = gateway.routes['new-specialize'].path;
        const infoRes = await axios.post(root + path, req.body);
        return res.status(200).json(infoRes);
    } catch (error) {
        next(error);
    }

}

const getSpecializes = async (req, res, next) => {
    try {
        const limit = req.query.limit;
        const root = gateway.services['info-service'].url;
        const path = gateway.routes['get-specializes'].path + `?limit=${limit}`;
        const infoRes = await axios.get(root + path);
        return res.status(200).json(infoRes);
    } catch (error) {
        next(error);
    }
}

const getSpecializeById = async (req, res, next) => {
    try {
        const specializeId = req.params.specializeId;
        const root = gateway.services['info-service'].url;
        const path = gateway.routes['get-specialize-by-id'].path + `/${specializeId}`;
        const infoRes = await axios.get(root + path);
        return res.status(200).json(infoRes);
    } catch (error) {
        next(error);
    }
}

const deleteSpecialize = async (req, res, next) => {
    try {
        const specializeId = req.params.specializeId;
        const root = gateway.services['info-service'].url;
        const path = gateway.routes['delete-specialize'].path + `/${specializeId}`;
        const infoRes = await axios.delete(root + path);
        return res.status(200).json(infoRes);
    } catch (error) {
        next(error);
    }
}

const createNewUser = async (req, res, next) => {
    try {
        const root = gateway.services['info-service'].url;
        const path = gateway.routes['new-user'].path;
        const infoRes = await axios.post(root + path, req.body);
        return res.status(200).json(infoRes);
    } catch (error) {
        next(error);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const codeId = req.params.codeId;
        const root = gateway.services['info-service'].url;
        const path = gateway.routes['delete-user'].path + `/${codeId}`;
        const infoRes = await axios.delete(root + path);
        return res.status(200).json(infoRes);
    } catch (error) {
        next(error);
    }
}

const updateUser = async (req, res, next) => {
    try {
        const root = gateway.services['info-service'].url;
        const path = gateway.routes['update-user'].path;
        const infoRes = await axios.put(root + path, req.body);
        return res.status(200).json(infoRes);
    } catch (error) {
        next(error);
    }
}

const getUsers = async (req, res, next) => {
    try {
        const limit = req.query.limit;
        const root = gateway.services['info-service'].url;
        const path = gateway.routes['get-user-infos'].path + `?limit=${limit}`;
        const infoRes = await axios.get(root + path);
        return res.status(200).json(infoRes);
    } catch (error) {
        next(error);
    }
}

const getUserById = async (req, res, next) => {
    try {
        const codeId = req.params.codeId;
        const root = gateway.services['info-service'].url;
        const path = gateway.routes['get-user-info-by-id'].path + `/${codeId}`;
        const infoRes = await axios.get(root + path);
        return res.status(200).json(infoRes);
    } catch (error) {
        next(error);
    }
}

const createNewStudent = async (req, res, next) => {
    try {
        const root = gateway.services['info-service'].url;
        const path = gateway.routes['new-student'].path;
        const infoRes = await axios.post(root + path, req.body);
        return res.status(200).json(infoRes);
    } catch (error) {
        next(error);
    }
}

const deleteStudent = async (req, res, next) => {
    try {
        const codeId = req.params.codeId;
        const root = gateway.services['info-service'].url;
        const path = gateway.routes['delete-student'].path + `/${codeId}`;
        const infoRes = await axios.delete(root + path);
        return res.status(200).json(infoRes);
    } catch (error) {
        next(error);
    }
}

const getStudentId = async (req, res, next) => {
    try {
        const codeId = req.params.codeId;
        const root = gateway.services['info-service'].url;
        const path = gateway.routes['get-student-by-id'].path + `/${codeId}`;
        const infoRes = await axios.get(root + path);
        return res.status(200).json(infoRes);
    } catch (error) {
        next(error);
    }
}

const updateStudent = async (req, res, next) => {
    try {
        const root = gateway.services['info-service'].url;
        const path = gateway.routes['update-student'].path;
        const infoRes = await axios.put(root + path, req.body);
        return res.status(200).json(infoRes);
    } catch (error) {
        next(error);
    }
}

const createNewTeacher = async (req, res, next) => {
    try {
        const root = gateway.services['info-service'].url;
        const path = gateway.routes['new-teacher'].path;
        const infoRes = await axios.post(root + path, req.body);
        return res.status(200).json(infoRes);
    } catch (error) {
        next(error);
    }
}

const updateTeacher = async (req, res, next) => {
    try {
        const root = gateway.services['info-service'].url;
        const path = gateway.routes['update-teacher'].path;
        const infoRes = await axios.put(root + path, req.body);
        return res.status(200).json(infoRes);
    } catch (error) {
        next(error);
    }
}

const getTeacherById = async (req, res, next) => {
    try {
        const codeId = req.params.codeId;
        const root = gateway.services['info-service'].url;
        const path = gateway.routes['get-teacher-by-id'].path + `/${codeId}`;
        const infoRes = await axios.get(root + path);
        return res.status(200).json(infoRes);
    } catch (error) {
        next(error);
    }
}

const deleteTeacher = async (req, res, next) => {
    try {
        const codeId = req.params.codeId;
        const root = gateway.services['info-service'].url;
        const path = gateway.routes['delete-teacher'].path + `/${codeId}`;
        const infoRes = await axios.delete(root + path);
        return res.status(200).json(infoRes);
    } catch (error) {
        next(error);
    }
}






module.exports = {
    createNewBasis, getBasis, getBasisById, updateBasis, deleteBasis,
    createNewRoom, getRooms, deleteRoom, getRoomById, createNewDepartment,
    getDepartments, getDepartmentById, deleteDepartment, createNewSpecialize,
    getSpecializes, getSpecializeById, deleteSpecialize, createNewUser,
    deleteUser, updateUser, getUsers, getUserById, createNewStudent,
    deleteStudent, getStudentId, updateStudent, createNewTeacher, updateTeacher,
    getTeacherById, deleteTeacher
}