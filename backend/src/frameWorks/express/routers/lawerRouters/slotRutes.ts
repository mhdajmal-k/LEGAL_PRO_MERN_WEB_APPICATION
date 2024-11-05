import { Router } from "express";
import LawyerSlotInteractor from "../../../../application/useCases/lawyer/lawyerSlotUseCase";
import LawyerSlotController from "../../../../interFace_adapters/controlers/lawyer/lawyerSlotController";
import LawyerSlotRepository from "../../../../interFace_adapters/repositories/lawyerRepositories/lawyerSlotRepository";
import { authorization } from "../../../middleware/authMilddlewere";
import { UserRole } from "../../../utils/helpers/Enums";
export const slotRoute = Router();
const repository = new LawyerSlotRepository();
const interactor = new LawyerSlotInteractor(repository);
const lawyerSlotController = new LawyerSlotController(interactor);

slotRoute.post(
  "/",
  authorization(UserRole.Lawyer),
  lawyerSlotController.CreateSlotController.bind(lawyerSlotController)
);
slotRoute.get(
  "/:id",
  authorization(UserRole.Lawyer),
  lawyerSlotController.fetchLawyerSlots.bind(lawyerSlotController)
);
slotRoute.put(
  "/:slotId",
  authorization(UserRole.Lawyer),
  lawyerSlotController.updateSlots.bind(lawyerSlotController)
);
slotRoute.delete(
  "/:slotId",
  authorization(UserRole.Lawyer),
  lawyerSlotController.deleteSlot.bind(lawyerSlotController)
);
