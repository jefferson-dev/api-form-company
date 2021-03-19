"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class FormSchema extends Schema {
  up() {
    this.create('forms', table => {
      table.increments()
      table.integer('category_id').unsigned().references('id').inTable('categories')
      table.string('name', 40).notNullable().unique()
      table.string('questions', 40).notNullable()
      table.boolean('active').notNullable().defaultTo(false)
      table.timestamps()
    })
  }

  down() {
    this.drop("forms");
  }
}

module.exports = FormSchema;
