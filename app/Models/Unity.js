"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Unity extends Model {
  user() {
    return this.referMany("App/Models/User");
  }
}

module.exports = Unity;
