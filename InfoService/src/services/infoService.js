import db from '../config/models/index.model';

//room

const createNewRoom = async (data, basis) => {
    try {
        const room = await db.Room.create(data);
        await room.save();
        if (!room) {
            return {
                errCode: 1,
                message: 'Failed to create room'
            }
        }
        const roomBasis = room.dataValues;
        roomBasis.basis = basis;
        return {
            errCode: 0,
            message: 'Room created successfully',
            data: roomBasis
        }
    } catch (error) {
        throw error
    }

}

const getRoom = async (limit) => {
    try {
        const room = await db.Room.findAll({
            attributes: ['roomId', 'name', 'description'],
            limit: limit,
            nest: true,
            raw: true,
            include: [{
                model: db.Basis,
                as: 'basis',
                attributes: ['basisId', 'address', 'name']
            }]
        });
        if (!room) {
            return {
                errCode: 1,
                message: 'Failed to fetch room'
            }
        }
        return {
            errCode: 0,
            message: 'Room fetched successfully',
            data: room
        }
    } catch (error) {
        throw error
    }

}

const deleteRoom = async (roomId) => {
    try {
        const room = await db.Room.findOne({
            where: {
                roomId: roomId
            },
            attributes: ['roomId', 'name', 'description'],
            raw: false,
        });
        if (!room) {
            return {
                errCode: 1,
                message: 'Room not found'
            }
        }
        await room.destroy();
        return {
            errCode: 0,
            message: 'Room deleted successfully',
            data: room
        }
    } catch (error) {
        throw error
    }
}

const getRoomById = async (roomId) => {
    try {
        const room = await db.Room.findOne({
            where: {
                roomId: roomId
            },
            attributes: ['roomId', 'name', 'description'],
            raw: false,
            include: [{
                model: db.Basis,
                as: 'basis',
                attributes: ['basisId', 'address', 'name']
            }]
        });
        if (!room) {
            return {
                errCode: 1,
                message: 'Failed to fetch room'
            }
        }
        return {
            errCode: 0,
            message: 'Room fetched successfully',
            data: room
        }
    } catch (error) {
        throw error
    }
}

// basis

const createNewBasis = async (data) => {
    try {
        data.dateFouded = new Date(data.dateFouded);
        const basis = await db.Basis.create(data);
        await basis.save();

        if (!basis) {
            return {
                errCode: 1,
                message: 'Failed to create basis'
            }
        }
        return {
            errCode: 0,
            message: 'Basis created successfully',
            data: basis
        }
    } catch (error) {
        throw error
    }
}

const getBasis = async (limit) => {
    try {
        const basis = await db.Basis.findAll({
            attributes: ['basisId', 'address', 'name', 'dateFouded'],
            limit: limit
        });
        if (!basis) {
            return {
                errCode: 1,
                message: 'Failed to fetch basis'
            }
        }
        return {
            errCode: 0,
            message: 'Basis fetched successfully',
            data: basis
        }
    } catch (error) {
        throw error
    }
}

const getBasisById = async (basisId) => {
    try {
        const basis = await db.Basis.findOne({
            where: {
                basisId: basisId
            },
            attributes: ['basisId', 'address', 'name', 'dateFouded']
        });
        if (!basis) {
            return {
                errCode: 1,
                message: 'Failed to fetch basis'
            }
        }
        return {
            errCode: 0,
            message: 'Basis fetched successfully',
            data: basis
        }
    } catch (error) {
        throw error
    }
}

const updateBasis = async (data) => {
    try {
        const basis = await db.Basis.findOne({
            where: {
                basisId: data.basisId
            },
            attributes: ['basisId', 'address', 'name', 'dateFouded'],
            raw: false,
        });
        if (!basis) {
            return {
                errCode: 1,
                message: 'Basis not found'
            }
        }
        basis.address = data.address;
        basis.name = data.name;
        basis.dateFouded = data.dateFouded;
        await basis.save();
        return {
            errCode: 0,
            message: 'Basis updated successfully',
            data: basis
        }
    } catch (error) {
        throw error
    }
}

