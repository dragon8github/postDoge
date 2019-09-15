const Service = require('egg').Service;

class UserService extends Service {
    async find(id) {
        let user = await this.app.mysql.get('user', { id })
        return { user };
    }
}

module.exports = UserService;