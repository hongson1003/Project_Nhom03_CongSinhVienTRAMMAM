import bcrypt from 'bcrypt';
const saltRounds = 10;

const hashPassword = (myPlaintextPassword) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(myPlaintextPassword, salt);
}

const comparePassword = (myPlaintextPassword, hashedPassword) => {
    return bcrypt.compareSync(myPlaintextPassword, hashedPassword); // true
}
const getUser = (user) => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}

function getIPAddress() {
    var interfaces = require('os').networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];

        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
                return alias.address;
        }
    }
    return '0.0.0.0';
}

module.exports = {
    hashPassword,
    comparePassword,
    getUser,
    getIPAddress
}