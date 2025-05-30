const Income = require("../models/Income");
const excelJS = require("exceljs");

// Add income
exports.addIncome = async (req, res) => {
  const userId = req.user?.id;

  try {
    const { icon, source, amount, date } = req.body;

    // Validation
    if (!source?.trim() || !amount || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: "Amount must be a positive number" });
    }

    const newIncome = new Income({
      userId,
      icon,
      source: source.trim(),
      amount,
      date: new Date(date),
    });

    await newIncome.save();

    return res.status(200).json(newIncome);
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get all income
exports.getAllIncome = async (req, res) => {
  const userId = req.user?.id;

  try {
    const income = await Income.find({ userId }).sort({ date: -1 }).lean();
    return res.status(200).json({ income });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Delete income
exports.deleteIncome = async (req, res) => {
  const { id } = req.params;

  try {
    const income = await Income.findById(id);

    if (!income) {
      return res.status(404).json({ message: "Income record not found" });
    }

    if (income.userId.toString() !== req.user?.id) {
      return res.status(403).json({ message: "Unauthorized to delete this income record" });
    }

    await income.deleteOne();

    return res.status(200).json({ message: "Income record deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Download income as Excel
exports.downloadIncomeExcel = async (req, res) => {
  const userId = req.user?.id;

  try {
    const income = await Income.find({ userId }).sort({ date: -1 }).lean();

    if (!income.length) {
      return res.status(404).json({ message: "No income records found" });
    }

    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet("Income Records");

    worksheet.columns = [
      { header: "ID", key: "_id", width: 30 },
      { header: "Source", key: "source", width: 25 },
      { header: "Amount", key: "amount", width: 15 },
      { header: "Date", key: "date", width: 20 },
    ];

    income.forEach((inc) => {
      worksheet.addRow({
        _id: inc._id,
        source: inc.source,
        amount: inc.amount,
        date: new Date(inc.date).toISOString().split("T")[0], // Format date
      });
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=income.xlsx");

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};
