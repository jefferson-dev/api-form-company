"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use("Hash");

class User extends Model {
  static boot() {
    super.boot();

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
     this.addHook("beforeSave", async (userInstance) => {
      if (!userInstance.dirty.active) {
        userInstance.active = false;
      }
    });

    this.addHook("beforeSave", async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password);
      }
    });
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens() {
    return this.morphMany("App/Models/Token");
  }

  static get objectIDs() {
    return ["_id", "unity_id"];
  }
  unity() {
    return this.belongsTo("App/Models/Unity");
  }

  answer() {
    return this.hasMany("App/Models/Answer");
  }

  activity() {
    return this.hasMany("App/Models/Activity");
  }
}

module.exports = User;
