'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  // 用户管理
  router.get('/register', controller.user.register);
  router.get('/login/:id', controller.user.login);
  router.get('/forget', controller.user.forget);

  // 请求资源管理
  router.get('/menu', controller.request.menu);
  router.get('/createRequest', controller.request.createRequest);
  router.get('/modifyRequest', controller.request.modifyRequest);
  router.get('/createFolder', controller.request.createFolder);
  router.get('/removeRequest', controller.request.removeRequest);
  router.get('/moveRequest', controller.request.moveRequest);
  router.get('/removeFolder', controller.request.removeFolder);
  router.get('/renameFolder', controller.request.renameFolder);

  // 个人工作空间
  router.get('/workSpace', controller.workSpace.index);
  router.get('/createWorkSpace', controller.workSpace.createWorkSpace);
  router.get('/modifyWorkSpace', controller.workSpace.modifyWorkSpace);
  router.get('/removeWorkSpace', controller.workSpace.removeWorkSpace);

  // 团队管理
  router.get('/team', controller.team.index);
  router.get('/creteTeam', controller.team.creteTeam);
  router.get('/removeTeam', controller.team.removeTeam);
  router.get('/modifyTeam', controller.team.modifyTeam);

  // 配置管理
  router.get('/env', controller.env.index);
  router.get('/addEnv', controller.env.addEnv);
  router.get('/removeEnv', controller.env.removeEnv);
  router.get('/modifyEnv', controller.env.modifyEnv);
};
