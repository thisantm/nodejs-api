import mongoose from "mongoose";

mongoose.connect(""); // put connection string inside ""

let db = mongoose.connection;

export default db;