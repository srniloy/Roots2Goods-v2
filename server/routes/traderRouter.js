import { Router } from "express";
import multer from 'multer';
import { AddNewOffer, AddOrders, ConfirmOrder, GetAvailableProducts, GetOffersList, GetOrderInfo, GetProductDetails, GetStockedProducts, GetStockedSlots, OfferCancellation } from "../controllers/trader-request-controller.js";


const traderRouter = Router()

const uploadMiddleware = multer({ dest: 'uploads/' })


traderRouter.get('/get-available-products', GetAvailableProducts)

traderRouter.post('/get-product-details', GetProductDetails)

traderRouter.post('/add-new-offer', AddNewOffer)

traderRouter.post('/get-offers-list', GetOffersList)

traderRouter.post('/offer-cancellation', OfferCancellation)

traderRouter.post('/add-orders', AddOrders)

traderRouter.post('/get-order-info', GetOrderInfo)

traderRouter.post('/confirm-order', ConfirmOrder)

traderRouter.post('/get-stocked-products', GetStockedProducts)

traderRouter.post('/get-stocked-slots', GetStockedSlots)

export default traderRouter
