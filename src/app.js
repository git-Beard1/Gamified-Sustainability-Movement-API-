/*
    Name: Thiha Swan Htet
    Admin No: 2336671
    Class: DIT/FT/1B/08

    File Name: app.js

    Last Modified: 26/12/2023
*/

const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const mainRoutes = require("./routes/mainRoutes");
app.use("/", mainRoutes);

module.exports = app;
