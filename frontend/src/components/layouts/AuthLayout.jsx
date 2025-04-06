import React from "react";
import { LuTrendingUpDown } from "react-icons/lu";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* Left Section (Form) */}
      <div className="w-full md:w-[60vw] px-12 pt-8 pb-12">
        <h2 className="text-xl font-bold">Expense Tracker</h2>
        {children}
      </div>

      {/* Right Section (Image & Decorations) */}
      <div className="hidden md:flex w-[40vw] h-screen bg-violet-50 relative justify-center items-center overflow-hidden">
        {/* Decorative Elements */}
        <div className="w-48 h-48 rounded-[40px] bg-purple-600 absolute top-[-30px] left-[-20px]" />
        <div className="w-48 h-48 rounded-[40px] border-[20px] border-fuchsia-600 absolute top-[50px] right-[-20px]" />
        <div className="w-48 h-48 rounded-[40px] bg-purple-500 absolute bottom-[-30px] right-[-20px]" />

        <div className="grid grid-cols-1 z-20">
          <StatsInfoCard
            icon={<LuTrendingUpDown />}
            label="Track your income & Expenses"
            value="430,000"
            color="bg-primary"
          />
        </div>

        {/* Image */}
        <img
          src="https://cdn.dribbble.com/userupload/42691152/file/original-b6528d83a0942d7fc5d0e291e1819d18.png?crop=0x0-3201x2401&format=webp&resize=640x480&vertical=center"
          alt="dribbble"
          className="w-3/4 h-auto object-cover rounded-lg z-10"
        />
      </div>
    </div>
  );
};

export default AuthLayout;

const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex gap-6 bg-white p-4 rounded-xl shadow-md shadow-purple-600">
      <div className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}>
        {icon}
      </div>

      <div>
        <h6 className="font-semibold">{label}</h6>
        <span className="text-gray-600">{value}</span>
      </div>
    </div>
  );
};
