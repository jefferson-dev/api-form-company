"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UnitySchema extends Schema {
  up() {
    this.create('unities', table => {
      table.increments()
      table.string('name', 40).notNullable().unique()
      table.boolean('active').notNullable().defaultTo(false)
      table.timestamps()
    })
  }

  down() {
    this.drop("unities");
  }
}

module.exports = UnitySchema;
