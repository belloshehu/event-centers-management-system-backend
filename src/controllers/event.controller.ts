import { RequestWithUser } from "@/interfaces/auth.interface";
import { IEventCenterDataType } from "@/schemas/event-center.validation.schema";
import { IEventDataType } from "@/schemas/event.validation.schema";
import EventService from "@/services/event.service";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

class EventController {
	public eventService = new EventService();
	private defaultPage = 1; // default page number
	private defaultLimit = 20; // 20 items per page

	// create event
	public createEvent = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) => {
		try {
			const eventData = req.body;
			const event = await this.eventService.createEvent(
				eventData,
				req.user?._id
			);
			res.status(StatusCodes.CREATED).json({ data: event, message: "created" });
		} catch (error) {
			next(error);
		}
	};

	// get all events
	public getEvents = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const events = await this.eventService.getEvents({
				limit: this.defaultLimit,
				page: this.defaultPage,
			});
			res
				.status(StatusCodes.OK)
				.json({ data: events, message: "All events list" });
		} catch (error) {
			next(error);
		}
	};

	// get single event by id
	public getEventById = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const event = await this.eventService.getEventById(req.params.id);
			res.status(StatusCodes.OK).json({ data: event, message: "Single event" });
		} catch (error) {
			console.log(error);
			next(error);
		}
	};

	// update event
	public updateEvent = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const event = await this.eventService.updateEvent(
				req.params.id,
				req.body
			);
			res
				.status(StatusCodes.CREATED)
				.json({ data: event, message: "Updated event" });
		} catch (error) {
			next(error);
		}
	};

	// delete event
	public deleteEvent = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const event = await this.eventService.deleteEvent(req.params.id);
			res
				.status(StatusCodes.NO_CONTENT)
				.json({ data: event, message: "Deleted event" });
		} catch (error) {
			next(error);
		}
	};
}

export default EventController;
