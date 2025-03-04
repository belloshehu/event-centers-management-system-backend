import EventCenterController from "@/controllers/event-center.controller";
import { Routes } from "@/interfaces/route.interface";
import authMiddleware from "@/middlewares/auth.middleware";
import validationMiddleware from "@/middlewares/validation.middleware";
import { eventCenterValidationSchema } from "@/schemas/event-center.validation.schema";
import { Router } from "express";

class EventCenterRoutes implements Routes {
	public path = "/event-centers";
	public router = Router();
	private eventCenterController = new EventCenterController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.post(
			this.path,
			[
				authMiddleware,
				validationMiddleware(eventCenterValidationSchema, "body"),
			],
			this.eventCenterController.createEventCenter
		);
		this.router.get(this.path, this.eventCenterController.getEventCenters);
		this.router.get(
			this.path + "/:id",
			this.eventCenterController.getEventCenterById
		);
		this.router.put(
			this.path + "/:id",
			[
				authMiddleware,
				validationMiddleware(eventCenterValidationSchema, "body"),
			],
			this.eventCenterController.updateEventCenter
		);
		this.router.delete(
			this.path + "/:id",
			authMiddleware,
			this.eventCenterController.deleteEventCenter
		);
	}
}

export default EventCenterRoutes;
