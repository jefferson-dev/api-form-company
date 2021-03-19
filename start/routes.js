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
}).middleware("auth");
