if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}
//import express
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const bodypraser = require("body-parser");
//routes varibles
const indexRouter = require("./routes/index");
const authorsRouter = require("./routes/authors");

app.use(expressLayouts);
app.use(express.static("public"));
app.use(bodypraser.urlencoded({ limit: "10mb", extended: false }));
app.set("view engine", "ejs");
app.set("layout", "layouts/layout");
app.set("views", __dirname + "/views");

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to db"));

//routes
app.use("/", indexRouter);
app.use("/authors", authorsRouter);

app.listen(process.env.PORT || 3000);
