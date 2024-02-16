"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const users_1 = __importDefault(require("./routes/users"));
const auth_1 = __importDefault(require("./routes/auth"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
//automatically convert api request body into json format
app.use(express_1.default.json());
// tell express to use urlencoded middleware which is used to parse incoming requeest body in url-encoded format and make them availabe in 'req.body object of route hanclers 
app.use(express_1.default.urlencoded({ extended: true }));
// allowed origins that are allowed to access resources from the server and credential true means server allows credentials(cookies) to be sent cross-origin requests
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
// connection to mongodb
// we are assuring typescript that URl is definately a string and it allow us to pass it to mongoose
mongoose_1.default.connect(process.env.MONGODB_CONNECTION_STRING);
// .then(()=>{
//     console.log("Connected to database:",process.env.MONGODB_CONNECTION_STRING);
// })
//this is used to serve static files of frontend
// whenever search comes for these files express will search those search in this dir
//path.join() used to construct absultate path
app.use(express_1.default.static(path_1.default.join(__dirname, "../../frontend/dist")));
app.use("/api/users", users_1.default);
app.use("/api/auth", auth_1.default);
app.listen(3000, () => {
    console.log("server is running on localhost:3000");
});
