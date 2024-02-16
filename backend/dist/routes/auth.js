"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_validator_1 = require("express-validator");
const user_1 = __importDefault(require("../models/user"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
router.post("/login", [
    (0, express_validator_1.check)("email", "email is required").isEmail(),
    (0, express_validator_1.check)("password", "password is required").isLength({
        min: 1
    })
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 'message': errors.array() });
    }
    const { email, password } = req.body;
    try {
        const user = yield user_1.default.findOne({
            email: email,
        });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }
        const password_verify = yield bcryptjs_1.default.compare(password, user.password);
        if (!password_verify) {
            return res.status(400).json({ message: "Password does not match" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: '1d'
        });
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 86400000
        });
        res.status(200).json({ userId: user._id });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went Wrong"
        });
    }
}));
// verify-token is middleware which check http cookie send by front end
router.get('/validate-token', auth_1.default, (req, res) => {
    res.status(200).send({ userId: req.userId });
});
exports.default = router;
router.post('/logout', (req, res) => {
    res.cookie("auth_token", "", {
        expires: new Date(0)
    });
    res.send();
});
