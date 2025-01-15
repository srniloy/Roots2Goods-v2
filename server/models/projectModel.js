import mongoose from "mongoose";


const schema = new mongoose.Schema({
    title: String,
    product_name: String,
    seedling: Number,
    land: Number,
    start_time: String,
    status: String,
    img: String,
    cover_img: String,
    created_by: {type: mongoose.Schema.Types.ObjectId, ref: 'users'}
}, {timestamps: true})


const expenseSchema = new mongoose.Schema({
    sector: String,
    date: String,
    unit: Number,
    cost: Number,
    project_id: {type: mongoose.Schema.Types.ObjectId, ref: 'farmer-projects'}
})

const salesSchema = new mongoose.Schema({
    quantity: Number,
    price: Number,
    amount: Number,
    collection_date: String,
    interested: Number,
    status: String,
    project_id: {type: mongoose.Schema.Types.ObjectId, ref: 'farmer-projects'}
})


const offerSchema = new mongoose.Schema({
    quantity: Number,
    price: Number,
    amount: Number,
    status: String,
    offered_by: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    sales_id: {type: mongoose.Schema.Types.ObjectId, ref: 'farmer-project-sales'},
    project_id: {type: mongoose.Schema.Types.ObjectId, ref: 'farmer-projects'}
})


const orderSchema = new mongoose.Schema({
    seller_id: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    buyer_id: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    sales_id: {type: mongoose.Schema.Types.ObjectId, ref: 'farmer-project-sales'},
    product_id: {type: mongoose.Schema.Types.ObjectId, ref: 'farmer-projects'},
    offer_id: {type: mongoose.Schema.Types.ObjectId, ref: 'offers'},
    status: String
}, {timestamps: true})


const transportSchema = new mongoose.Schema({
    vehicle: String,
    pickup_location: String,
    delivery_location: String,
    distance: Number,
    cost: Number,
    order_id: {type: mongoose.Schema.Types.ObjectId, ref: 'orders'}
})



const stockSchema = new mongoose.Schema({
    product_name: String,
    quantity: Number,
    price: Number,
    amount: Number,
    transport_cost: Number,
    status: String,
    seller_name: String,
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    order_id: {type: mongoose.Schema.Types.ObjectId, ref: 'orders'}
}, {timestamps: true})





const ProjectModel = mongoose.model("farmer-projects", schema)
const ProjectExpenseModel = mongoose.model("farmer-project-expenses", expenseSchema)
const ProjectSalesModel = mongoose.model("farmer-project-sales", salesSchema)
const OfferModel = mongoose.model("offers", offerSchema)
const OrderModel = mongoose.model("orders", orderSchema)
const TransportModel = mongoose.model("transports", transportSchema)
const StockModel = mongoose.model("stocks", stockSchema)

export {ProjectModel, ProjectExpenseModel, ProjectSalesModel, OfferModel, OrderModel, TransportModel, StockModel};

