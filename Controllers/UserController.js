import Users from "../Schema/UserSchema.js";
import { createError } from "../Helpers/Error.js";
import bcrypt from "bcrypt";

const User_Controller = {
  get_users: (req, res, next) => {
    console.log("received request");
  },

  login: async (req, res) => {
    console.log("--received", req.body);

    const with_email = await Users.findOne({ email: req.body.email }).catch(
      (err) => console.log(err)
    );
    // const with_phone = await Users.findOne({ phone: parseInt(req.body.email )}).catch(err=>console.log(err));
    try {
      const data = with_email ?? with_phone;
      if (with_email) {
        bcrypt.compare(
          req.body.password,
          with_email?.password,
          (err, result) => {
            if (err) {
              res.status(400).json("wrong password");
            } else if(result) {
              res.status(200).json(with_email);
            }
          }
        );
      } else {
        res.status(404).json("user details not found"); 
      }
    } catch (error) {
      res.status(500).json("server error");
    }
  },
};

export default User_Controller;