const deleteBasis = async (basisId) => {
    try {
        const basis = await db.Basis.findOne({
            where: {
                basisId: basisId
            },
            attributes: ['basisId', 'address', 'name', 'dateFouded'],
            raw: false,
        });
        if (!basis) {
            return {
                errCode: 1,
                message: 'Basis not found'
            }
        }
        await basis.destroy();
        return {
            errCode: 0,
            message: 'Basis deleted successfully',
            data: basis
        }
    } catch (error) {
        throw error
    }
}

// department

const createNewDepartment = async (data, room) => {
    try {
        const department = await db.Department.create(data);
        await department.save();

        if (!department) {
            return {
                errCode: 1,
                message: 'Failed to create department'
            }
        }
        const departmentRoom = department.dataValues;
        departmentRoom.room = room;
        return {
            errCode: 0,
            message: 'Department created successfully',
            data: departmentRoom
        }
    } catch (error) {
        throw error
    }
}

const getDepartments = async (limit) => {
    try {
        const department = await db.Department.findAll({
            attributes: ['departmentId', 'name', 'description', 'phoneNumber'],
            limit: limit,
            nest: true,
            raw: true,
            include: [{
                model: db.Room,
                as: 'room',
                attributes: ['roomId', 'name', 'description'],
                include: [{
                    model: db.Basis,
                    as: 'basis',
                    attributes: ['basisId', 'address', 'name']
                }]
            }]
        });
        if (!department) {
            return {
                errCode: 1,
                message: 'Failed to fetch department'
            }
        }
        return {
            errCode: 0,
            message: 'Department fetched successfully',
            data: department
        }
    } catch (error) {
        throw error
    }
}

const getDepartmentById = async (departmentId) => {
    try {
        const department = await db.Department.findOne({
            where: {
                departmentId: departmentId
            },
            attributes: ['departmentId', 'name', 'description', 'phoneNumber'],
            raw: false,
            include: [{
                model: db.Room,
                as: 'room',
                attributes: ['roomId', 'name', 'description'],
                include: [{
                    model: db.Basis,
                    as: 'basis',
                    attributes: ['basisId', 'address', 'name']
                }]
            }]
        });
        if (!department) {
            return {
                errCode: 1,
                message: 'Failed to fetch department'
            }
        }
        return {
            errCode: 0,
            message: 'Department fetched successfully',
            data: department
        }
    } catch (error) {
        throw error
    }
}

const deleteDepartment = async (departmentId) => {
    try {
        const department = await db.Department.findOne({
            where: {
                departmentId: departmentId
            },
            attributes: ['departmentId', 'name', 'description', 'phoneNumber'],
            raw: false,
        });
        if (!department) {
            return {
                errCode: 1,
                message: 'Department not found'
            }
        }
        await department.destroy();
        return {
            errCode: 0,
            message: 'Department deleted successfully',
            data: department
        }
    } catch (error) {
        throw error
    }
}

// specialize
const createNewSpecialize = async (data, department) => {
    try {
        const specialize = await db.Specialize.create(data);
        await specialize.save();

        if (!specialize) {
            return {
                errCode: 1,
                message: 'Failed to create specialize'
            }
        }
        const specializeDepartment = specialize.dataValues;
        specializeDepartment.department = department;

        return {
            errCode: 0,
            message: 'Specialize created successfully',
            data: specializeDepartment
        }
    } catch (error) {
        throw error
    }

}

const getSpecializes = async (limit) => {
    try {
        const specialize = await db.Specialize.findAll({
            attributes: ['specializeId', 'name', 'description'],
            limit: limit,
            nest: true,
            raw: true,
            include: [{
                model: db.Department,
                as: 'department',
                attributes: ['departmentId', 'name', 'description', 'phoneNumber'],
                include: [{
                    model: db.Room,
                    as: 'room',
                    attributes: ['roomId', 'name', 'description'],
                    include: [{
                        model: db.Basis,
                        as: 'basis',
                        attributes: ['basisId', 'address', 'name']
                    }]
                }]
            }]
        });
        if (!specialize) {
            return {
                errCode: 1,
                message: 'Failed to fetch specialize'
            }
        }
        return {
            errCode: 0,
            message: 'Specialize fetched successfully',
            data: specialize
        }
    } catch (error) {
        throw error
    }
}

