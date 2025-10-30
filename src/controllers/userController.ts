import { Request, Response } from "express";
import { User } from "../models/users";

export async function addUser(req: Request, res: Response) {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email required" });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "Email already exists" });

    const user = new User({ name, email });
    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add user" });
  }
}

export async function getUsers(req: Request, res: Response) {
  const users = await User.find();
  res.json(users);
}
