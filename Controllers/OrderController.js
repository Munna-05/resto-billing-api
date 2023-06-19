import Orders from "../Schema/OrderSchema.js";
import Users from '../Schema/UserSchema.js'
import Bills from '../Schema/BillSchema.js'
export const OrderController = {
  placeOrder: async (req, res) => {
  try {
    console.log("received", req.body);

    const cart = req.body.data;

    // Calculate the total price
    const totalPrice = cart?.reduce((accumulator, item) => accumulator + item.item_price * item.quantity, 0);
    
    // Add 5% GST to the total price
    const totalPriceWithGST = totalPrice * 1.05;
    
    const data = {
      orderBy: req.body.userid,
      orderByName: req.body.user_name,
      orderDate: Date.now(),
      items: req.body.data,
      billAmount: totalPriceWithGST.toFixed(2),
      month: "July",
      year: 2023,
    };
    
      console.log(data)
    const newData = new Orders(data);
    const save = await newData.save();
    console.log(save);
    if (save) res.status(200).json(save);
    else res.status(500).json("error");
  } catch (error) {

    res.status(500).json(error)
    
  }     
  },
  getOrders: async (req, res) => {
    const toFilter = await Orders.find().sort({ createdAt: -1 })
      const orders = toFilter.filter(res=> res?.billGenerated === false)
      res.status(200).json(orders)
  },
  generateBill: async (req, res) => {
    console.log('order id :',req.params.orderid)
    console.log('user id :',req.params.userid)
    const data ={
      OrderDetails : req.params.orderid,
      OrderBy:req.params.userid
    }
    try {
      const newBill = new Bills(data)
      const save = await newBill.save()
      await Orders.findByIdAndUpdate(req.params.orderid,{billGenerated:true},{new:true})
      const toFilter = await Orders.find().sort({ createdAt: -1 })
      const orders = toFilter.filter(res=> res?.billGenerated === false)
      console.log("bill generated false",orders) 
      if(orders) res.status(200).json(orders)
    } catch (error) { 
      console.log(error)
    }

   
  },
  bills:async(req,res)=>{
    const allBills = await Bills.find().populate('OrderDetails',"billAmount items").populate('OrderBy',"name").sort({createdAt:-1}).exec()
    console.log(allBills)
    res.status(200).json(allBills)
  },
  billsByUser:async(req,res)=>{

    console.log(req.params.userid)

    const allBills = await Bills.find({OrderBy:req.params.userid}).populate('OrderDetails',"billAmount items").populate('OrderBy',"name").sort({createdAt:-1}).exec()
    console.log(allBills)
    res.status(200).json(allBills)
    
  },

};
 