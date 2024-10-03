import { Express, Router } from "express";
import AdminController from "../../../../interFace_adapters/controlers/admin/adminController";
import adminInteractor from "../../../../application/useCases/admin/adminUseCase";
import JwtToken from "../../../services/jwt";
import { config } from "../../../config/envConfig";
import AdminRepository from "../../../../interFace_adapters/repositories/adminRepositories/adminRepositories";

export const adminRouter = Router();
const jwtToken = new JwtToken(config.JWT_SECRET);
const repository = new AdminRepository();
const interactor = new adminInteractor(repository, jwtToken);

const adminController = new AdminController(interactor);

adminRouter.post("/login", adminController.adminLogin.bind(adminController));
adminRouter.get("/users", adminController.getUsers.bind(adminController));
