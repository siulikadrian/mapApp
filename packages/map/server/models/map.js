'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Article Schema
 */
var MapSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  info: {
    type: String,
    required: true,
    trim: true
  },
  desc: {
    type: String,
    required: true,
    trim: true
  },
  lat: {
    type: Number,
    required: true
  },
  lan: {
    type: Number,
    required: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

/**
 * Validations
 */
MapSchema.path('info').validate(function(info) {
  return !!info;
}, 'Title cannot be blank');

MapSchema.path('desc').validate(function(desc) {
  return !!desc;
}, 'Content cannot be blank');

MapSchema.path('lat').validate(function(lat) {
  return !!lat;
}, 'Musisz podac szerokosc geograficzna');

MapSchema.path('lan').validate(function(lan) {
  return !!lan;
}, 'Musisz podac dlugosc geograficzna');

/**
 * Statics
 */
MapSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};

mongoose.model('Map', MapSchema);
