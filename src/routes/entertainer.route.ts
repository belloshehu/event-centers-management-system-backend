import { Routes } from "@/interfaces/route.interface";
import { Router } from "express";
import EntertainerController from "@/controllers/entertainer.controller";
import authMiddleware from "@/middlewares/auth.middleware";
import validationMiddleware from "@/middlewares/validation.middleware";
import { entertainerValidationSchema } from "@/schemas/entertainer.validation.schema";

class EntertainerRoutes implements Routes {
	public path = "/entertainers";
	public router = Router();
	public entertainerController = new EntertainerController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		// create entertainer route
		this.router.post(
			this.path,
			[
				authMiddleware,
				validationMiddleware(entertainerValidationSchema, "body"),
			],
			this.entertainerController.createEntertainer
		);
		// get all entertainers route
		this.router.get(this.path, this.entertainerController.getEntertainers);
		// get entertainer by id route
		this.router.get(
			this.path + "/:id",
			this.entertainerController.getEntertainerById
		);
		// update entertainer route
		this.router.put(
			this.path + "/:id",
			[
				authMiddleware,
				validationMiddleware(entertainerValidationSchema, "body"),
			],
			this.entertainerController.updateEntertainer
		);
		// delete entertainer route
		this.router.delete(
			this.path + "/:id",
			authMiddleware,
			this.entertainerController.deleteEntertainer
		);
	}
}

export default EntertainerRoutes;
