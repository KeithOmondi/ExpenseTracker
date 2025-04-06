import {
  LuLayoutDashboard,
  LuCoins,
  LuWalletMinimal,
  LuLogOut
} from "react-icons/lu";

export const SIDE_MENU_DATA = [
  {
      id: "01",
      label: "Dashboard",
      icon: LuLayoutDashboard,
      path: "/dashboard"
  },
  {
      id: "02",
      label: "Income",
      icon: LuWalletMinimal,
      path: "/income"
  },
  {
      id: "03",
      label: "Expense",
      icon: LuCoins,
      path: "/expense" // Fixed path
  },
  {
      id: "04",
      label: "Logout", // Capitalized
      icon: LuLogOut,
      path: "/logout"
  },
];
