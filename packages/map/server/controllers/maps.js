'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Map = mongoose.model('Map'),
  _ = require('lodash');


/**
 * Find article by id
 */
exports.map = function(req, res, next, id) {
  Map.load(id, function(err, map) {
    if (err) return next(err);
    if (!map) return next(new Error('Failed to load map marker ' + id));
    req.map = map;
    next();
  });
};

/**
 * Create an article
 */
exports.create = function(req, res) {
  var map = new Map(req.body);
  console.log(map);
  map.user = req.user;

  map.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot save the mapmarker'
      });
    }
    res.json(map);

  });
};

/**
 * Update an article
 */
exports.update = function(req, res) {
  var map = req.map;

  map = _.extend(map, req.body);

  map.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot update the map'
      });
    }
    res.json(map);

  });
};

/**
 * Delete an article
 */
exports.destroy = function(req, res) {
  var map = req.map;

  map.remove(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot delete the mapmarker'
      });
    }
    res.json(map);

  });
};

/**
 * Show an article
 */
exports.show = function(req, res) {
  res.json(req.map);
};

/**
 * List of Articles
 */
exports.all = function(req, res) {
  Map.find().sort('-created').populate('user', 'name username').exec(function(err, maps) {
    if (err) {
      return res.json(500, {
        error: 'Cannot list the articles'
      });
    }
    res.json(maps);

  });
};
