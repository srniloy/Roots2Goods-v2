import UserModel from "../models/userModel.js"
import bcrypt from 'bcrypt'
import { configDotenv } from "dotenv"
import jwt from 'jsonwebtoken'
import {OfferModel, OrderModel, ProjectExpenseModel, ProjectModel, ProjectSalesModel, StockModel, TraderSalesModel, TransportModel, WholesalerOfferModel, WholesalerOrderModel, WholesalerStockModel, WholesalerTransportModel} from "../models/projectModel.js"
import fs from 'fs'


configDotenv()

const SaltRounds = parseInt(process.env.SaltRounds);
const TokenSecret = process.env.TokenSecret;



export const GetAvailableProducts = async (req, res) => {
    try {
        // const existance = await UserModel.findOne({name: userModel.phone})

        const products = await ProjectSalesModel.find({ status: 'Pending' })
        .populate({
            path: 'project_id',
            select: 'title product_name img',
            populate: {
              path: 'created_by',
              select: 'name address'
            },
          });
        // console.log(data.project_id.created_by);
        // const projects = await ProjectModel.find({created_by: user_id})
        // console.log(projects);
        return res.json({ message: "Operation Success", resData: { products } })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal server error" })
    }
}

export const GetProductDetails = async (req, res) => {
    try {
        const {sales_id} = req.body
        console.log("here-------------------------");
        console.log(sales_id);
        const product = await ProjectSalesModel.findOne({_id: sales_id})
        .populate({
            path: 'project_id',
            select: 'title product_name cover_img',
            populate: {
              path: 'created_by',
              select: 'name address phone createdAt'
            },
          });
        // const projects = await ProjectModel.find({created_by: user_id})
        // console.log(projects);
        return res.json({ message: "Operation Success", resData: { product } })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal server error" })
    }
}



export const AddNewOffer = async (req, res) => {
  try {
      const { quantity ,price, offered_by, sales_id, project_id } = req.body
      console.log(req.body);
      const offerModel = new OfferModel({quantity, price, amount: quantity*price, offered_by, project_id, sales_id, status: 'Pending'})
      await offerModel.save()
      return res.json({ message: "Offer added Successfully", resData: {} })
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: "internal server error" })
  }
}


export const GetOffersList = async (req, res) => {
  try {
      const {offered_by} = req.body
      const offers = await OfferModel.find({offered_by: offered_by, status: {$in: ['Pending', 'Accepted']}})
      .populate({
          path: 'project_id',
          select: 'product_name',
          populate: {
            path: 'created_by',
            select: 'name'
          }
      })
      .sort({ _id: -1 })
      console.log(offers);
      // const projects = await ProjectModel.find({created_by: user_id})
      // console.log(projects);
      return res.json({ message: "Operation Success", resData: offers })

  } catch (error) {
      console.log(error);
      res.status(500).json({ error: "internal server error" })
  }
}


export const OfferCancellation = async (req, res) => {
  try {
      const {offer_id} = req.body
      console.log("offer id: ", offer_id);
      const offer = await OfferModel.findOne({_id: offer_id})

      if(offer.status == 'Accepted'){
        const sales = await ProjectSalesModel.findOneAndUpdate({_id: offer.sales_id}, {status: 'Pending'}, { new: true })
        await OfferModel.findOneAndUpdate({_id: offer_id}, {status: 'Cancelled'}, { new: true })
      }else{
        await OfferModel.deleteOne({_id: offer_id})
      }

      return res.json({ message: "Operation Success", resData: {} })

  } catch (error) {
      console.log(error);
      res.status(500).json({ error: "internal server error" })
  }
}


export const GetWholesalerOffersList = async (req, res) => {
  try {
      const {user_id} = req.body
      const offers = await WholesalerOfferModel.find()
        .populate({
            path: 'stock_id',
            match: { owner: user_id }, // Match stocks where owner matches traderId
            select: 'product_name owner', // Select only relevant fields from stocks
            populate: {
                path: 'owner',
                model: 'users', // Populate trader details from the 'users' collection
                select: 'name phone', // Include only the trader's name and phone
            },
        }).populate('offered_by')
        .sort({ _id: -1 })
      // const projects = await ProjectModel.find({created_by: user_id})
      // console.log(projects);
      return res.json({ message: "Operation Success", resData: offers })

  } catch (error) {
      console.log(error);
      res.status(500).json({ error: "internal server error" })
  }
}



