"use strict";

const mongoose = require("mongoose");
const Answer = use("App/Models/Answer");

class AnswerController {
  async index({ request }) {
    try {
      const data = request.only(["name"]);
      if (data.name) {
        const answers = Answer.where({
          name: { $regex: new RegExp(`.*${data.name}.*`) },
        })
          .sort("-name")
          .with("form")
          .with("user")
          .fetch();
        return answers;
      }
      const answers = Answer.with("form").with("user").fetch();
      return answers;
    } catch (err) {
      console.log(err);
    }
  }

  async store({ request }) {
    const data = request.only(["answers", "user_id", "active", "form_id"]);

    const answer = await Answer.create({
      ...data,
      form_id: mongoose.Types.ObjectId(data.form_id),
      user_id: mongoose.Types.ObjectId(data.user_id),
    });
    return answer;
  }

  async update({ params, request }) {
    const answer = await Answer.where({ _id: params.id }).firstOrFail();
    if (answer) {
      const data = request.only(["answers", "user_id", "active", "form_id"]);
      answer.merge({
        ...data,
        form_id: mongoose.Types.ObjectId(data.form_id),
        user_id: mongoose.Types.ObjectId(data.user_id),
      });
      await answer.save();
      return answer;
    }
  }

  async show({ params }) {
    const answer = await Answer.where({ _id: params.id })
      .with("form")
      .with("user")
      .firstOrFail();

    return answer;
  }

  async destroy({ params }) {
    const answer = await Answer.where({ _id: params.id }).firstOrFail();
    await answer.delete();
  }
}

module.exports = AnswerController;
