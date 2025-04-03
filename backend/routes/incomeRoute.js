const express = require("express")

const{
    addIncome,
    getAllIncome,
    deleteIncome,
    downloadIncomeExcel
} = require("../controllers/incomeController")
const { protect } = require("../middleware/authMiddleware")

const router =  express.Router();

router.post("/add", protect, addIncome)
router.post("/get", protect, getAllIncome)
router.post("/download", protect, downloadIncomeExcel)
router.delete("/:id", deleteIncome)

module.exports = router