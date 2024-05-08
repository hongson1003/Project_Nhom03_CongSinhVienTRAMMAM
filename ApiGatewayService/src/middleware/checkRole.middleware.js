
const checkAdmin = (req, res, next) => {
    const user = req.cookies.user;
    next();
}


module.exports = {
    checkAdmin

}