//endpoints
import { Router, Request, Response } from "express";
import UserService from "../services/user/user.services";
import AuthController from "../services/utils/auth.controller";
import AuthService from "../services/user/auth.services";
const router = Router();

router.post("/login", AuthController.login);

router.post("/register", async (req, res, next) => {
  try {
    const user = await UserService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/verify",
  AuthService.verifyToken,
  (req: Request, res: Response, next: Function) => {
    try {
      res.status(200).json({ message: "Token válido" });
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }
);

router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await UserService.getUserById(Number(id));
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
});
export { router };
