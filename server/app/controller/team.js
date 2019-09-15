'use strict';

const Controller = require('egg').Controller;

class TeamController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, Team';
  }

  async creteTeam() {

  }

  async removeTeam() {

  }

  async modifyTeam() {

  }
}
module.exports = TeamController;
