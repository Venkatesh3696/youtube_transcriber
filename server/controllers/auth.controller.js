import { Users } from "../models/users.model";

export const registerUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      message: "please provide email and password!",
    });
  }

  try {
    const user = new Users({
      email: email,
      password: password,
    });

    await user.save();
    res.status(201).json({ message: "user registered successfully!" });
  } catch (error) {
    res.status(400).json({ message: "error while registering !", error });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      message: "please provide email and password!",
    });
  }

  try {
    const user = new Users({
      email: email,
      password: password,
    });

    await user.save();
    res.status(201).json({ message: "user registered successfully!" });
  } catch (error) {
    res.status(400).json({ message: "error while registering !", error });
  }
};
