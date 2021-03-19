"use strict";

const Route = use("Route");

Route.post("sessions", "SessionController.store");
Route.post("users", "UserController.store");
Route.post("recover", "RecoverController.store");

Route.group(() => {
  Route.get("unity", "UnityController.index");
  Route.get("unity/:id", "UnityController.show");
  Route.put("unity/:id", "UnityController.update");
  Route.delete("unity/:id", "UnityController.destroy");
  Route.post("unity", "UnityController.store");

  Route.get("users", "UserController.index");
  Route.get("users/:id", "UserController.show");
  Route.put("users/:id", "UserController.update");
  Route.delete("users/:id", "UserController.destroy");

  Route.get("category", "CategoryController.index");
  Route.get("category/:id", "CategoryController.show");
  Route.put("category/:id", "CategoryController.update");
  Route.delete("category/:id", "CategoryController.destroy");
  Route.post("category", "CategoryController.store");

  Route.get("form", "FormController.index");
  Route.get("form/:id", "FormController.show");
  Route.put("form/:id", "FormController.update");
  Route.delete("form/:id", "FormController.destroy");
  Route.post("form", "FormController.store");

  Route.get("answer", "AnswerController.index");
  Route.get("answer/:id", "AnswerController.show");
  Route.put("answer/:id", "AnswerController.update");
  Route.delete("answer/:id", "AnswerController.destroy");
  Route.post("answer", "AnswerController.store");
}).middleware("auth");
