import UserModel from "../models/userModel.js"
import bcrypt from 'bcrypt'
import { configDotenv } from "dotenv"
import jwt from 'jsonwebtoken'
import {OfferModel, OrderModel, ProjectExpenseModel, ProjectModel, ProjectSalesModel, StockModel, TransportModel} from "../models/projectModel.js"
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

export const ConfirmOrder = async (req, res) => {
  try {
      const { order_id, transportInfo, orderDetails } = req.body
      // console.log(orderDetails);
      const {type, from, to, distance, cost} = transportInfo
      const order = await OrderModel.findOne({_id: order_id})
      await OrderModel.findOneAndUpdate({_id: order_id}, {status: 'Completed'})
      await OfferModel.findOneAndUpdate({_id: order.offer_id}, {status: 'Sold Out'})
      await ProjectSalesModel.findOneAndUpdate({_id: order.sales_id}, {status: 'Sold Out'})

      const stockModel = new StockModel({
        product_name: orderDetails.product_id.product_name,
        quantity: orderDetails.offer_id.quantity,
        price: orderDetails.offer_id.price,
        amount: orderDetails.offer_id.amount,
        transport_cost: transportInfo.cost,
        status: "Processing",
        seller_name: orderDetails.seller_id.name,
        owner: orderDetails.buyer_id._id,
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