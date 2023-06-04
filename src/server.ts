import express, { Request, Response} from "express";
import bodyParser from "body-parser";
import mythical_weapon_routes from "./handlers/mythical_weapons";
import user_routes from "./handlers/users";

const app: express.Application = express();
const address: string = "0.0.0.:3000";

app.use(bodyParser.json());

app.get("/", function(req: Request, res: Response) {
    res.send("Hello world");
});

mythical_weapon_routes(app);
user_routes(app);

app.listen(3000, function() {
    console.log(`Starting app on: ${address}`);
});
