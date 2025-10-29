import { Request, Response } from "express";

export async function removeFromCart(req: Request, res: Response) {
  try {
    const { prod_id } = req.params;
    const product = (req as any).product;
    const cart = (req as any).cart;

    const index = cart.items.findIndex((item: { productId: string }) => item.productId === prod_id);
    if (index === -1)
      return res.status(404).json({ message: "Item not found" });

    const removedItem = cart.items[index];
    product.stock = (product.stock ?? 0) + (removedItem?.quantity ?? 0);

    cart.items.splice(index, 1);

    await product.save();
    await cart.save();

    res.status(200).json({ message: "Item removed from cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Error removing from cart", error });
  }
}
