import bcrypt from "bcrypt";
import UserModel from "../model/userModel";

export async function signUp(req, res) {
  try {
    const { name, email, password } = req.body;

    let hashedPassword = bcrypt.hashSync(password, 12);

    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    res.json({ status: true, message: "User Created" });
  } catch (error) {
    console.log(error);
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.json({ error: true, message: "User not registered" });
    }
    const userValid = bcrypt.compareSync(password, user.password);

    if (!userValid) {
      return res.json({ error: true, message: "wrong Password" });
    } else {
      const token = createToken(user._id);
      if (!token)
        return res
          .status(500)
          .json({ status: false, message: "Internal Server Error" })
          
      res.cookie("token", token, {
        withCredentials: true,
        httpOnly: false,
        sameSite: "None",
        secure: true,
      });
      res.json({ login: true, user, token });
    }
  } catch (error) {
    console.log(error);
  }
}
