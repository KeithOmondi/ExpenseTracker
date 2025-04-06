import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useUserAuth } from "../../hooks/useUserAuth";
import InfoCard from "../../components/Cards/InfoCard";
import { LuCoins, LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import { addThousandSeparator } from "../../utils/helper";
import RecentTransactions from "../../components/Dashboard/RecentTransactions";
import FinanceOverView from "../../components/Dashboard/FinanceOverView";
import ExpenseTransactions from "../../components/Dashboard/ExpenseTransactions";
import Last30DaysExpenses from "../../components/Dashboard/Last30DaysExpenses";

const Home = () => {
  useUserAuth(); // Auth check
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Failed to fetch dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const balance = dashboardData?.totalBalance || 0;
  const income = dashboardData?.totalIncome || 0;
  const expense = dashboardData?.totalExpense || 0;

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-8 px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Welcome back!</h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading dashboard data...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <InfoCard
              icon={<IoMdCard size={24} />}
              label="Total Balance"
              value={addThousandSeparator(balance)}
              color="bg-primary"
            />
            <InfoCard
              icon={<LuWalletMinimal size={24} />}
              label="Total Income"
              value={addThousandSeparator(income)}
              color="bg-orange-500"
            />
            <InfoCard
              icon={<LuCoins size={24} />}
              label="Total Expense"
              value={addThousandSeparator(expense)}
              color="bg-red-500"
            />
          </div>
        )}
      </div>

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 px-4">
          <RecentTransactions
            transaction={dashboardData?.recentTransactions}
            onSeeMore={() => navigate("/expense")}
          />

          <FinanceOverView
            totalBalance={balance}
            totalIncome={income}
            totalExpense={expense}
          />

          <ExpenseTransactions
            transactions={dashboardData?.last30DaysExpenses?.transactions}
            onSeeMore={() => navigate("/expense")}
          />

          <Last30DaysExpenses
            data={dashboardData?.last30DaysExpenses?.transactions || []}
          />
        </div>
      )}
    </DashboardLayout>
  );
};

export default Home;
