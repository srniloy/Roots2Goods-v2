import UserModel from "../models/userModel.js"
import bcrypt from 'bcrypt'
import { configDotenv } from "dotenv"
import jwt from 'jsonwebtoken'
import {OfferModel, OrderModel, ProjectExpenseModel, ProjectModel, ProjectSalesModel, StockModel, TraderSalesModel, TransportModel, WholesalerOfferModel, WholesalerOrderModel, WholesalerStockModel} from "../models/projectModel.js"
import fs from 'fs'


configDotenv()

const SaltRounds = parseInt(process.env.SaltRounds);
const TokenSecret = process.env.TokenSecret;



export const GetAvailableProducts = async (req, res) => {
    try {
        // const existance = await UserModel.findOne({name: userModel.phone})

        const products = await TraderSalesModel.find({ status: 'Ready to sell' })
        .populate({
            path: 'stock_id',
            populate: {
              path: 'owner',
              select: 'name address'
            },
          });
          console.log(products);
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
        console.log("here======================");
        console.log(sales_id);
        const product = await TraderSalesModel.findOne({_id: sales_id})
        .populate({
            path: 'stock_id',
            select: 'product_name',
            populate: {
              path: 'owner',
              select: 'name address phone createdAt'
            },
          });
        // const projects = await ProjectModel.find({created_by: user_id})
        console.log(product);
        return res.json({ message: "Operation Success", resData: { product } })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal server error" })
    }
}



export const AddNewOffer = async (req, res) => {
  try {
      const { quantity ,price, offered_by, sales_id, stock_id } = req.body
      console.log("====================================");
      console.log(req.body);
      const offerModel = new WholesalerOfferModel({quantity: parseInt(quantity), price, amount: parseInt(quantity)*parseInt(price), offered_by, stock_id, sales_id, status: 'Pending'})
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
      const offers = await WholesalerOfferModel.find({offered_by: offered_by, status: {$in: ['Pending', 'Waiting', 'Approved']}})
      .populate({
          path: 'stock_id',
          select: 'product_name',
          populate: {
            path: 'owner',
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


export const UpdateStatusOnOfferAcceptance = async (req, res) => {
  try {
      const {offer_id} = req.body
      const offer = await WholesalerOfferModel.findOneAndUpdate({_id: offer_id}, {status: 'Waiting'}, { new: true })

      const sales = await TraderSalesModel.findOneAndUpdate({_id: offer.sales_id}, {status: 'Processing'}, { new: true })

      return res.json({ message: "Operation Success", resData: {} })

  } catch (error) {
      console.log(error);
      res.status(500).json({ error: "internal server error" })
  }
}


export const ApproveOfferStatus = async (req, res) => {
  try {
      const {offer_id} = req.body
      console.log(offer_id);
      const offer = await WholesalerOfferModel.findOneAndUpdate({_id: offer_id}, {status: 'Approved'}, { new: true })

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


// =================================================== Stocked Products ===============================================


export const GetStockedProducts = async (req, res) => {
  try {
      const { user_id } = req.body
      console.log("--------------------------------------------------------------");
      console.log(user_id);
      const data = await WholesalerStockModel.find({ owner: user_id})
      
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
      const order = await WholesalerStockModel.find({ product_name: product_name, owner: user_id})
      console.log(order);
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
      // const updatedSales = await Promise.all(
      //     sales.map(async (sale) => {
      //         const offers = await OfferModel.find({ sales_id: sale._id, status: 'Pending' });
      
      //         const saleObj = sale.toObject();
      //         saleObj['total_offers'] = offers.length;
      
      //         return saleObj;
      //     })
      // );
      
      // // const projects = await ProjectModel.find({created_by: user_id})
      console.log(sales);
      return res.json({ message: "Done Successfully", resData: sales })

  } catch (error) {
      console.log(error);
      res.status(500).json({ error: "internal server error" })
  }
}


export const DeleteSales = async (req, res) => {
    try {
        // const existance = await UserModel.findOne({name: userModel.phone})
        console.log("H=============================================H");
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




export const GetTransactions = async (req, res) => {
  try {
      const {user_id} = req.body
      const orders = await WholesalerOrderModel.find({ $or: [{buyer_id: user_id}, {seller_id: user_id}]})
      .populate(['buyer_id', 'seller_id', 'sales_id', 'stock_id', 'offer_id']).sort({createdAt: -1})
      return res.json({ message: "Operation Success", resData: orders })

  } catch (error) {
      console.log(error);
      res.status(500).json({ error: "internal server error" })
  }
}



export const GetFilterSelestionData = async (req, res) => {
  try {
      const addresses = await UserModel.find().select('address')
      const allProducts = await StockModel.find().select('product_name')
      const allFarmers = await UserModel.find({type: "Trader"}).select('name')
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
      const products = await TraderSalesModel.find({ status: 'Ready to sell' })
      .populate({
          path: 'stock_id',
          populate: {
            path: 'owner',
            select: 'name address'
          },
        });
      const filteredProducts = products.filter(item => {
        const matchesLocation = location.length > 0 ? item.stock_id.owner.address === location : true;
        const matchesProductName = product.length > 0 ? item.stock_id.product_name === product : true;
        const matchesUserName = farmer.length > 0 ? item.stock_id.owner.name === farmer : true;
      
        return matchesLocation && matchesProductName && matchesUserName;
      });
      
      return res.json({ message: "Operation Success", resData: filteredProducts })

  } catch (error) {
      console.log(error);
      res.status(500).json({ error: "internal server error" })
  }
}