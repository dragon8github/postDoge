'use strict';

const Controller = require('egg').Controller

class WorkSpaceController extends Controller {
  async index() {
    const { ctx } = this
    ctx.body = 'hi, WorkSpace'
  }

  async createWorkSpace() {

  }

  async modifyWorkSpace() {

  }

  async removeWorkSpace() {
  	
  }
}
module.exports = WorkSpaceController