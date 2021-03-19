"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AnswersSchema extends Schema {
  up() {
    this.create('answers', table => {
      table.increments()
      table.integer('form_id').unsigned().references('id').inTable('forms')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('answers', 40)
      table.boolean('active').notNullable().defaultTo(false)
      table.timestamps()
    })
  }

  down() {
    this.drop("answers");
  }
}

module.exports = AnswersSchema;
