const express = require("express")

const{
    addExpense,
    getAllExpense,
    deleteExpense,
    downloadExpenseExcel
} = require("../controllers/ExpenseController")
const { protect } = require("../middleware/authMiddleware")

const router =  express.Router();

router.post("/add", protect, addExpense)
router.post("/get", protect, getAllExpense)
router.post("/download", protect, downloadExpenseExcel)
router.delete("/:id", deleteExpense)

module.exports = router