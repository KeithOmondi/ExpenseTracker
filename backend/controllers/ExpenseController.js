const Expense = require("../models/Expense");
const excelJS = require("exceljs");

// Add Expense
exports.addExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, category, source, amount, date } = req.body;

    // Validation: Check missing fields
    if (!source || !amount || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate amount
    if (isNaN(amount) || amount <= 0) {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number" });
    }

    const newExpense = new Expense({
      userId,
      icon,
      source,
      category, // ✅ Fixed typo
      amount,
      date: new Date(date),
    });

    await newExpense.save();
    res.status(200).json(newExpense);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get all Expenses
exports.getAllExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });
    res.json({ expense }); // ✅ Fixed incorrect variable name
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Delete Expense
exports.deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const expense = await Expense.findById(id);

    if (!expense) {
      // ✅ Fixed incorrect variable name
      return res.status(404).json({ message: "Expense record not found" });
    }

    // Ensure user can only delete their own expense
    if (expense.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this expense record" });
    }

    await expense.deleteOne();
    res.status(200).json({ message: "Expense record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Download expense as Excel
exports.downloadExpenseExcel = async (req, res) => {
  const userId = req.user.id;

  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });

    if (!expense.length) {
      return res.status(404).json({ message: "No expense records found" }); // ✅ Fixed incorrect message
    }

    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet("Expense Records"); // ✅ Fixed worksheet name

    worksheet.columns = [
      { header: "ID", key: "_id", width: 30 },
      { header: "Source", key: "source", width: 20 },
      { header: "Category", key: "category", width: 20 }, // ✅ Added missing column
      { header: "Amount", key: "amount", width: 15 },
      { header: "Date", key: "date", width: 20 },
    ];

    expense.forEach((exp) => {
      worksheet.addRow(exp);
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=expenses.xlsx"); // ✅ Fixed filename

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
