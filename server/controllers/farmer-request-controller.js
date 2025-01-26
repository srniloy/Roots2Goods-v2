import UserModel from "../models/userModel.js"
import bcrypt from 'bcrypt'
import { configDotenv } from "dotenv"
import jwt from 'jsonwebtoken'
import {OfferModel, OrderModel, ProjectExpenseModel, ProjectModel, ProjectSalesModel} from "../models/projectModel.js"
import fs from 'fs'
import { clearScreenDown } from "readline"

configDotenv()

const SaltRounds = parseInt(process.env.SaltRounds);
const TokenSecret = process.env.TokenSecret;

export const UpdateProfileInfo = async (req, res) => {
    const { _id, name, phone, address, nid, birth_date } = JSON.parse(req.body.user)

    if (req.file) {
        const { originalname, path, destination, filename } = req.file
        const parts = originalname.split('.')
        const ext = parts[parts.length - 1]
        const newPath = destination + originalname
        fs.renameSync(path, newPath)

        const result = await UserModel.findByIdAndUpdate(_id, { name, phone, address, nid, birth_date, img: newPath }, { new: true })
        if (!result) {
            console.log(error);
            return res.json({ message: "Error occured during update the profile info" })
        }
        let token = jwt.sign(JSON.stringify(result), TokenSecret)
        return res.json({ message: "Successfully updated", resData: { user_type: result.type, token } })
    }
    const result = await UserModel.findByIdAndUpdate(_id, { name, phone, address, nid, birth_date }, { new: true })
    if (!result) {
        console.log(error);
        return res.json({ message: "Error occured during update the profile info" })
    }
    let token = jwt.sign(JSON.stringify(result), TokenSecret)
    return res.json({ message: "Successfully updated", resData: { user_type: result.type, token } })
}

export const GetProjects = async (req, res) => {
    try {
        // const existance = await UserModel.findOne({name: userModel.phone})
        console.log(req.body);
        const { user_id, status } = req.body
        console.log(user_id);
        const projects = await ProjectModel.find({ created_by: user_id, status })
        console.log(projects);
        // const projects = await ProjectModel.find({created_by: user_id})
        // console.log(projects);
        return res.json({ message: "Account Create Successfully", resData: { projects } })

    } catch (error) {
        res.status(500).json({ error: "internal server error" })
    }
}

export const CreateNewProject = async (req, res) => {
    try {
        const { title, product_name, seedling, land_size, start_time, created_by } = JSON.parse(req.body.project);
        if (req.file) {
            const { originalname, path, destination, filename } = req.file
            const parts = originalname.split('.')
            const ext = parts[parts.length - 1]
            const newPath = destination + originalname
            fs.renameSync(path, newPath)    
            const projectModel = new ProjectModel({ title, product_name, seedling, land: land_size, start_time, img: newPath, status: 'Running', cover_img: '', created_by })
            await projectModel.save()
            return res.json({ message: "Account Create Successfully", resData: projectModel })
        }
        const projectModel = new ProjectModel({ title, product_name, seedling, land: land_size, start_time, status: 'Running', cover_img: '', created_by })
        await projectModel.save()
        return res.json({ message: "Account Create Successfully", resData: projectModel })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal server error" })
    }
}

// export const LoginHandle = async (req, res) => {
//     try {
//         const userData = req.body
//         console.log(userData)
//         const user = await UserModel.findOne({ phone: userData.phone })
//         console.log(user)
//         if (!user) {
//             return res.status(400).json({ message: "User doesn't exist with this phone number", resData: undefined })
//         }

//         if (bcrypt.compare(userData.password, user.password)) {
//             let token = jwt.sign(JSON.stringify(user), TokenSecret)
//             console.log(token)
//             res.status(200).json({ message: 'Successfully logged in', resData: { token, user_type: user.type } })
//         } else {
//             return res.status(400).json({ message: "Password doesn't match", resData: undefined })
//         }
//         // res.json({message: 'ok'})
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: "internal server error" })
//     }
// }




