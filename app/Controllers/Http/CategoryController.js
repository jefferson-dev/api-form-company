"use strict";
const Category = use("App/Models/Category");
class CategoryController {
  async index({ request }) {
    try {
      const data = request.only(["name"]);
      if (data.name) {
        const categories = Category.where({
          name: { $regex: new RegExp(`.*${data.name}.*`) },
        })
          .sort("-name")
          .fetch();
        return categories;
      }
      const categories = Category.fetch();
      return categories;
    } catch (err) {
      console.log(err);
    }
  }

  async store({ request, response }) {
    const data = request.only(["name", "active"]);
    const categoryData = await Category.where({ name: data.name }).first();
    if (categoryData) {
      return response.status(400).send({
        error: {
          message: "Esta categoria já está cadastrada.",
        },
      });
    }
    const category = await Category.create({ ...data });
    return category;
  }

  async update({ params, request }) {
    const category = await Category.where({ _id: params.id }).first();
    if (category) {
      const data = request.only(["name", "active"]);
      category.merge(data);
      await category.save();
      return category;
    }
  }

  async show({ params }) {
    const category = await Category.where({ _id: params.id }).firstOrFail();

    return category;
  }

  async destroy({ params }) {
    const category = await Category.where({ _id: params.id }).firstOrFail();
    await category.delete();
  }
}

module.exports = CategoryController;
