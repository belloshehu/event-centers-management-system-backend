import EventController from "@/controllers/event.ontroller";
import { Routes } from "@/interfaces/route.interface";
import authMiddleware from "@/middlewares/auth.middleware";
import validationMiddleware from "@/middlewares/validation.middleware";
import { eventValidationSchema } from "@/schemas/event.validation.schema";
import { Router } from "express";

class EventRoutes implements Routes {
	public path = "/events";
	public router = Router();
	private eventController = new EventController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		// create event route
		this.router.post(
			this.path,
			[authMiddleware, validationMiddleware(eventValidationSchema, "body")],
			this.eventController.createEvent
		);
		// get all events route
		this.router.get(this.path, this.eventController.getEvents);
		// get event by id route
		this.router.get(this.path + "/:id", this.eventController.getEventById);
		// update event route
		this.router.put(
			this.path + "/:id",
			[authMiddleware, validationMiddleware(eventValidationSchema, "body")],
			this.eventController.updateEvent
		);
		// delete event route
		this.router.delete(
			this.path + "/:id",
			authMiddleware,
			this.eventController.deleteEvent
		);
	}
}

export default EventRoutes;
