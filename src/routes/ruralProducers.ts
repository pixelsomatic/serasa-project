import { Request, Response, Router } from "express";
import * as ruralProducersController from "../controllers/ruralProducersController";
import {
  getTotalFarms,
  getTotalArea,
  getProducersByState,
  getCropsCount,
  getLandUse,
} from '../controllers/ruralProducersStatisticsController';

const router = Router();

router.post("/", ruralProducersController.create);
router.get("/", ruralProducersController.readAll);
router.get("/:id", ruralProducersController.readById);
router.put("/:id", ruralProducersController.update);
router.delete("/:id", ruralProducersController.deleteById);

router.get('/statistics/total-farms', getTotalFarms);
router.get('/statistics/total-area', getTotalArea);
router.get('/statistics/producers-by-state', getProducersByState);
router.get('/statistics/crops-count', getCropsCount);
router.get('/statistics/land-use', getLandUse);

export default router;
