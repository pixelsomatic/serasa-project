import { Request, Response, Router } from "express";
import * as ruralProducersController from "../controllers/ruralProducersController";

const router = Router();

router.post("/", ruralProducersController.create);
router.get("/", ruralProducersController.readAll);
router.get("/:id", ruralProducersController.readById);
router.put("/:id", ruralProducersController.update);
router.delete("/:id", ruralProducersController.deleteById);

export default router;
