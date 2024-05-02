import infoService from '../services/infoService';

// room

const createNewRoom = async (req, res, next) => {
    try {
        const { name, basisId } = req.body;
        if (!name || !basisId) {
            return res.status(400).json({
                errCode: 1,
                message: 'Missing required fields'
            })
        }
        // check basis is exist
        const resBasis = await infoService.getBasisById(basisId);
        if (resBasis.errCode !== 0) {
            return res.status(400).json({
                errCode: 1,
                message: 'Basis not found'
            })
        };

        const response = await infoService.createNewRoom(req.body, resBasis.data)
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}

const getRoom = async (req, res, next) => {
    try {
        const limit = +req.query.limit || 10;
        const response = await infoService.getRoom(limit);
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }

};

const deleteRoom = async (req, res, next) => {
    try {
        const roomId = req.params.roomId;
        const response = await infoService.deleteRoom(roomId);
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}

const getRoomById = async (req, res, next) => {
    try {
        const roomId = req.params.roomId;
        const response = await infoService.getRoomById(roomId);
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}

// basis

const createNewBasis = async (req, res, next) => {
    try {
        const { address, name, dateFouded } = req.body;
        if (!address || !name || !dateFouded) {
            throw new Error('Missing required fields')
        }
        const response = await infoService.createNewBasis(req.body)
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}

const getBasis = async (req, res, next) => {
    try {
        const limit = +req.query.limit || 10;
        const response = await infoService.getBasis(limit);
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}

const getBasisById = async (req, res, next) => {
    try {
        const basisId = req.params.basisId;
        const response = await infoService.getBasisById(basisId);
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }

}

const updateBasis = async (req, res, next) => {
    try {
        const { basisId, address, name, dateFouded } = req.body;
        if (!basisId || !address || !name || !dateFouded) {
            throw new Error('Missing required fields')
        }
        const response = await infoService.updateBasis(req.body)
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}

const deleteBasis = async (req, res, next) => {
    try {
        const basisId = req.params.basisId;
        const response = await infoService.deleteBasis(basisId);
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }

}

// department

const createNewDepartment = async (req, res, next) => {
    try {
        const { name, phoneNumber, roomId } = req.body;
        if (!name || !phoneNumber || !roomId) {
            return res.status(400).json({
                errCode: 1,
                message: 'Missing required fields'
            })
        }
        // check room is exist
        const resRoom = await infoService.getRoomById(roomId);
        if (resRoom.errCode !== 0) {
            return res.status(400).json({
                errCode: 1,
                message: 'Room not found'
            })
        };
        const response = await infoService.createNewDepartment(req.body, resRoom.data)
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}

const getDepartments = async (req, res, next) => {
    try {
        const limit = +req.query.limit || 10;
        const response = await infoService.getDepartments(limit);
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}

const getDepartmentById = async (req, res, next) => {
    try {
        const departmentId = req.params.departmentId;
        const response = await infoService.getDepartmentById(departmentId);
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}

const deleteDepartment = async (req, res, next) => {
    try {
        const departmentId = req.params.departmentId;
        const response = await infoService.deleteDepartment(departmentId);
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}

// specialize
const createNewSpecialize = async (req, res, next) => {
    try {
        const { name, departmentId, numberOfYearsTraining, totalCredits } = req.body;
        if (!name || !departmentId || !numberOfYearsTraining || !totalCredits) {
            return res.status(400).json({
                errCode: 1,
                message: 'Missing required fields'
            })
        }
        // check department is exist
        const resDepartment = await infoService.getDepartmentById(departmentId);
        if (resDepartment.errCode !== 0) {
            return res.status(400).json({
                errCode: 1,
                message: 'Department not found'
            })
        };

        const response = await infoService.createNewSpecialize(req.body, resDepartment.data)
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}

const getSpecializes = async (req, res, next) => {
    try {
        const limit = +req.query.limit || 10;
        const response = await infoService.getSpecializes(limit);
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}

const getSpecializeById = async (req, res, next) => {
    try {
        const specializeId = req.params.specializeId;
        const response = await infoService.getSpecializeById(specializeId);
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}

const deleteSpecialize = async (req, res, next) => {
    try {
        const specializeId = req.params.specializeId;
        const response = await infoService.deleteSpecialize(specializeId);
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}

// user
const createNewUser = async (req, res, next) => {
    try {
        const {
            codeId,
            firstName, lastName, phoneNumber, email, gender, birthdate, address,
            avatar, placeOfBirth, nation, schoolEntryDate, profileCode, basisId, specializeId
        } = req.body;
        if (!codeId || !firstName || !lastName || !phoneNumber || !email || !Number.isInteger(gender) || !avatar ||
            !birthdate || !address || !placeOfBirth || !nation || !schoolEntryDate ||
            !profileCode || !basisId || !specializeId) {
            return res.status(400).json({
                errCode: 1,
                message: 'Missing required fields'
            })
        }
        // check basis is exist
        const resBasis = await infoService.getBasisById(basisId);
        if (resBasis.errCode !== 0) {
            return res.status(400).json({
                errCode: 1,
                message: 'Basis not found'
            })
        };
        // check specialize is exist
        const resSpecialize = await infoService.getSpecializeById(specializeId);
        if (resSpecialize.errCode !== 0) {
            return res.status(400).json({
                errCode: 1,
                message: 'Specialize not found'
            })
        };
        const response = await infoService.createNewUser(req.body, resBasis.data, resSpecialize.data);
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const codeId = req.params.codeId;
        const response = await infoService.deleteUser(codeId);
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}

const updateUser = async (req, res, next) => {
    try {
        const {
            codeId,
            firstName, lastName, phoneNumber, email, gender, birthdate, address,
            avatar, placeOfBirth, nation, schoolEntryDate, profileCode, basisId, specializeId
        } = req.body;
        if (!codeId || !firstName || !lastName || !phoneNumber || !email || !Number.isInteger(gender) || !avatar ||
            !birthdate || !address || !placeOfBirth || !nation || !schoolEntryDate ||
            !profileCode || !basisId || !specializeId) {
            return res.status(400).json({
                errCode: 1,
                message: 'Missing required fields'
            })
        }
        // check basis is exist
        const resBasis = await infoService.getBasisById(basisId);
        if (resBasis.errCode !== 0) {
            return res.status(400).json({
                errCode: 1,
                message: 'Basis not found'
            })
        };
        // check specialize is exist
        const resSpecialize = await infoService.getSpecializeById(specializeId);
        if (resSpecialize.errCode !== 0) {
            return res.status(400).json({
                errCode: 1,
                message: 'Specialize not found'
            })
        };
        const response = await infoService.updateUser(req.body, resBasis.data, resSpecialize.data);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

const getUsers = async (req, res, next) => {
    try {
        const limit = +req.query.limit || 10;
        const response = await infoService.getUsers(limit);
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}

const getUserById = async (req, res, next) => {
    try {
        const codeId = req.params.codeId;
        const response = await infoService.getUserById(codeId);
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}

// student

const createNewStudent = async (req, res, next) => {
    try {
        const { codeId, educationLevel, numberOfCreditsIsCompleted, cumulativeGPA } = req.body;
        if (!codeId || !educationLevel) {
            return res.status(400).json({
                errCode: 1,
                message: 'Missing required fields'
            })
        }
        const response = await infoService.createNewStudent(req.body);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

const deleteStudent = async (req, res, next) => {
    try {
        const codeId = req.params.codeId;
        const response = await infoService.deleteStudent(codeId);
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}

const getStudentByCodeId = async (req, res, next) => {
    try {
        const codeId = req.params.codeId;
        const response = await infoService.getStudentByCodeId(codeId);
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}

const updateStudent = async (req, res, next) => {
    try {
        const { codeId, educationLevel, numberOfCreditsIsCompleted, totalCredits
            , cumulativeGPA } = req.body;
        if (!codeId || !educationLevel || !totalCredits) {
            return res.status(400).json({
                errCode: 1,
                message: 'Missing required fields'
            })
        }
        const response = await infoService.updateStudent(req.body);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

// teacher

const createNewTeacher = async (req, res, next) => {
    try {
        const { codeId, educationLevel, yearContactExpired } = req.body;
        if (!codeId || !educationLevel || !yearContactExpired) {
            return res.status(400).json({
                errCode: 1,
                message: 'Missing required fields'
            })
        }
        const response = await infoService.createNewTeacher(req.body);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

const getTeacherById = async (req, res, next) => {
    try {
        const codeId = req.params.codeId;
        const response = await infoService.getTeacherById(codeId);
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}

const deleteTeacher = async (req, res, next) => {
    try {
        const codeId = req.params.codeId;
        const response = await infoService.deleteTeacher(codeId);
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}

const updateTeacher = async (req, res, next) => {
    try {
        const { codeId, educationLevel, yearContactExpired } = req.body;
        if (!codeId || !educationLevel || !yearContactExpired) {
            return res.status(400).json({
                errCode: 1,
                message: 'Missing required fields'
            })
        }
        const response = await infoService.updateTeacher(req.body);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

// certificate

const createNewCertificate = async (req, res, next) => {
    try {
        const { name, description } = req.body;
        if (!name || !description) {
            return res.status(400).json({
                errCode: 1,
                message: 'Missing required fields'
            })
        }
        const response = await infoService.createNewCertificate(req.body);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }

}

const getCertificates = async (req, res, next) => {
    try {
        const limit = +req.query.limit || 10;
        const response = await infoService.getCertificates(limit);
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}

const getCertificateById = async (req, res, next) => {
    try {
        const certificateId = req.params.certificateId;
        const response = await infoService.getCertificateById(certificateId);
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}

const deleteCertificate = async (req, res, next) => {
    try {
        const certificateId = req.params.certificateId;
        const response = await infoService.deleteCertificate(certificateId);
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}

// detail certificate user

const createNewDetailCertificateUser = async (req, res, next) => {
    try {
        const { userId, certificationId, achievedDate } = req.body;
        if (!userId || !certificationId || !achievedDate) {
            return res.status(400).json({
                errCode: 1,
                message: 'Missing required fields'
            })
        }
        // check user is exist
        const resUser = await infoService.getUserById(userId);
        if (resUser.errCode !== 0) {
            return res.status(400).json({
                errCode: 1,
                message: 'User not found'
            })
        };
        // check certificate is exist
        const resCertificate = await infoService.getCertificateById(certificationId);
        if (resCertificate.errCode !== 0) {
            return res.status(400).json({
                errCode: 1,
                message: 'Certificate not found'
            })
        };
        const response = await infoService.createNewDetailCertificateUser(req.body, resUser.data, resCertificate.data);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

const getDetailCertificateUsers = async (req, res, next) => {
    try {
        const limit = +req.query.limit || 10;
        const response = await infoService.getDetailCertificateUsers(limit);
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}

const deleteDetailCertificateUser = async (req, res, next) => {
    try {
        const { certificationId, userId } = req.params;

        if (!certificationId || !userId) {
            return res.status(400).json({
                errCode: 1,
                message: 'Missing required fields'
            })
        }

        const response = await infoService.deleteDetailCertificateUser(certificationId, userId);
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}


module.exports = {
    createNewBasis, getBasis, getBasisById, updateBasis, deleteBasis, createNewDepartment,
    createNewRoom, getRoom, deleteRoom, getRoomById, getDepartments, getDepartmentById,
    deleteDepartment, createNewSpecialize, getSpecializes, getSpecializeById, deleteSpecialize,
    createNewUser, deleteUser, updateUser, getUsers, getUserById, createNewStudent, deleteStudent,
    getStudentByCodeId, updateStudent, createNewTeacher, getTeacherById, deleteTeacher, updateTeacher,
    createNewCertificate, getCertificates, getCertificateById, deleteCertificate,
    createNewDetailCertificateUser, getDetailCertificateUsers, deleteDetailCertificateUser

}