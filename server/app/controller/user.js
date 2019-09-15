'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async register () {
  	 
  }

  async login () {
	   const { ctx } = this;
     const userId = ctx.params.id;
     const user = await ctx.service.user.find(userId);
     ctx.body = user;
  }

  async forget () {
  	
  }
}
module.exports = UserController;
