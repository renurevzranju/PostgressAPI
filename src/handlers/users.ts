import express, { Response, Request } from "express";
import { User, UserStore } from "../models/user";
import jwt from "jsonwebtoken";

const store = new UserStore();
const token_secret = process.env.TOKEN_SECRET || "";

const index = async (_req: Request, res: Response) => {
  const users = await store.index();
  res.json(users);
};

const show = async (req: Request, res: Response) => {
  const user = await store.show(req.params.id);
  res.json(user);
};

const create = async (req: Request, res: Response) => {
  try {
    const user: User = {
      username: req.body.username,
      password: req.body.password,
    };

    const newUser = await store.create(user);
    let token = jwt.sign({ user: newUser }, token_secret);
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const user: User = {
      username: req.body.username,
      password: req.body.password,
    };

    const editUser = await store.update(user);
    res.json(editUser);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.body.id);
  res.json(deleted);
};

const verifyAuthToken = (req: Request, res: Response, next: () => void) => {
  try {
      const authorizationHeader = req.headers.authorization || "";
      const token = authorizationHeader.split(' ')[1]
      const decoded = jwt.verify(token, token_secret);

      next()
  } catch (error) {
      res.status(401)
  }
}

const user_routes = (app: express.Application) => {
  app.get("/users", index);
  app.get("/users/:id", show);
  app.post("/users", verifyAuthToken , create);
  app.put('/users/:id',verifyAuthToken , update);
  app.delete("/users/:id",verifyAuthToken , destroy);
};

export default user_routes;