const getSpecializeById = async (specializeId) => {
    try {
        const specialize = await db.Specialize.findOne({
            where: {
                specializeId: specializeId
            },
            attributes: ['specializeId', 'name', 'description'],
            raw: false,
            include: [{
                model: db.Department,
                as: 'department',
                attributes: ['departmentId', 'name', 'description', 'phoneNumber'],
                include: [{
                    model: db.Room,
                    as: 'room',
                    attributes: ['roomId', 'name', 'description'],
                    include: [{
                        model: db.Basis,
                        as: 'basis',
                        attributes: ['basisId', 'address', 'name']
                    }]
                }]
            }]
        });
        if (!specialize) {
            return {
                errCode: 1,
                message: 'Failed to fetch specialize'
            }
        }
        return {
            errCode: 0,
            message: 'Specialize fetched successfully',
            data: specialize
        }
    } catch (error) {
        throw error
    }

}

const deleteSpecialize = async (specializeId) => {
    try {
        const specialize = await db.Specialize.findOne({
            where: {
                specializeId: specializeId
            },
            attributes: ['specializeId', 'name', 'description'],
            raw: false,
        });
        if (!specialize) {
            return {
                errCode: 1,
                message: 'Specialize not found'
            }
        }
        await specialize.destroy();
        return {
            errCode: 0,
            message: 'Specialize deleted successfully',
            data: specialize
        }
    } catch (error) {
        throw error
    }
}

// user

const createNewUser = async (data, basis, specialize) => {
    try {
        const user = await db.User.create(data);
        await user.save();

        if (!user) {
            return {
                errCode: 1,
                message: 'Failed to create user'
            }
        }
        const userBasis = user.dataValues;
        userBasis.basis = basis;
        userBasis.specialize = specialize;
        return {
            errCode: 0,
            message: 'User created successfully',
            data: userBasis
        }
    } catch (error) {
        throw error
    }
}

const deleteUser = async (codeId) => {
    try {
        const user = await db.User.findOne({
            where: {
                codeId: codeId
            },
            raw: false,
        });
        if (!user) {
            return {
                errCode: 1,
                message: 'User not found'
            }
        }
        await user.destroy();
        return {
            errCode: 0,
            message: 'User deleted successfully',
            data: user
        }
    } catch (error) {
        throw error
    }
}

const updateUser = async (data) => {
    try {
        const user = await db.User.findOne({
            where: {
                codeId: data.codeId
            },
            raw: false,
        });
        if (!user) {
            return {
                errCode: 1,
                message: 'User not found'
            }
        }
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.phoneNumber = data.phoneNumber;
        user.email = data.email;
        user.gender = data.gender;
        user.birthdate = data.birthdate;
        user.address = data.address;
        user.avatar = data.avatar;
        user.placeOfBirth = data.placeOfBirth;
        user.nation = data.nation;
        user.schoolEntryDate = data.schoolEntryDate;
        user.profileCode = data.profileCode;
        user.basisId = data.basisId;
        user.specializeId = data.specializeId;
        await user.save();
        return {
            errCode: 0,
            message: 'User updated successfully',
            data: user
        }
    } catch (error) {
        throw error
    }
}

const getUsers = async (limit) => {
    try {
        const users = await db.User.findAll({
            limit: limit,
            nest: true,
            raw: true,
            include: [{
                model: db.Basis,
                as: 'basis',
                attributes: ['basisId', 'address', 'name']
            }, {
                model: db.Specialize,
                as: 'specialize',
                attributes: ['specializeId', 'name'],
                include: [{
                    model: db.Department,
                    as: 'department',
                    attributes: ['departmentId', 'name', 'description', 'phoneNumber'],
                    include: [{
                        model: db.Room,
                        as: 'room',
                        attributes: ['roomId', 'name', 'description'],
                        include: [{
                            model: db.Basis,
                            as: 'basis',
                            attributes: ['basisId', 'address', 'name']
                        }]
                    }]
                }]
            }]
        });
        if (!users) {
            return {
                errCode: 1,
                message: 'Failed to fetch user'
            }
        }
        return {
            errCode: 0,
            message: 'User fetched successfully',
            data: users
        }
    } catch (error) {
        throw error;
    }
}

