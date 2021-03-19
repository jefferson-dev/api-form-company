"use strict";
const Unity = use("App/Models/Unity");
class UnityController {
  async index({ request }) {
    try {
      const data = request.only(["name"]);
      if (data.name) {
        const unities = Unity.where({
          name: { $regex: new RegExp(`.*${data.name}.*`) },
        })
          .with("users")
          .sort("-name")
          .fetch();
        return unities;
      }
      const unities = Unity.with("users").fetch();
      return unities;
    } catch (err) {
      console.log(err);
    }
  }

  async store({ request, response }) {
    const data = request.only(["name", "active"]);
    const unityData = await Unity.where({ name: data.name }).first();
    if (unityData) {
      return response.status(400).send({
        error: {
          message: "Esta unidade já está cadastrada.",
        },
      });
    }
    const unity = await Unity.create({ ...data });
    return unity;
  }

  async update({ params, request }) {
    const unity = await Unity.where({ _id: params.id }).first();
    if (unity) {
      const data = request.only(["name", "active"]);
      unity.merge(data);
      await unity.save();
      return unity;
    }
  }

  async show({ params }) {
    const unity = await Unity.with("users")
      .where({ _id: params.id })
      .firstOrFail();

    return unity;
  }

  async destroy({ params }) {
    const unity = await Unity.where({ _id: params.id }).firstOrFail();
    await unity.delete();
  }
}

module.exports = UnityController;
