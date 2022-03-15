import { Request, Response, Router } from "express";
import devController from "../Controllers/devController";

const devRouter = Router();

devRouter
  .route("/dev")
  // Create
  .post((request, response) => devController.post(request, response))
  // Read
  .get((request, response) => devController.get(request, response))
  // Update
  .put((request, response) => devController.put(request, response))
  // Delete
  .delete((request, response) => devController.delete(request, response));

export default devRouter;
