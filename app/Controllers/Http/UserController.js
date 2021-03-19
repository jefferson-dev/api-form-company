"use strict";
const User = use("App/Models/User");

class UserController {
  async index({ request }) {
    try {
      const data = request.only(["name"]);
      if (data.name) {
        const users = User.where({
          name: { $regex: new RegExp(`.*${data.name}.*`) },
        })
          .sort("-name")
          .fetch();
        return users;
      }
      const users = User.all();
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
    const user = await User.create({ ...data, status: true });
    return user;
  }

  async update({ params, request }) {
    const user = await User.where({ _id: params.id }).first();
    if (user) {
      const data = request.only([
        "name",
        "email",
        "password",
        "active",
        "unity_id",
      ]);
      user.merge(data);
      await user.save();
      return user;
    }
  }

  async show({ params }) {
    const user = await User.where({ _id: params.id })
      .with("unity")
      .firstOrFail();

    return user;
  }

  async destroy({ params }) {
    const user = await User.where({ _id: params.id }).firstOrFail();
    await user.delete();
  }
}

module.exports = UserController;
