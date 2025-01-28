import { ProjectExpenseModel, ProjectModel, ProjectSalesModel } from "../models/projectModel.js";
import mongoose from "mongoose";

export const calculateProfitWithSeparateQueries = async (user_id, productList) => {
    try {
      // Step 1: Fetch relevant projects
      const projects = await ProjectModel.find({
        created_by: user_id,
        product_name: { $in: productList }
      }).select("_id product_name");
  
      if (!projects.length) return [];
  
      const projectIds = projects.map((project) => project._id);
      const productNameMap = projects.reduce((acc, project) => {
        acc[project._id] = project.product_name;
        return acc;
      }, {});
  
      // Step 2: Fetch sales with status "Sold Out"
      const sales = await ProjectSalesModel.find({
        project_id: { $in: projectIds },
        status: "Sold Out"
      }).select("project_id amount");
  
      // Step 3: Fetch all expenses for these projects
      const expenses = await ProjectExpenseModel.find({
        project_id: { $in: projectIds }
      }).select("project_id cost");
  
      // Step 4: Calculate total profit per product
      const productProfits = {};
  
      // Initialize product profits
      productList.forEach((product) => {
        productProfits[product] = 0;
      });
  
      // Calculate sales amounts grouped by project
      const salesMap = sales.reduce((acc, sale) => {
        acc[sale.project_id] = (acc[sale.project_id] || 0) + sale.amount;
        return acc;
      }, {});
  
      // Calculate total expenses grouped by project
      const expenseMap = expenses.reduce((acc, expense) => {
        acc[expense.project_id] = (acc[expense.project_id] || 0) + expense.cost;
        return acc;
      }, {});
  
      // Compute profit for each project and group by product_name
      for (const project of projects) {
        const projectId = project._id;
        const productName = productNameMap[projectId];
        const totalSales = salesMap[projectId] || 0;
        const totalExpenses = expenseMap[projectId] || 0;
  
        const profit = totalSales - totalExpenses;
        productProfits[productName] += profit;
      }
  
      // Convert result into an array
      return Object.entries(productProfits).map(([product_name, totalProfit]) => ({
        product_name,
        totalProfit
      }));
    } catch (error) {
      console.error("Error calculating profit:", error);
      throw error;
    }
  };
  

export const calculateProfit = async (user_id, productList) => {
    try {
      const profits = await ProjectModel.aggregate([
        // Step 1: Match projects by user_id and product_name
        {
          $match: {
            created_by: new mongoose.Types.ObjectId(user_id),
            product_name: { $in: productList }
          }
        },
        // Step 2: Lookup sales where status is "Sold Out"
        {
          $lookup: {
            from: "farmer-project-sales", // Collection name for ProjectSalesModel
            localField: "_id",
            foreignField: "project_id",
            as: "sales"
          }
        },
        {
          $unwind: "$sales" // Flatten the sales array
        },
        {
          $match: {
            "sales.status": "Sold Out"
          }
        },
        // Step 3: Lookup expenses for each project
        {
          $lookup: {
            from: "farmer-project-expenses", // Collection name for ProjectExpenseModel
            localField: "_id",
            foreignField: "project_id",
            as: "expenses"
          }
        },
        // Step 4: Calculate total expenses
        {
          $addFields: {
            totalExpenses: { $sum: "$expenses.cost" } // Sum expenses (empty array -> 0)
          }
        },
        // Step 5: Calculate profit for each project
        {
          $addFields: {
            profit: { $subtract: ["$sales.amount", "$totalExpenses"] } // Profit = Sales Amount - Total Expenses
          }
        },
        // Step 6: Group by product_name to calculate total profit for each product
        {
          $group: {
            _id: "$product_name",
            totalProfit: { $sum: "$profit" } // Sum profits for each product
          }
        },
        // Step 7: Project the result for readability
        {
          $project: {
            _id: 0,
            product_name: "$_id",
            totalProfit: 1
          }
        }
      ]);
  
      return profits; // Array of products with their total profits
    } catch (error) {
      console.error("Error calculating profit:", error);
      throw error;
    }
  };
  


  export const getExpensesAndSales = async (user_id, productList) => {
    try {
      console.log("getExpense func");
      console.log("User ID:", user_id);
      console.log("Product List:", productList);
  
      const result = await ProjectModel.aggregate([
        {
          $match: {
            created_by: new mongoose.Types.ObjectId(user_id), // Convert user_id to ObjectId
            product_name: { $in: productList } // Match product names
          }
        }
      ]);
  
      console.log("Result:", result);
      return result; // Returns the matched projects with their expenses and sales
    } catch (error) {
      console.error("Error fetching expenses and sales:", error);
      throw error;
    }
  };
  