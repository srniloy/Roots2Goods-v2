import { Router } from "express";
import multer from 'multer';
import { GetAvailableProducts, GetProductDetails } from "../controllers/wholesaler-request-controller.js";


const wholesalerRouter = Router()

const uploadMiddleware = multer({ dest: 'uploads/' })


wholesalerRouter.get('/get-available-products', GetAvailableProducts)

wholesalerRouter.post('/get-product-details', GetProductDetails)

// traderRouter.post('/add-new-offer', AddNewOffer)

// traderRouter.post('/get-offers-list', GetOffersList)

// traderRouter.post('/offer-cancellation', OfferCancellation)

// traderRouter.post('/add-orders', AddOrders)

// traderRouter.post('/get-order-info', GetOrderInfo)

// traderRouter.post('/confirm-order', ConfirmOrder)

// traderRouter.post('/get-stocked-products', GetStockedProducts)

// traderRouter.post('/get-stocked-slots', GetStockedSlots)


// traderRouter.post('/add-product-sales', AddNewProductSale)

// traderRouter.post('/get-product-sales', GetProductSales)

// traderRouter.post('/delete-sales', DeleteSales)


export default wholesalerRouter
