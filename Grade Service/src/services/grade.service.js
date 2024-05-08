const db = require('../config/models/index.model');
const axios = require('../config/axios').default;
const URL_ENROLLMENT = process.env.URL_ENROLLMENT;

const createOrUpdateGrade = async (data, userInfo) => {
    try {
        if (!data || !userInfo) {
            return {
                errCode: 400,
                message: 'Missing required parameters'
            }
        }
        const { joinClazzId } = data;


        // find or and create grade
        const gradeTheory = await db.Theory_Grade.findOne({
            where: {
                joinClazzId: joinClazzId
            },
            raw: false
        })

        if (!gradeTheory) {
            // create new grade
            await db.Theory_Grade.create({
                joinClazzId: joinClazzId,
                score1: data.theoScore1,
                score2: data.theoScore2,
                score3: data.theoScore3,
                middleScore: data.middleScore,
                finalScore: data.finalScore,
                createdAt: new Date(),
                updatedAt: new Date()
            })
        } else {
            // update grade
            gradeTheory.score1 = data.theoScore1;
            gradeTheory.score2 = data.theoScore2;
            gradeTheory.score3 = data.theoScore3;
            gradeTheory.middleScore = data.middleScore;
            gradeTheory.finalScore = data.finalScore;
            gradeTheory.updatedAt = new Date();
            await gradeTheory.save();
        };

        const gradePractice = await db.Practice_Grade.findOne({
            where: {
                joinClazzId: joinClazzId
            },
            raw: false
        })
        if (!gradePractice) {
            // create new grade
            await db.Practice_Grade.create({
                joinClazzId: joinClazzId,
                score1: data.pracScore1,
                score2: data.pracScore2,
                score3: data.pracScore3,
                createdAt: new Date(),
                updatedAt: new Date()
            })
        } else {
            // update grade
            gradePractice.score1 = data.pracScore1;
            gradePractice.score2 = data.pracScore2;
            gradePractice.score3 = data.pracScore3;
            gradePractice.updatedAt = new Date();
            await gradePractice.save();
        }



        return {
            errCode: 0,
            message: 'Create or update grade successfully'
        }
    } catch (error) {
        return {
            errCode: -1,
            message: 'Error from the server'
        }
    }
}

const getGradeBySemester = async (semester, userInfo) => {
    try {
        if (!semester || !userInfo) {
            return {
                errCode: 400,
                message: 'Missing required parameters'
            }
        }
        const enrolledRes = await axios.get(URL_ENROLLMENT + `/api/v1/enrollment?semester=${semester}`);
        if (enrolledRes.errCode !== 0) {
            return {
                errCode: 1,
                message: 'Error when get enrolled data'
            }
        };
        const enrolleds = enrolledRes.data;
        const joinClazzIds = enrolleds.map(item => item.joinClazzId);

        const theoryGrades = await db.Theory_Grade.findAll({
            where: {
                joinClazzId: joinClazzIds
            },
        });

        const practiceGrades = await db.Practice_Grade.findAll({
            where: {
                joinClazzId: joinClazzIds
            },
        });

        // merge grade to enrolled
        const finalData = enrolleds.map(item => {
            const theoryGrade = theoryGrades.find(grade => grade.joinClazzId === item.joinClazzId);
            const practiceGrade = practiceGrades.find(grade => grade.joinClazzId === item.joinClazzId);

            return {
                ...item,
                theoryGrade: theoryGrade,
                practiceGrade: practiceGrade
            }
        });

        return {
            errCode: 0,
            message: 'Get grade by semester successfully',
            data: finalData
        }
    } catch (error) {
        return {
            errCode: -1,
            message: 'Error from the server'
        }
    }
}


module.exports = {
    createOrUpdateGrade, getGradeBySemester

}