export const GetProjectDetails = async (req, res) => {
    try {
        // const existance = await UserModel.findOne({name: userModel.phone})
        const { project_id } = req.body
        console.log(project_id);
        const project = await ProjectModel.findOne({ _id: project_id }).populate("created_by");
        console.log(project);
        
        // // const projects = await ProjectModel.find({created_by: user_id})
        // // console.log(projects);
        return res.json({ message: "Account Create Successfully", resData: { projectDetails: project, userInfo:project.created_by } })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal server error" })
    }
}


export const DeleteProject = async (req, res) => {
    try {
        // const existance = await UserModel.findOne({name: userModel.phone})
        console.log(req.body);
        const { project_id } = req.body
        const ack = await ProjectModel.deleteOne({ _id: project_id })
        console.log(ack);
        if(!ack){
            return res.status(400).json({ message: "Failed to deleted Project", resData: undefined })
        }
        // const projects = await ProjectModel.find({created_by: user_id})
        // console.log(projects);
        return res.json({ message: "Project deleted Successfully", resData: undefined })

    } catch (error) {
        res.status(500).json({ error: "internal server error" })
    }
}



export const UpdateProjectInfo = async (req, res) => {
    try {
        const { _id, title, product_name, seedling, land, start_time, status } = JSON.parse(req.body.project);
        if (req.file) {
            const { originalname, path, destination, filename } = req.file
            console.log(originalname);
            const parts = originalname.split('.')
            const ext = parts[parts.length - 1]
            const newPath = destination + originalname
            fs.renameSync(path, newPath)
            const ack = await ProjectModel.findOneAndUpdate({_id: _id}, {title, product_name, seedling, land, start_time, cover_img: newPath, status}, { new: true })
            if(!ack){
                return res.status(400).json({message: "Error Occured"})
            }
            return res.json({ message: "Project Updated Successfully", resData: ack })
        }
        const ack = await ProjectModel.findOneAndUpdate({_id: _id}, {title, product_name, seedling, land, start_time, status}, { new: true })
        if(!ack){
            return res.status(400).json({message: "Error Occured"})
        }
        return res.json({ message: "Project Updated Successfully", resData: ack })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal server error" })
    }
}


export const AddProjectExpense = async (req, res) => {
    try {
        const { sector, unit, cost, date,project_id } = req.body
        const expenseModel = new ProjectExpenseModel({sector, unit, cost, date, project_id})
        await expenseModel.save()
        return res.json({ message: "Expense added Successfully", resData: {} })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal server error" })
    }
}


export const GetProjectExpenses = async (req, res) => {
    try {
        // const existance = await UserModel.findOne({name: userModel.phone})
        const { project_id } = req.body
        console.log(project_id);
        const expenses = await ProjectExpenseModel.find({ project_id: project_id || '' });
        console.log(expenses);
        
        // // const projects = await ProjectModel.find({created_by: user_id})
        // // console.log(projects);
        return res.json({ message: "Done Successfully", resData: expenses })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal server error" })
    }
}


export const DeleteExpense = async (req, res) => {
    try {
        // const existance = await UserModel.findOne({name: userModel.phone})
        console.log(req.body);
        const { expense_id } = req.body
        const ack = await ProjectExpenseModel.deleteOne({ _id: expense_id })
        console.log(ack);
        if(!ack){
            return res.status(400).json({ message: "Failed to deleted expense", resData: undefined })
        }
        // const projects = await ProjectModel.find({created_by: user_id})
        // console.log(projects);
        return res.json({ message: "Expense deleted Successfully", resData: undefined })
    } catch (error) {
        res.status(500).json({ error: "internal server error" })
    }
}

export const UpdateExpense = async (req, res) => {
    try {
        // const existance = await UserModel.findOne({name: userModel.phone})
        console.log(req.body);
        const { _id, sector, unit, cost, date } = req.body
        const ack = await ProjectExpenseModel.findOneAndUpdate({ _id: _id }, {sector, unit, cost, date})
        console.log(ack);
        if(!ack){
            return res.status(400).json({ message: "Failed to update expense", resData: undefined })
        }
        // const projects = await ProjectModel.find({created_by: user_id})
        // console.log(projects);
        return res.json({ message: "Expense updated Successfully", resData: undefined })
    } catch (error) {
        res.status(500).json({ error: "internal server error" })
    }
}


