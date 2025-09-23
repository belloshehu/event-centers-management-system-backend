import DishController from "@/controllers/dish.controller";
import { Routes } from "@/interfaces/route.interface";
import authMiddleware from "@/middlewares/auth.middleware";
import validationMiddleware from "@/middlewares/validation.middleware";
import { dishValidationSchema } from "@/schemas/dish.validation.schema";
import { Router } from "express";

class DishRoutes implements Routes {
	path = "/dishes";
	router = Router();
	dishController = new DishController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		// Define your dish routes here
		this.router.get(this.path, this.dishController.getDishes);
		this.router.get(this.path + "/:id", this.dishController.getDishById);
		this.router.get(
			this.path + "/caterer/:catererId",
			this.dishController.getDishesByCatererId
		);
		this.router.post(
			this.path + "/caterer/:catererId",
			[authMiddleware, validationMiddleware(dishValidationSchema, "body")],
			this.dishController.createDish
		);
		this.router.patch(
			this.path + "/:id",
			[authMiddleware, validationMiddleware(dishValidationSchema, "body")],
			this.dishController.updateDish
		);
		this.router.delete(
			this.path + "/:id",
			authMiddleware,
			this.dishController.deleteDish
		);
	}
}

export default DishRoutes;
