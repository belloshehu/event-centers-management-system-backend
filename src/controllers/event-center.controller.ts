import { RequestWithUser } from "@/interfaces/auth.interface";
import { IEventCenterDataType } from "@/schemas/event-center.validation.schema";
import EventCenterService from "@/services/event-center.service";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

class EventCenterController {
	private eventCenterService = new EventCenterService();
	private defaultPage = 1; // default page number
	private defaultLimit = 20; // 20 items per page

	// create event center
	public createEventCenter = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) => {
		try {
			const eventData: IEventCenterDataType = req.body;
			const eventCenter = await this.eventCenterService.createEventCenter(
				eventData, // data to create event center
				req.user?._id // user id
			);
			res
				.status(StatusCodes.CREATED)
				.json({ data: eventCenter, message: "created" });
		} catch (error) {
			next(error);
		}
	};

	// get all event centers
	public getEventCenters = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const eventCenters = await this.eventCenterService.getEventCenters({
				limit: this.defaultLimit,
				page: this.defaultPage,
			});
			res
				.status(StatusCodes.OK)
				.json({ data: eventCenters, message: "All centers list" });
		} catch (error) {
			next(error);
		}
	};

	// get single event center by id
	public getEventCenterById = async (
		req: Request<{ id: string }>,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { id } = req.params;
			const eventCenter = await this.eventCenterService.getEventCenterById(id);
			res
				.status(StatusCodes.OK)
				.json({ data: eventCenter, message: "Single event center" });
		} catch (error) {
			next(error);
		}
	};

	// update event center
	public updateEventCenter = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const eventCenter = await this.eventCenterService.updateEventCenter(
				req.params.id,
				req.body
			);
			res
				.status(StatusCodes.OK)
				.json({ data: eventCenter, message: "Event center updated" });
		} catch (error) {
			next(error);
		}
	};

	// delete event center
	public deleteEventCenter = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const eventCenter = await this.eventCenterService.deleteEventCenter(
				req.params.id
			);
			res
				.status(StatusCodes.OK)
				.json({ data: eventCenter, message: "Event center deleted" });
		} catch (error) {
			next(error);
		}
	};
}

export default EventCenterController;
