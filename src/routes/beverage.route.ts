import BeverageController from "@/controllers/beverage.controller";
import { Routes } from "@/interfaces/route.interface";
import authMiddleware from "@/middlewares/auth.middleware";
import validationMiddleware from "@/middlewares/validation.middleware";
import { beverageValidationSchema } from "@/schemas/beverage.validation.schema";
import { Router } from "express";

class BeverageRoutes implements Routes {
	path = "/beverages";
	router = Router();
	beverageController = new BeverageController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(this.path, this.beverageController.getBeverages);
		this.router.get(this.path + "/:id", this.beverageController.getDishById);
		this.router.get(
			this.path + "/caterer/:catererId",
			this.beverageController.getBeveragesByCatererId
		);
		this.router.post(
			this.path + "/caterer/:catererId",
			[authMiddleware, validationMiddleware(beverageValidationSchema, "body")],
			this.beverageController.createBeverage
		);
		this.router.patch(
			this.path + "/:id",
			[authMiddleware, validationMiddleware(beverageValidationSchema, "body")],
			this.beverageController.updateBeverage
		);
		this.router.delete(
			this.path + "/:id",
			authMiddleware,
			this.beverageController.deleteBeverage
		);
	}
}

export default BeverageRoutes;