// =================================================== Orders ===============================================

export const AddOrders = async (req, res) => {
  try {
      const { seller_id ,buyer_id, sales_id, product_id, offer_id } = req.body
      const orderModel = new OrderModel({seller_id ,buyer_id, sales_id, product_id, offer_id, status: 'Processing'})
      await orderModel.save()
      return res.json({ message: "Order added Successfully", resData: orderModel })
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: "internal server error" })
  }
}


export const AddWholesalerOrders = async (req, res) => {
  try {
      const { seller_id ,buyer_id, sales_id, stock_id, offer_id } = req.body
      const orderModel = new WholesalerOrderModel({seller_id ,buyer_id, sales_id, stock_id, offer_id, status: 'Processing'})
      await orderModel.save()
      return res.json({ message: "Order added Successfully", resData: orderModel })
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: "internal server error" })
  }
}


export const GetOrderInfo = async (req, res) => {
  try {
      const { order_id } = req.body
      const order = await OrderModel.findOne({_id: order_id})
      .populate(['seller_id' ,'buyer_id', 'sales_id', 'product_id', 'offer_id'])
      return res.json({ message: "Operation Successful", resData: order })
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: "internal server error" })
  }
}


export const GetWholeSalerOrderInfo = async (req, res) => {
  try {
      const { order_id } = req.body
      const order = await WholesalerOrderModel.findOne({_id: order_id})
      .populate(['seller_id' ,'buyer_id', 'sales_id', 'stock_id', 'offer_id'])
      return res.json({ message: "Operation Successful", resData: order })
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: "internal server error" })
  }
}

export const ConfirmOrder = async (req, res) => {
  try {
      const { order_id, transportInfo, orderDetails } = req.body
      console.log(orderDetails);
      const {type, from, to, distance, cost} = transportInfo
      const order = await OrderModel.findOne({_id: order_id})
      await OrderModel.findOneAndUpdate({_id: order_id}, {status: 'Completed'})
      const offer = await OfferModel.findOneAndUpdate({_id: order.offer_id}, {status: 'Sold Out'}, {new: true})
      const sale = await ProjectSalesModel.findOneAndUpdate({_id: order.sales_id}, {status: 'Sold Out', quantity: offer.quantity, price: offer.price, amount: offer.amount}, {new: true})
      
      const stock = await StockModel.find({product_name: orderDetails.product_id.product_name})
      const stockModel = new StockModel({
        product_name: orderDetails.product_id.product_name,
        quantity: orderDetails.offer_id.quantity,
        price: orderDetails.offer_id.price,
        amount: orderDetails.offer_id.amount,
        transport_cost: transportInfo.cost,
        status: "Processing",
        seller_name: orderDetails.seller_id.name,
        collection_date: sale.collection_date,
        owner: orderDetails.buyer_id._id,
        slot: (stock.length || 0) + 1,
        order_id
      })
      await stockModel.save()
      if(cost > 0){
        const transportModel = new TransportModel({vehicle: type, pickup_location: from, delivery_location: to, distance, cost, order_id})
        await transportModel.save()
      }
      return res.json({ message: "Operation Successful", resData: {} })
      // return res.json({ message: "Operation Successful", resData: order })
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: "internal server error" })
  }
}



