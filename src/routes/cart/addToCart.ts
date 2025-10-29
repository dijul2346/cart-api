import { Request, Response } from "express";

export async function addToCart(req: Request, res: Response) {
  try {
    const { prod_id, quantity = 1 } = req.body;
    const product = (req as any).product;
    const cart = (req as any).cart;

    if ((product.stock ?? 0) < quantity)
      return res.json({ message: "Insufficient stock" });

    const existingItem = cart.items.find((item: { productId: string }) => item.productId === prod_id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        productId: prod_id,
        name: product.name,
        price: product.price,
        quantity,
      });
    }

    product.stock = (product.stock ?? 0) - quantity;
    await product.save();
    await cart.save();

    res.json({ message: "Item added to cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Error adding to cart", error });
  }
}
