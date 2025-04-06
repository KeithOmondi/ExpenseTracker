const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { Types } = require("mongoose");

// Get Dashboard Data
exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;

    // Define date ranges
    const now = new Date();
    const last60Days = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);
    const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Convert userId to ObjectId
    const userObjectId = new Types.ObjectId(String(userId));

    // Aggregate total income
    const incomeResult = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    // Aggregate total expense
    const expenseResult = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const totalIncome = incomeResult.length ? incomeResult[0].total : 0;
    const totalExpense = expenseResult.length ? expenseResult[0].total : 0;

    // Income in the last 60 days
    const recentIncome = await Income.find({ userId, date: { $gte: last60Days } });
    const incomeLast60Days = recentIncome.reduce((sum, txn) => sum + txn.amount, 0);

    // Expense in the last 30 days
    const recentExpense = await Expense.find({ userId, date: { $gte: last30Days } });
    const expenseLast30Days = recentExpense.reduce((sum, txn) => sum + txn.amount, 0);

    // Last 5 income transactions
    const lastIncome = await Income.find({ userId })
      .sort({ date: -1 })
      .limit(5)
      .select("_id amount date");

    // Last 5 expense transactions
    const lastExpense = await Expense.find({ userId })
      .sort({ date: -1 })
      .limit(5)
      .select("_id amount date");

    // Merge and sort all recent transactions
    const lastTransactions = [
      ...lastIncome.map(txn => ({ ...txn.toObject(), type: "income" })),
      ...lastExpense.map(txn => ({ ...txn.toObject(), type: "expense" })),
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    // Send response
    res.status(200).json({
      totalIncome,
      totalExpense,
      incomeLast60Days,
      expenseLast30Days,
      lastTransactions,
    });

  } catch (error) {
    console.error("Error fetching dashboard data:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
