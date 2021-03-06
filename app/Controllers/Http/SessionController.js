"use strict";

const User = use("App/Models/User");

class SessionController {
  async store({ request, auth, response }) {
    try {
      const { email, password } = request.only(["email", "password"]);
      const user = await User.query()
        .where("email", email)
        .where("active", true)
        .firstOrFail("password", password);
      const token = await auth.withRefreshToken().attempt(email, password);
      return { user, token };
    } catch (err) {
      return response.status(400).send({
        error: {
          message: "Usuario desativado.",
        },
      });
    }
  }

  async refreshToken({ request, auth }) {
    const refreshTokenInput = request.input("refresh_token");
    return await auth
      .newRefreshToken()
      .generateForRefreshToken(refreshTokenInput, true);
  }
}

module.exports = SessionController;
