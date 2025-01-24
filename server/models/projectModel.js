import mongoose from "mongoose";


const projectSchema = new mongoose.Schema({
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




// ============================================== Traders =============================================================






const offerSchema = new mongoose.Schema({
    quantity: Number,
    price: Number,
    amount: Number,
    status: String,
    offered_by: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    sales_id: {type: mongoose.Schema.Types.ObjectId, ref: 'farmer-project-sales'},
    project_id: {type: mongoose.Schema.Types.ObjectId, ref: 'farmer-projects'}
})

const wholesalerOfferSchema = new mongoose.Schema({
    quantity: Number,
    price: Number,
    amount: Number,
    status: String,
    offered_by: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    sales_id: {type: mongoose.Schema.Types.ObjectId, ref: 'trader-product-sales'},
    stock_id: {type: mongoose.Schema.Types.ObjectId, ref: 'stocks'}
})


const orderSchema = new mongoose.Schema({
    seller_id: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    buyer_id: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    sales_id: {type: mongoose.Schema.Types.ObjectId, ref: 'farmer-project-sales'},
    product_id: {type: mongoose.Schema.Types.ObjectId, ref: 'farmer-projects'},
    offer_id: {type: mongoose.Schema.Types.ObjectId, ref: 'offers'},
    status: String
}, {timestamps: true})

const wholesalerOrderSchema = new mongoose.Schema({
    seller_id: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    buyer_id: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    sales_id: {type: mongoose.Schema.Types.ObjectId, ref: 'trader-product-sales'},
    stock_id: {type: mongoose.Schema.Types.ObjectId, ref: 'stocks'},
    offer_id: {type: mongoose.Schema.Types.ObjectId, ref: 'wholesaler-offers'},
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


const wholesalerTransportSchema = new mongoose.Schema({
    vehicle: String,
    pickup_location: String,
    delivery_location: String,
    distance: Number,
    cost: Number,
    order_id: {type: mongoose.Schema.Types.ObjectId, ref: 'wholesaler-orders'}
})


const stockSchema = new mongoose.Schema({
    product_name: String,
    quantity: Number,
    price: Number,
    amount: Number,
    transport_cost: Number,
    status: String,
    collection_date: String,
    seller_name: String,
    slot: Number,
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    order_id: {type: mongoose.Schema.Types.ObjectId, ref: 'orders'}
}, {timestamps: true})


const wholesalerStockSchema = new mongoose.Schema({
    product_name: String,
    quantity: Number,
    price: Number,
    amount: Number,
    transport_cost: Number,
    status: String,
    collection_date: String,
    seller_name: String,
    slot: Number,
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    order_id: {type: mongoose.Schema.Types.ObjectId, ref: 'wholesaler-orders'}
}, {timestamps: true})



const traderSalesSchema = new mongoose.Schema({
    quantity: Number,
    price: Number,
    amount: Number,
    collection_date: String,
    interested: Number,
    status: String,
    product_name: String,
    stock_id: {type: mongoose.Schema.Types.ObjectId, ref: 'stocks'}
})









const ProjectModel = mongoose.model("farmer-projects", projectSchema)
const ProjectExpenseModel = mongoose.model("farmer-project-expenses", expenseSchema)
const ProjectSalesModel = mongoose.model("farmer-project-sales", salesSchema)

// ========================================================= Trader ==========================================

const OfferModel = mongoose.model("offers", offerSchema)
const OrderModel = mongoose.model("orders", orderSchema)
const TransportModel = mongoose.model("transports", transportSchema)
const WholesalerTransportModel = mongoose.model("wholesaler-transports", wholesalerTransportSchema)
const StockModel = mongoose.model("stocks", stockSchema)

const WholesalerStockModel = mongoose.model("wholesaler-stocks", wholesalerStockSchema)
const TraderSalesModel = mongoose.model("trader-product-sales", traderSalesSchema)

const WholesalerOfferModel = mongoose.model("wholesaler-offers", wholesalerOfferSchema)

const WholesalerOrderModel = mongoose.model("wholesaler-orders", wholesalerOrderSchema)

export {WholesalerTransportModel, WholesalerStockModel, WholesalerOrderModel, ProjectModel, ProjectExpenseModel, ProjectSalesModel, OfferModel, OrderModel, TransportModel, StockModel, TraderSalesModel, WholesalerOfferModel};