export const ConfirmWholesalerOrder = async (req, res) => {
  try {
      const { order_id, transportInfo, orderDetails } = req.body
      console.log(orderDetails);
      const {type, from, to, distance, cost} = transportInfo
      const order = await WholesalerOrderModel.findOne({_id: order_id})
      await WholesalerOrderModel.findOneAndUpdate({_id: order_id}, {status: 'Completed'})
      console.log(order);
      const offer = await WholesalerOfferModel.findOneAndUpdate({_id: order.offer_id}, {status: 'Sold Out'}, {new: true})
      const sale = await TraderSalesModel.findOneAndUpdate({_id: order.sales_id}, {status: 'Sold Out', quantity: offer.quantity, price: offer.price, amount: offer.amount}, {new: true})
      await StockModel.findOneAndUpdate({_id: orderDetails.stock_id._id}, {status: 'Sold Out'})
      const stock = await WholesalerStockModel.find({product_name: orderDetails.stock_id.product_name})
      const stockModel = new WholesalerStockModel({
        product_name: orderDetails.stock_id.product_name,
        quantity: orderDetails.offer_id.quantity,
        price: orderDetails.offer_id.price,
        amount: orderDetails.offer_id.amount,
        transport_cost: transportInfo.cost,
        status: "Processing",
        seller_name: orderDetails.seller_id.name,
        collection_date: sale.collection_date,
        owner: orderDetails.buyer_id._id,
        slot: (stock.length || 0) + 1,
        order_id
      })
      await stockModel.save()
      if(cost > 0){
        const transportModel = new WholesalerTransportModel({vehicle: type, pickup_location: from, delivery_location: to, distance, cost, order_id})
        await transportModel.save()
      }
      return res.json({ message: "Operation Successful", resData: {} })
      // return res.json({ message: "Operation Successful", resData: order })
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: "internal server error" })
  }
}

// =================================================== Stocked Products ===============================================


export const GetStockedProducts = async (req, res) => {
  try {
      const { user_id } = req.body
      const data = await StockModel.find({ owner: user_id})
      
      const groupedData = Object.values(
        data.reduce((acc, item) => {
          const { product_name, quantity, updatedAt } = item;
      
          if (!acc[product_name]) {
            acc[product_name] = {
              product_name,
              quantity: quantity,
              last_update: updatedAt,
            };
          } else {
            acc[product_name].quantity += quantity;
            acc[product_name].last_update = 
              new Date(acc[product_name].last_update) > new Date(updatedAt)
                ? acc[product_name].last_update
                : updatedAt;
          }
      
          return acc;
        }, {})
      );
      
      console.log(groupedData);


      return res.json({ message: "Operation Successful", resData: groupedData })
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: "internal server error" })
  }
}




export const GetStockedSlots = async (req, res) => {
  try {
      const { product_name, user_id } = req.body
      console.log(req.body);
      const order = await StockModel.find({ product_name: product_name, owner: user_id})


      return res.json({ message: "Operation Successful", resData: order })
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: "internal server error" })
  }
}


// =================================================== Sales ===============================================


export const AddNewProductSale = async (req, res) => {
  try {
      const { sales_info, stock_id } = req.body
      const stock = await StockModel.findOneAndUpdate({_id: stock_id},{status: 'Ready to sell'}, {new:true})
      const salesModel = new TraderSalesModel({ amount: (sales_info.quantity*sales_info.price), quantity: sales_info.quantity, price: sales_info.price, 
        collection_date:stock.collection_date, status: "Ready to sell", stock_id, product_name: stock.product_name})
      await salesModel.save()
      return res.json({ message: "Sales added Successfully"})
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: "internal server error" })
  }
}


export const GetProductSales = async (req, res) => {
  try {
      // const existance = await UserModel.findOne({name: userModel.phone})
      const { product_name } = req.body
      const sales = await TraderSalesModel.find({ product_name: product_name || '' });
      const updatedSales = await Promise.all(
          sales.map(async (sale) => {
              const offers = await WholesalerOfferModel.find({ sales_id: sale._id, status: 'Pending' });
      
              const saleObj = sale.toObject();
              saleObj['total_offers'] = offers.length;
      
              return saleObj;
          })
      );
      
      // // const projects = await ProjectModel.find({created_by: user_id})
      console.log(sales);
      return res.json({ message: "Done Successfully", resData: updatedSales })

  } catch (error) {
      console.log(error);
      res.status(500).json({ error: "internal server error" })
  }
}


