
import { Request, Response, NextFunction } from "express";
import { Product } from "../models/Product";
import Cart from "../models/Cart";


export async function validateProductId(req: Request, res: Response, next: NextFunction) {
  const prod_id = req.body.prod_id || req.body.productId || req.params.prod_id || req.params.productId;
  if (!prod_id) {
    return res.status(400).json({ message: "Missing product id" });
  }
  const product = await Product.findOne({ prod_id });
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  // Attach product to request for downstream use
  (req as any).product = product;
  next();
}


export async function validateUserId(req: Request, res: Response, next: NextFunction) {
  const userId = (req.body && req.body.userId) || (req.params && req.params.userId);
  if (!userId) {
    return res.status(400).json({ message: "Missing user id" });
  }
  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }
  // Attach cart to request for downstream use
  (req as any).cart = cart;
  next();
}