const getUserById = async (codeId) => {
    try {
        const user = await db.User.findOne({
            where: {
                codeId: codeId
            },
            raw: false,
            include: [{
                model: db.Basis,
                as: 'basis',
                attributes: ['basisId', 'address', 'name']
            }, {
                model: db.Specialize,
                as: 'specialize',
                attributes: ['specializeId', 'name'],
                include: [{
                    model: db.Department,
                    as: 'department',
                    attributes: ['departmentId', 'name', 'description', 'phoneNumber'],
                    include: [{
                        model: db.Room,
                        as: 'room',
                        attributes: ['roomId', 'name', 'description'],
                        include: [{
                            model: db.Basis,
                            as: 'basis',
                            attributes: ['basisId', 'address', 'name']
                        }]
                    }]
                }]
            },
            {
                model: db.Student,
                as: 'student',
            },
            {
                model: db.Teacher,
                as: 'teacher',
            }]
        });
        if (!user) {
            return {
                errCode: 1,
                message: 'Failed to fetch user'
            }
        }
        return {
            errCode: 0,
            message: 'User fetched successfully',
            data: user
        }
    } catch (error) {
        throw error;
    }
}

// student

const createNewStudent = async (data) => {
    try {
        const studentData = { ...data };
        const userInfo = await db.User.findOne({
            where: {
                codeId: data.codeId
            },
            raw: false,
            nest: true,
            include: [
                {
                    model: db.Specialize,
                    as: 'specialize',
                    attributes: ['specializeId', 'name', 'description', 'numberOfYearsTraining', 'totalCredits'],
                }
            ]
        });
        if (!userInfo) {
            return {
                errCode: 1,
                message: 'User not found'
            }
        }

        const now = new Date();
        const numberOfYearsTraining = userInfo.specialize.numberOfYearsTraining;
        studentData.totalCredits = userInfo.specialize.totalCredits;
        const yearGraduteDeadline = new Date(now.getFullYear() + numberOfYearsTraining, now.getMonth(), now.getDate());
        studentData.yearGraduteDeadline = yearGraduteDeadline;

        const student = await db.Student.create(studentData);
        await student.save();
        if (!student) {
            return {
                errCode: 1,
                message: 'Failed to create student'
            }
        }
        return {
            errCode: 0,
            message: 'Student created successfully',
            data: student
        }
    } catch (error) {
        throw error
    }
}

const deleteStudent = async (codeId) => {
    try {
        const student = await db.Student.findOne({
            where: {
                codeId: codeId
            },
            raw: false,
        });
        if (!student) {
            return {
                errCode: 1,
                message: 'Student not found'
            }
        }
        await student.destroy();
        return {
            errCode: 0,
            message: 'Student deleted successfully',
            data: student
        }
    } catch (error) {
        throw error
    }
}

const getStudentByCodeId = async (codeId) => {
    try {
        const student = await db.User.findOne({
            where: {
                codeId: codeId
            },
            raw: false,
            include: [
                {
                    model: db.Student,
                    as: 'student',
                },
                {
                    model: db.Basis,
                    as: 'basis',
                    attributes: ['basisId', 'address', 'name']
                },
                {
                    model: db.Specialize,
                    as: 'specialize',
                    attributes: ['specializeId', 'name'],
                    include: [{
                        model: db.Department,
                        as: 'department',
                        attributes: ['departmentId', 'name', 'description', 'phoneNumber'],
                        include: [{
                            model: db.Room,
                            as: 'room',
                            attributes: ['roomId', 'name', 'description'],
                            include: [{
                                model: db.Basis,
                                as: 'basis',
                                attributes: ['basisId', 'address', 'name']
                            }]
                        }]
                    }]
                }
            ]
        });
        return {
            errCode: 0,
            message: 'Student fetched successfully',
            data: student
        }
    } catch (error) {
        throw error;
    }
}

