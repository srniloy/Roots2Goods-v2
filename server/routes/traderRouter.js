import { Router } from "express";
import multer from 'multer';
import { AddNewOffer, AddNewProductSale, AddOrders, AddWholesalerOrders, ConfirmOrder, ConfirmWholesalerOrder, DeleteSales, GetAvailableProducts, GetFilteredAvailableData, GetFilterSelestionData, GetOffersList, GetOrderInfo, GetProductDetails, GetProductSales, GetSalesOffersList, GetStockedProducts, GetStockedSlots, GetTransactions, GetWholesalerOffersList, GetWholeSalerOrderInfo, OfferCancellation } from "../controllers/trader-request-controller.js";


const traderRouter = Router()

const uploadMiddleware = multer({ dest: 'uploads/' })


traderRouter.get('/get-available-products', GetAvailableProducts)

traderRouter.post('/get-product-details', GetProductDetails)

traderRouter.post('/add-new-offer', AddNewOffer)

traderRouter.post('/get-offers-list', GetOffersList)

traderRouter.post('/get-wholesaler-offers-list', GetWholesalerOffersList)

traderRouter.post('/offer-cancellation', OfferCancellation)

traderRouter.post('/add-orders', AddOrders)

traderRouter.post('/add-wholesaler-orders', AddWholesalerOrders)

traderRouter.post('/get-order-info', GetOrderInfo)

traderRouter.post('/get-wholesaler-order-info', GetWholeSalerOrderInfo)

traderRouter.post('/confirm-order', ConfirmOrder)

traderRouter.post('/confirm-wholesaler-order', ConfirmWholesalerOrder)

traderRouter.post('/get-stocked-products', GetStockedProducts)

traderRouter.post('/get-stocked-slots', GetStockedSlots)


traderRouter.post('/add-product-sales', AddNewProductSale)

traderRouter.post('/get-product-sales', GetProductSales)

traderRouter.post('/delete-sales', DeleteSales)

traderRouter.post('/get-sales-offers-list', GetSalesOffersList)


// ===================================== Transactions =========================================


traderRouter.post('/get-transactions', GetTransactions)

traderRouter.get('/get-filter-selection-data', GetFilterSelestionData)

traderRouter.post('/get-filtered-available-products', GetFilteredAvailableData)




export default traderRouter
