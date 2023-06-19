import Users from "../Schema/UserSchema.js";
import bcrypt from "bcrypt";
import Orders from '../Schema/OrderSchema.js'
import MenuItems from '../Schema/MenuItemsSchema.js'
export const Admin_controller = {
  createUser: async (req, res) => {
    const with_email = await Users.findOne({ email: req.body.email }).catch(
      (err) => res.status(500).json("server error", { error: err })
    );
    const with_phone = await Users.findOne({
      phone: req.body.phoneNumber,
    }).catch((err) => res.status(500).json("server error", { error: err }));

    if (with_email || with_phone) {
      res.status(409).json("User Already Exists");
    } else {
      const hashed = await bcrypt.hash(req.body.password, 12);
      const data = {
        name: req.body.name,
        email: req.body.email,
        password: hashed,
        phone: req.body.phoneNumber,
        isAdmin: false,
      };

      try {
        const newUser = new Users(data);
        const saved = await newUser.save();
        if (saved) {
          const allUsers = await Users.find();
          res.status(200).json( allUsers );
        }
      } catch (error) {
        res.status(400).json(error);
      }
    }
  },
  findAllOrders:async(req,res)=>{
    const all_orders = await Orders.find()
    console.log(all_orders)
    res.status(200).json(all_orders)
  },
  addItem:async(req,res)=>{
    console.log(req.body)
    const newItem = new MenuItems(req.body)
    const saved = await newItem.save()
    res.status(200).json(saved)
  },
  getAllItems:async(req,res)=>{
    const allItems = await MenuItems.find()
    if(allItems) res.status(200).json(allItems)
  }
};