const updateStudent = async (data) => {
    try {
        const student = await db.Student.findOne({
            where: {
                codeId: data.codeId
            },
            raw: false,
        });
        if (!student) {
            return {
                errCode: 1,
                message: 'Student not found'
            }
        }
        student.educationLevel = data.educationLevel;
        student.numberOfCreditsIsCompleted = data.numberOfCreditsIsCompleted;
        // student.totalCredits = data.totalCredits;
        student.cumulativeGPA = data.cumulativeGPA;
        student.yearGraduated = data.yearGraduated;
        await student.save();
        return {
            errCode: 0,
            message: 'Student updated successfully',
            data: student
        }
    } catch (error) {
        throw error
    }
}

// teacher

const createNewTeacher = async (data) => {
    try {
        const teacher = await db.Teacher.create(data);
        await teacher.save();
        if (!teacher) {
            return {
                errCode: 1,
                message: 'Failed to create teacher'
            }
        }
        return {
            errCode: 0,
            message: 'Teacher created successfully',
            data: teacher
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}

const getTeacherById = async (codeId) => {
    try {
        const teacher = await db.User.findOne({
            where: {
                codeId: codeId
            },
            raw: false,
            include: [
                {
                    model: db.Teacher,
                    as: 'teacher',
                    attributes: ['educationLevel', 'yearContactExpired']
                },
                {
                    model: db.Basis,
                    as: 'basis',
                    attributes: ['basisId', 'address', 'name']
                },
                {
                    model: db.Specialize,
                    as: 'specialize',
                    attributes: ['specializeId', 'name'],
                    include: [{
                        model: db.Department,
                        as: 'department',
                        attributes: ['departmentId', 'name', 'description', 'phoneNumber'],
                        include: [{
                            model: db.Room,
                            as: 'room',
                            attributes: ['roomId', 'name', 'description'],
                            include: [{
                                model: db.Basis,
                                as: 'basis',
                                attributes: ['basisId', 'address', 'name']
                            }]
                        }]
                    }]
                }
            ]
        });
        if (!teacher) {
            return {
                errCode: 1,
                message: 'Teacher not found'
            }
        }
        return {
            errCode: 0,
            message: 'Teacher fetched successfully',
            data: teacher
        }
    } catch (error) {
        throw error;
    }
}

const deleteTeacher = async (codeId) => {
    try {
        const teacher = await db.Teacher.findOne({
            where: {
                codeId: codeId
            },
            raw: false,
        });
        if (!teacher) {
            return {
                errCode: 1,
                message: 'Teacher not found'
            }
        }
        await teacher.destroy();
        return {
            errCode: 0,
            message: 'Teacher deleted successfully',
            data: teacher
        }
    } catch (error) {
        throw error
    }
}

const updateTeacher = async (data) => {
    try {
        const teacher = await db.Teacher.findOne({
            where: {
                codeId: data.codeId
            },
            raw: false,
        });
        if (!teacher) {
            return {
                errCode: 1,
                message: 'Teacher not found'
            }
        }
        teacher.educationLevel = data.educationLevel;
        teacher.yearContactExpired = data.yearContactExpired;
        await teacher.save();
        return {
            errCode: 0,
            message: 'Teacher updated successfully',
            data: teacher
        }
    } catch (error) {
        throw error
    }
}

// certificate

const createNewCertificate = async (data) => {
    try {
        const certificate = await db.Certification.create(data);
        await certificate.save();
        if (!certificate) {
            return {
                errCode: 1,
                message: 'Failed to create certificate'
            }
        }
        return {
            errCode: 0,
            message: 'Certificate created successfully',
            data: certificate
        }
    } catch (error) {
        throw error
    }

}

const getCertificates = async (limit) => {
    try {
        const certificates = await db.Certification.findAll({
            limit: limit,
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });
        if (!certificates) {
            return {
                errCode: 1,
                message: 'Failed to fetch certificate'
            }
        }
        return {
            errCode: 0,
            message: 'Certificate fetched successfully',
            data: certificates
        }
    } catch (error) {
        throw error
    }
}

const getCertificateById = async (certificateId) => {
    try {
        const certificate = await db.Certification.findOne({
            where: {
                certificationId: certificateId
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });
        if (!certificate) {
            return {
                errCode: 1,
                message: 'Failed to fetch certificate'
            }
        }
        return {
            errCode: 0,
            message: 'Certificate fetched successfully',
            data: certificate
        }
    } catch (error) {
        throw error
    }
}

const deleteCertificate = async (certificateId) => {
    try {
        const certificate = await db.Certification.findOne({
            where: {
                certificationId: certificateId
            },
            raw: false,
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });
        if (!certificate) {
            return {
                errCode: 1,
                message: 'Certificate not found'
            }
        }
        await certificate.destroy();
        return {
            errCode: 0,
            message: 'Certificate deleted successfully',
            data: certificate
        }
    } catch (error) {
        throw error
    }
}

// detail certificate user

const createNewDetailCertificateUser = async (data, user, certification) => {
    try {
        const detailCertificateUser = await db.Detail_Certification_User.create(data);
        await detailCertificateUser.save();
        if (!detailCertificateUser) {
            return {
                errCode: 1,
                message: 'Failed to create detail certificate user'
            }
        }
        const detailCertificateUserData = detailCertificateUser.dataValues;
        detailCertificateUserData.user = user;
        detailCertificateUserData.certification = certification;
        return {
            errCode: 0,
            message: 'Detail certificate user created successfully',
            data: detailCertificateUserData
        }
    } catch (error) {
        throw error
    }
}

const getDetailCertificateUsers = async (limit) => {
    try {
        const detailCertificateUsers = await db.Detail_Certification_User.findAll({
            limit: limit,
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            raw: false,
            include: [
                {
                    model: db.User,
                    as: 'user',
                    attributes: ['codeId', 'firstName', 'lastName', 'email', 'phoneNumber']
                },
                {
                    model: db.Certification,
                    as: 'certification',
                    attributes: ['certificationId', 'name', 'description']
                }
            ]
        });
        if (!detailCertificateUsers) {
            return {
                errCode: 1,
                message: 'Failed to fetch detail certificate user'
            }
        }
        return {
            errCode: 0,
            message: 'Detail certificate user fetched successfully',
            data: detailCertificateUsers
        }
    } catch (error) {
        throw error
    }
}

const deleteDetailCertificateUser = async (certificationId, userId) => {
    try {
        const detailCertificateUser = await db.Detail_Certification_User.findOne({
            where: {
                certificationId: certificationId,
                userId: userId
            },
            raw: false,
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });
        if (!detailCertificateUser) {
            return {
                errCode: 1,
                message: 'Detail certificate user not found'
            }
        }
        await detailCertificateUser.destroy();
        return {
            errCode: 0,
            message: 'Detail certificate user deleted successfully',
            data: detailCertificateUser
        }
    } catch (error) {
        throw error
    }
}



module.exports = {
    createNewBasis, getBasis, getBasisById, updateBasis,
    deleteBasis, createNewDepartment, createNewRoom,
    getRoom, deleteRoom, getRoomById, getDepartments,
    getDepartmentById, deleteDepartment, createNewSpecialize,
    getSpecializes, getSpecializeById, deleteSpecialize,
    createNewUser, deleteUser, updateUser, getUsers, getUserById,
    createNewStudent, deleteStudent, getStudentByCodeId, updateStudent,
    createNewTeacher, getTeacherById, deleteTeacher, updateTeacher,
    createNewCertificate, getCertificates, getCertificateById,
    deleteCertificate, createNewDetailCertificateUser, getDetailCertificateUsers,
    deleteDetailCertificateUser
}