export const DeleteSales = async (req, res) => {
    try {
        // const existance = await UserModel.findOne({name: userModel.phone})
        console.log(req.body);
        const { sales_id } = req.body
        const sale = await TraderSalesModel.findOne({ _id: sales_id })

        await StockModel.findOneAndUpdate({_id: sale.stock_id}, {status:"Processing"})
        const ack = await TraderSalesModel.deleteOne({ _id: sales_id })
        // const Offers_Ack = await OfferModel.deleteMany({ sales_id: sales_id })
        console.log(ack);
        if(!ack){
            return res.status(400).json({ message: "Failed to deleted sales", resData: undefined })
        }
        // const projects = await ProjectModel.find({created_by: user_id})
        // console.log(projects);
        return res.json({ message: "Sales deleted Successfully", resData: undefined })
    } catch (error) {
        res.status(500).json({ error: "internal server error" })
    }
}



export const GetSalesOffersList = async (req, res) => {
  try {
      const {sales_id} = req.body
      const offers = await WholesalerOfferModel.find({sales_id: sales_id, status: 'Pending'})
      .populate({
          path: 'offered_by',
          select: 'name phone address'
        });
        console.log(offers);
      // const projects = await ProjectModel.find({created_by: user_id})
      // console.log(projects);
      return res.json({ message: "Operation Success", resData: offers })

  } catch (error) {
      console.log(error);
      res.status(500).json({ error: "internal server error" })
  }
}




export const GetTransactions = async (req, res) => {
  try {
      const {user_id} = req.body
      const order1 = await OrderModel.find({ $or: [{buyer_id: user_id}, {seller_id: user_id}]})
      .populate(['buyer_id', 'seller_id', 'sales_id', 'product_id', 'offer_id']).sort({createdAt: -1})
      const order2 = await WholesalerOrderModel.find({ $or: [{buyer_id: user_id}, {seller_id: user_id}]})
      .populate(['buyer_id', 'seller_id', 'sales_id', 'stock_id', 'offer_id']).sort({createdAt: -1})
      const mergeOrders = [...order1, ...order2]
      mergeOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      return res.json({ message: "Operation Success", resData: mergeOrders })

  } catch (error) {
      console.log(error);
      res.status(500).json({ error: "internal server error" })
  }
}


export const GetFilterSelestionData = async (req, res) => {
  try {
      const addresses = await UserModel.find().select('address')
      const allProducts = await ProjectModel.find().select('product_name')
      const allFarmers = await UserModel.find({type: "Farmer"}).select('name')
      const locations = [...new Set(addresses.map(item => item.address))];
      const products = [...new Set(allProducts.map(item => item.product_name))];
      const farmers = [...new Set(allFarmers.map(item => item.name))];

      return res.json({ message: "Operation Success", resData: {locations, products, farmers} })

  } catch (error) {
      console.log(error);
      res.status(500).json({ error: "internal server error" })
  }
}


export const GetFilteredAvailableData = async (req, res) => {
  try {
      // const existance = await UserModel.findOne({name: userModel.phone})
      const {farmer, location, product} = req.body
      console.log(farmer);
      console.log(location);
      console.log(product);
      // if(farmer.length > 0 && location.length > 0 && product.length > 0){

      // }else if()
      const products = await ProjectSalesModel.find({ status: 'Pending' })
      .populate({
          path: 'project_id',
          select: 'title product_name img',
          populate: {
            path: 'created_by',
            select: 'name address'
          },
        });
      const filteredProducts = products.filter(item => {
        const matchesLocation = location.length > 0 ? item.project_id.created_by.address === location : true;
        const matchesProductName = product.length > 0 ? item.project_id.product_name === product : true;
        const matchesUserName = farmer.length > 0 ? item.project_id.created_by.name === farmer : true;
      
        return matchesLocation && matchesProductName && matchesUserName;
      });
      
      return res.json({ message: "Operation Success", resData: filteredProducts })

  } catch (error) {
      console.log(error);
      res.status(500).json({ error: "internal server error" })
  }
}