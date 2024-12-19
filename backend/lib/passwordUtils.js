const bcrypt = require('bcryptjs');

class passwordUtils {
    static async genPassword (password) {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds)
    }

    static async validatePassword (password, storedPW) {
        return await bcrypt.compare(password, storedPW)
    }
}

module.exports = {
    passwordUtils
}

