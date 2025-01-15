import { Router } from "express";
import { AddProjectExpense, AddProjectSales, CreateNewProject, DeleteExpense, DeleteProject, DeleteSales, GetAcceptedOffersList, GetOffersList, GetProjectDetails, GetProjectExpenses, GetProjects, GetProjectSales, OfferCancellation, UpdateExpense, UpdateProfileInfo, UpdateProjectInfo, UpdateSales, UpdateStatusOnOfferAcceptance } from "../controllers/farmer-request-controller.js";
import multer from 'multer';


const farmerRouter = Router()

const uploadMiddleware = multer({ dest: 'uploads/' })
const projectMiddleware = multer({ dest: 'uploads/' })
const projectCoverImgMiddleware = multer({ dest: 'uploads/' })

farmerRouter.post("/update-profile-info", uploadMiddleware.single('img'), UpdateProfileInfo)

// farmerRouter.post('/signup', CreateAccount)

farmerRouter.post('/create-new-project', projectMiddleware.single('img'), CreateNewProject)

farmerRouter.post('/get-projects', GetProjects)

farmerRouter.post('/delete-project', DeleteProject)

farmerRouter.post('/get-projects-details', GetProjectDetails)

farmerRouter.post("/update-project-info", projectCoverImgMiddleware.single('cover_img'), UpdateProjectInfo)

// ===================================== Expenses =========================================

farmerRouter.post('/add-project-expense', AddProjectExpense)

farmerRouter.post('/get-projects-expenses', GetProjectExpenses)

farmerRouter.post('/delete-expense', DeleteExpense)

farmerRouter.post('/update-project-expense', UpdateExpense)


// ===================================== Sales =========================================

farmerRouter.post('/add-project-sales', AddProjectSales)

farmerRouter.post('/get-projects-sales', GetProjectSales)

farmerRouter.post('/delete-sales', DeleteSales)

farmerRouter.post('/update-project-sales', UpdateSales)

// ===================================== offers =========================================

farmerRouter.post('/get-offers-list', GetOffersList)

farmerRouter.post('/update-status-on-offer-acceptance', UpdateStatusOnOfferAcceptance)

farmerRouter.post('/get-accepted_offers-list', GetAcceptedOffersList)

farmerRouter.post('/offer-cancellation', OfferCancellation)


export default farmerRouter