const express = require("express");
const app = express();
const expressSession = require("express-session");
const passport = require("passport"); // Require Passport module
const { connectMongoose, User } = require("./database.js");
const ejs = require("ejs");
const { initializingPassport } = require("./passportConfig.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressSession({ secret: "secret", resave: false, saveUninitialized: false }));
app.use(express.static("public"));
connectMongoose();

initializingPassport(passport); // Initialize Passport

app.use(passport.initialize()); // Use Passport middleware
app.use(passport.session()); // Use Passport session middleware

app.set("view engine", "ejs");
app.listen(8008, () => {
    console.log("listening on port 8008");
});

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/register", async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (user) return res.status(400).send("User already exists");
    const newUser = await User.create(req.body);
    res.status(201).send(newUser);
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/login", passport.authenticate("local",{failureRedirect:"/"}), async (req, res) => {
    // Handle successful login
});
