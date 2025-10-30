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

export async function viewCart(req: Request, res: Response) {
  try {
    const cart = (req as any).cart;
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error });
  }
}
