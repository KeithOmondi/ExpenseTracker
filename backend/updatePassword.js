const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = require("./models/User");

const updatePassword = async () => {
  await mongoose.connect("mongodb+srv://kdomondi1:omondi.@cluster0.tqho28n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    
  });

  const password = "dennis";
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  await User.updateOne({ email: "denniskeith62@gmail.com" }, { password: hashedPassword });

  console.log("Password updated successfully!");
  mongoose.connection.close();
};

updatePassword();
