import express, { Response, Request } from "express";
import { Weapon, MythicalWeaponStore } from "../models/mythical_weapon";

const store = new MythicalWeaponStore();

const index = async (_req: Request, res: Response) => {
  const weapons = await store.index();
  res.json(weapons);
};

const show = async (req: Request, res: Response) => {
  const weapon = await store.show(req.params.id);
  res.json(weapon);
};

const create = async (req: Request, res: Response) => {
  try {
    const weapon : Weapon = {
      name: req.body.name,
      type: req.body.type,
      weight: req.body.weight
    };

    const newWeapon = await store.create(weapon);
    res.json(newWeapon);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.body.id);
  res.json(deleted);
};

const mythical_weapon_routes = (app: express.Application) => {
  app.get("/weapons", index);
  app.get("/weapons/:id", show);
  app.post("/weapons", create);
  app.delete("/weapons/:id", destroy);
};

export default mythical_weapon_routes;
