import { StockModel, TraderSalesModel } from "../models/projectModel.js";

export const calculateProfitWithStockAndSales = async (user_id, productList) => {
  try {
    // Step 1: Fetch relevant stocks
    const stocks = await StockModel.find({
      owner: user_id,
      product_name: { $in: productList }
    }).select("_id product_name price quantity transport_cost");

    if (!stocks.length) return [];

    const stockIds = stocks.map((stock) => stock._id);
    const productNameMap = stocks.reduce((acc, stock) => {
      acc[stock._id] = stock.product_name;
      return acc;
    }, {});

    // Step 2: Fetch trader sales with status "Sold Out"
    const traderSales = await TraderSalesModel.find({
      stock_id: { $in: stockIds },
      status: "Sold Out"
    }).select("stock_id quantity price amount");

    // Step 3: Calculate total profit per product
    const productProfits = {};

    // Initialize product profits
    productList.forEach((product) => {
      productProfits[product] = 0;
    });

    // Calculate sales amounts grouped by stock_id
    const salesMap = traderSales.reduce((acc, sale) => {
      acc[sale.stock_id] = (acc[sale.stock_id] || 0) + sale.amount;
      return acc;
    }, {});

    // Calculate total cost per stock (considering both price and transport_cost)
    const costMap = stocks.reduce((acc, stock) => {
      const totalCost = (stock.price * stock.quantity) + stock.transport_cost;
      acc[stock._id] = totalCost;
      return acc;
    }, {});

    // Compute profit for each stock and group by product_name
    for (const stock of stocks) {
      const stockId = stock._id;
      const productName = productNameMap[stockId];
      const totalSales = salesMap[stockId] || 0;
      const totalCost = costMap[stockId] || 0;

      const profit = totalSales - totalCost;
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
