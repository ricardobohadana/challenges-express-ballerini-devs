import { Request, Response, Router } from "express";
import DevController from "../Controllers/devController";

const devRouter = Router();

devRouter
  .route("/dev")
  // Create
  .post(DevController.post)
  // Read
  .get(DevController.get)
  // Update
  .put(DevController.put)
  // Delete
  .delete(DevController.delete);

export default devRouter;
