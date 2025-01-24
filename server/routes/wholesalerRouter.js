import { Router } from "express";
import multer from 'multer';
import { AddNewOffer, ApproveOfferStatus, GetAvailableProducts, GetFilteredAvailableData, GetFilterSelestionData, GetOffersList, GetProductDetails, GetStockedProducts, GetStockedSlots, GetTransactions, UpdateStatusOnOfferAcceptance } from "../controllers/wholesaler-request-controller.js";


const wholesalerRouter = Router()

const uploadMiddleware = multer({ dest: 'uploads/' })


wholesalerRouter.get('/get-available-products', GetAvailableProducts)

wholesalerRouter.post('/get-product-details', GetProductDetails)

wholesalerRouter.post('/add-new-offer', AddNewOffer)

wholesalerRouter.post('/get-offers-list', GetOffersList)

wholesalerRouter.post('/update-status-on-offer-acceptance', UpdateStatusOnOfferAcceptance)

wholesalerRouter.post('/approve-offer', ApproveOfferStatus)

// traderRouter.post('/offer-cancellation', OfferCancellation)

// traderRouter.post('/add-orders', AddOrders)

// traderRouter.post('/get-order-info', GetOrderInfo)

// traderRouter.post('/confirm-order', ConfirmOrder)

wholesalerRouter.post('/get-stocked-products', GetStockedProducts)

wholesalerRouter.post('/get-stocked-slots', GetStockedSlots)


wholesalerRouter.post('/get-transactions', GetTransactions)


wholesalerRouter.get('/get-filter-selection-data', GetFilterSelestionData)

wholesalerRouter.post('/get-filtered-available-products', GetFilteredAvailableData)


// traderRouter.post('/add-product-sales', AddNewProductSale)

// traderRouter.post('/get-product-sales', GetProductSales)

// traderRouter.post('/delete-sales', DeleteSales)


export default wholesalerRouter
