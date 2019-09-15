'use strict';

const Controller = require('egg').Controller;

class EnvController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, Env';
  }

  async addEnv () {

  }

  async removeEnv() {

  }

  async modifyEnv () {
  	
  }
}
module.exports = EnvController;
