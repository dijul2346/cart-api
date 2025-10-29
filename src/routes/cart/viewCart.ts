import { Request, Response } from "express";

export async function viewCart(req: Request, res: Response) {
  try {
    const cart = (req as any).cart;
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error });
  }
}
