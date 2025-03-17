import express from "express";
import mongoose from "mongoose";
import Product from "../models/product.model.js";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "../config/db.js";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controller/product.controller.js";


const router=express.Router();


router.get("/",getProducts);

router.post("/",createProduct);

router.put("/:id", updateProduct)

router.delete("/:id",deleteProduct )

export default router;
