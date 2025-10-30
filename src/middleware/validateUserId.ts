import { Request, Response, NextFunction } from "express";
import Cart from "../models/Cart";

export async function validateUserId(req: Request, res: Response, next: NextFunction) {
  const userId = (req.body && req.body.userId) || (req.params && req.params.userId);
  if (!userId) {
    return res.status(400).json({ message: "Missing user id" });
  }
  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    (req as any).cart = cart;
    next();
  } catch (err) {
    return res.status(500).json({ message: "Error validating user", error: err });
  }
}
