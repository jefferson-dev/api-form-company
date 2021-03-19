"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ActivitySchema extends Schema {
  up() {
    this.create('activities', table => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.date('date')
      table.time('hour_start')
      table.time('hour_end')
      table.boolean('active').notNullable().defaultTo(false)
      table.timestamps()
    })
  }

  down() {
    this.drop("activities");
  }
}

module.exports = ActivitySchema;
