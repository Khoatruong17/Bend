const UserS = require("../services/customerService");

const createNewUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Missing required fields name, email, password" });
    }
    const data = await UserS.createUserService(name, email, password);
    return res.status(200).json({
      message: "User created successfully",
      data,
    });
  } catch (error) {
    console.log(">> Error from createNewUser (Controller): ", error);
    return res
      .status(500)
      .json({ error: ">> Error from createNewUser (Controller): ", error });
  }
};

module.exports = {
  createNewUser,
};
