"use strict";

const mongoose = require("mongoose");
const Activity = use("App/Models/Activity");
const User = use("App/Models/User");

class ActivityController {
  async index() {
    try {
      const activities = Activity.with("user").fetch();
      return activities;
    } catch (err) {
      console.log(err);
    }
  }

  async store({ request, response }) {
    const data = request.only([
      "user_id",
      "date",
      "hour_start",
      "hour_end",
      "active",
    ]);
    const userData = await User.where({ _id: data.user_id }).first();
    if (!userData) {
      return response.status(400).send({
        error: {
          message: "Usuário não encontrado.",
        },
      });
    }
    const activity = await Activity.create({
      ...data,
      user_id: mongoose.Types.ObjectId(data.user_id),
    });
    return activity;
  }

  async update({ params, request }) {
    const activy = await Activity.where({ _id: params.id }).firstOrFail();
    if (activy) {
      const data = request.only([
        "user_id",
        "date",
        "hour_start",
        "hour_end",
        "active",
      ]);
      if (data.user_id) {
        const userData = await User.where({ _id: data.user_id }).first();
        if (userData) {
          return response.status(400).send({
            error: {
              message: "Usuário não encontrado.",
            },
          });
        }
        activy.merge({
          ...data,
          user_id: mongoose.Types.ObjectId(data.user_id),
        });
        return activy;
      }

      activy.merge({
        ...data,
      });
      await activy.save();
      return activy;
    }
  }

  async show({ params }) {
    const activy = await Activity.where({ _id: params.id })
      .with("user")
      .firstOrFail();

    return activy;
  }

  async destroy({ params }) {
    const activy = await Activity.where({ _id: params.id }).firstOrFail();
    await activy.delete();
  }
}

module.exports = ActivityController;
