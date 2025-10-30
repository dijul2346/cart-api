import { Request, Response, NextFunction } from "express";
import { Product } from "../models/Product";

export async function validateProductId(req: Request, res: Response, next: NextFunction) {
  const prod_id = (req.body && (req.body.prod_id || req.body.productId)) || (req.params && (req.params.prod_id || req.params.productId));
  if (!prod_id) {
    return res.status(400).json({ message: "Missing product id" });
  }
  try {
    const product = await Product.findOne({ prod_id });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    (req as any).product = product;
    next();
  } catch (err) {
    return res.status(500).json({ message: "Error validating product", error: err });
  }
}