// ================================================== Project Sales ==================================================



export const AddProjectSales = async (req, res) => {
    try {
        const { quantity, price, collection_date, status, project_id } = req.body
        const salesModel = new ProjectSalesModel({quantity, price, amount: parseInt(quantity*price), collection_date, status, project_id})
        await salesModel.save()
        return res.json({ message: "Sales added Successfully", resData: salesModel })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal server error" })
    }
}


export const GetProjectSales = async (req, res) => {
    try {
        // const existance = await UserModel.findOne({name: userModel.phone})
        const { project_id } = req.body
        console.log(project_id);
        const sales = await ProjectSalesModel.find({ project_id: project_id || '' });
        const updatedSales = await Promise.all(
            sales.map(async (sale) => {
                const offers = await OfferModel.find({ sales_id: sale._id, status: 'Pending' });
        
                const saleObj = sale.toObject();
                saleObj['total_offers'] = offers.length;
        
                return saleObj;
            })
        );
        
        // // const projects = await ProjectModel.find({created_by: user_id})
        // // console.log(projects);
        return res.json({ message: "Done Successfully", resData: updatedSales })

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
        const ack = await ProjectSalesModel.deleteOne({ _id: sales_id })
        const Offers_Ack = await OfferModel.deleteMany({ sales_id: sales_id })
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

export const UpdateSales = async (req, res) => {
    try {
        // const existance = await UserModel.findOne({name: userModel.phone})
        console.log(req.body);
        const { _id, quantity, price, amount, collection_date, status } = req.body
        const ack = await ProjectSalesModel.findOneAndUpdate({ _id: _id }, {quantity, price, amount, collection_date, status})
        console.log(ack);
        if(!ack){
            return res.status(400).json({ message: "Failed to update sale", resData: undefined })
        }
        // const projects = await ProjectModel.find({created_by: user_id})
        // console.log(projects);
        return res.json({ message: "Sale updated Successfully", resData: undefined })
    } catch (error) {
        res.status(500).json({ error: "internal server error" })
    }
}


// ================================================================ Offers ============================================================



export const GetOffersList = async (req, res) => {
    try {
        const {sales_id} = req.body
        const offers = await OfferModel.find({sales_id: sales_id, status: 'Pending'})
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


export const UpdateStatusOnOfferAcceptance = async (req, res) => {
    try {
        const {offer_id} = req.body
        const offer = await OfferModel.findOneAndUpdate({_id: offer_id}, {status: 'Accepted'}, { new: true })

        const sales = await ProjectSalesModel.findOneAndUpdate({_id: offer.sales_id}, {status: 'Processing'}, { new: true })

        return res.json({ message: "Operation Success", resData: {} })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal server error" })
    }
}

export const GetAcceptedOffersList = async (req, res) => {
    try {
        const {project_id} = req.body
        const offers = await OfferModel.find({project_id: project_id, status: 'Accepted'})
        .populate({
            path: 'offered_by',
            select: 'name'
        })
        .populate({
            path: 'project_id',
            select: 'product_name'
        })
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
        const offer = await OfferModel.findOneAndUpdate({_id: offer_id}, {status: 'Cancelled'}, { new: true })

        await ProjectSalesModel.findOneAndUpdate({_id: offer.sales_id}, {status: 'Pending'}, { new: true })

        return res.json({ message: "Operation Success", resData: {} })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal server error" })
    }
}




export const GetTransactions = async (req, res) => {
    try {
        const {user_id} = req.body
        const offers = await OrderModel.find({seller_id: user_id})
        .populate(['buyer_id', 'sales_id', 'product_id', 'offer_id']).sort({createdAt: -1})
          console.log(offers);
        // const projects = await ProjectModel.find({created_by: user_id})
        // console.log(projects);
        return res.json({ message: "Operation Success", resData: offers })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal server error" })
    }
}