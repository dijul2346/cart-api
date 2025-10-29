import { Request, Response } from "express";

export async function updateCart(req: Request, res: Response) {
  try {
    const { prod_id, quantity } = req.body;
    const product = (req as any).product;
    const cart = (req as any).cart;
    if (quantity < 1)
      return res.status(400).json({ message: "Quantity <1" });

    const item = cart.items.find((i: { productId: string; quantity: number }) => i.productId === prod_id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    const diff = quantity - item.quantity;

    if (diff > 0 && (product.stock ?? 0) < diff)
      return res.status(400).json({ message: "required stock not available" });
    item.quantity = quantity;
    product.stock = (product.stock ?? 0) - diff;

    await product.save();
    await cart.save();
    res.status(200).json({ message: "Cart updated", cart });
  } catch (error) {
    res.status(500).json({ message: "Error updating cart", error });
  }
}
