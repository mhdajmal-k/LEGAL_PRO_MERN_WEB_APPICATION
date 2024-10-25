import { Router } from "express";
import LawyerSlotInteractor from "../../../../application/useCases/lawyer/lawyerSlotUseCase";
import LawyerSlotController from "../../../../interFace_adapters/controlers/lawyer/lawyerSlotController";
import LawyerSlotRepository from "../../../../interFace_adapters/repositories/lawyerRepositories/lawyerSlotRepository";
import { authorization } from "../../../middleware/authMilddlewere";
export const slotRoute = Router();
const repository = new LawyerSlotRepository();
const interactor = new LawyerSlotInteractor(repository);
const lawyerSlotController = new LawyerSlotController(interactor);

slotRoute.post(
  "/",
  authorization("lawyer"),
  lawyerSlotController.CreateSlotController.bind(lawyerSlotController)
);
slotRoute.get(
  "/:id",
  authorization("lawyer"),
  lawyerSlotController.fetchLawyerSlots.bind(lawyerSlotController)
);
slotRoute.put(
  "/:slotId",
  authorization("lawyer"),
  lawyerSlotController.updateSlots.bind(lawyerSlotController)
);
slotRoute.delete(
  "/:slotId",
  authorization("lawyer"),
  lawyerSlotController.deleteSlot.bind(lawyerSlotController)
);
