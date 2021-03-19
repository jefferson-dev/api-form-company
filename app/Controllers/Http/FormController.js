"use strict";

const mongoose = require("mongoose");
const Form = use("App/Models/Form");
const Category = use("App/Models/Category");

class FormController {
  async index({ request }) {
    try {
      const data = request.only(["name"]);
      if (data.name) {
        const forms = Form.where({
          name: { $regex: new RegExp(`.*${data.name}.*`) },
        })
          .sort("-name")
          .with("answers")
          .with("category")
          .fetch();
        return forms;
      }
      const forms = Form.with("answers").with("category").fetch();
      return forms;
    } catch (err) {
      console.log(err);
    }
  }

  async store({ request, response }) {
    const data = request.only(["name", "questions", "active", "category_id"]);
    const formData = await Form.where({ name: data.name }).first();
    if (formData) {
      return response.status(400).send({
        error: {
          message: "Já existe um formulário com este nome.",
        },
      });
    }
    const form = await Form.create({
      ...data,
      category_id: mongoose.Types.ObjectId(data.category_id),
    });
    return form;
  }

  async update({ params, request }) {
    const form = await Form.where({ _id: params.id }).firstOrFail();
    if (form) {
      const data = request.only(["name", "questions", "active", "category_id"]);
      if (data.category_id) {
        const category = await Category.where({
          _id: data.category_id,
        }).first();
        if (!category) {
          return response.status(400).send({
            error: {
              message: "Categoria selecionada não existe.",
            },
          });
        }
        form.merge({
          ...data,
          category_id: mongoose.Types.ObjectId(data.category_id),
        });
        await form.save();
        return form;
      }
      form.merge({
        ...data,
      });
      await form.save();
      return form;
    }
  }

  async show({ params }) {
    const form = await Form.where({ _id: params.id })
      .with("category")
      .with("answers")
      .firstOrFail();

    return form;
  }

  async destroy({ params }) {
    const form = await Form.where({ _id: params.id }).firstOrFail();
    await form.delete();
  }
}

module.exports = FormController;
