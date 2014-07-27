'use strict';

var maps = require('../controllers/maps');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.map.user.id !== req.user.id) {
    return res.send(401, 'User is not authorized');
  }
  next();
};

module.exports = function(Articles, app, auth) {

  app.route('/map')
    .get(maps.all)
    .post(auth.requiresLogin, maps.create);
  app.route('/map/:mapId')
    .get(maps.show)
    .put(auth.requiresLogin, hasAuthorization, maps.update)
    .delete(auth.requiresLogin, hasAuthorization, maps.destroy);

  // Finish with setting up the articleId param
  app.param('mapId', maps.map);
};
