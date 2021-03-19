"use strict";
const mongoose = require("mongoose");
const User = use("App/Models/User");
const Unity = use("App/Models/Unity");

class UserController {
  async index({ request }) {
    try {
      const data = request.only(["name"]);
      if (data.name) {
        const users = User.where({
          name: { $regex: new RegExp(`.*${data.name}.*`) },
        })
          .sort("-name")
          .with("unity")
          .with("answer")
          .with("activity")
          .fetch();
        return users;
      }
      const users = User.with("answer").with("activity").with("unity").fetch();
      return users;
    } catch (err) {
      console.log(err);
    }
  }

  async store({ request, response }) {
    const data = request.only([
      "name",
      "email",
      "password",
      "active",
      "unity_id",
    ]);
    const userData = await User.where({ email: data.email }).first();
    if (userData) {
      return response.status(400).send({
        error: {
          message: "O email já está cadastrado em outra conta.",
        },
      });
    }
    const unity = await Unity.where({ _id: data.unity_id }).first();
    if (!unity) {
      return response.status(400).send({
        error: {
          message: "Unidade selecionada não existe.",
        },
      });
    }
    const user = await User.create({
      ...data,
      unity_id: mongoose.Types.ObjectId(data.unity_id),
    });
    return user;
  }

  async update({ params, request }) {
    const user = await User.where({ _id: params.id }).firstOrFail();
    if (user) {
      const data = request.only([
        "name",
        "email",
        "password",
        "active",
        "unity_id",
      ]);
      if (data.unity_id) {
        const unity = await Unity.where({ _id: data.unity_id }).first();
        if (!unity) {
          return response.status(400).send({
            error: {
              message: "Unidade selecionada não existe.",
            },
          });
        }
        user.merge({
          ...data,
          unity_id: mongoose.Types.ObjectId(data.unity_id),
        });
        await user.save();
        return user;
      }
      user.merge({
        ...data,
      });
      await user.save();
      return user;
    }
  }

  async show({ params }) {
    const user = await User.where({ _id: params.id })
      .with("unity")
      .with("answer")
      .with("activity")
      .firstOrFail();

    return user;
  }

  async destroy({ params }) {
    const user = await User.where({ _id: params.id }).firstOrFail();
    await user.delete();
  }
}

module.exports = UserController;
