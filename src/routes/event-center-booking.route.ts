import EventCenterBookingController from "@/controllers/event-center-booking.controller";
import { Routes } from "@/interfaces/route.interface";
import authMiddleware from "@/middlewares/auth.middleware";
import validationMiddleware from "@/middlewares/validation.middleware";
import {
	eventCenterBookingSchema,
	getEventCenterBookingsQueryValidationSchema,
} from "@/schemas/event-center-booking.schema";
import { Router } from "express";

class EventCenterBookingRoutes implements Routes {
	public path = "/event-center-bookings";
	public router = Router();
	private eventCenterBookingController = new EventCenterBookingController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.post(
			this.path,
			[authMiddleware, validationMiddleware(eventCenterBookingSchema, "body")],
			this.eventCenterBookingController.createEventCenterBooking
		);
		this.router.get(
			this.path,
			[
				authMiddleware,
				validationMiddleware(
					getEventCenterBookingsQueryValidationSchema,
					"query"
				),
			],
			this.eventCenterBookingController.getEventCenterBookings
		);
		this.router.get(
			`${this.path}/:eventCenterId/:id`,
			[authMiddleware],
			this.eventCenterBookingController.getEventCenterBookingById
		);
		this.router.put(
			`${this.path}/:id`,
			[authMiddleware, validationMiddleware(eventCenterBookingSchema, "body")],
			this.eventCenterBookingController.updateEventCenterBooking
		);
		this.router.delete(
			`${this.path}/:id`,
			[authMiddleware],
			this.eventCenterBookingController.deleteEventCenterBooking
		);
	}
}

export default EventCenterBookingRoutes;
