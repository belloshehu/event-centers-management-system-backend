import { Routes } from "@/interfaces/route.interface";
import { Router } from "express";
import CatererController from "@/controllers/caterer.controller";
import authMiddleware from "@/middlewares/auth.middleware";
import validationMiddleware from "@/middlewares/validation.middleware";
import { catererValidationSchema } from "@/schemas/caterer.validation.schema";

class CatererRoutes implements Routes {
	public path = "/caterers";
	public router = Router();
	public CatererController = new CatererController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		// create Caterer route
		this.router.post(
			this.path,
			[authMiddleware, validationMiddleware(catererValidationSchema, "body")],
			this.CatererController.createCaterer
		);
		// get all Caterers route
		this.router.get(this.path, this.CatererController.getCaterers);
		// get Caterer by id route
		this.router.get(this.path + "/:id", this.CatererController.getCatererById);
		// update Caterer route
		this.router.put(
			this.path + "/:id",
			[authMiddleware, validationMiddleware(catererValidationSchema, "body")],
			this.CatererController.updateCaterer
		);
		// route to get caterering service owned by logged in user
		this.router.get(
			this.path + "/user/service",
			authMiddleware,
			this.CatererController.getCatererByUserId
		);

		// delete Caterer route
		this.router.delete(
			this.path + "/:id",
			authMiddleware,
			this.CatererController.deleteCaterer
		);
	}
}

export default CatererRoutes;
