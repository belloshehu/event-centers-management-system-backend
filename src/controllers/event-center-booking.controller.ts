import { RequestWithUser } from "@/interfaces/auth.interface";
import EventCenterBookingService from "@/services/event-center-booking.service";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

class EventCenterBookingController {
	private eventCenterBookingService = new EventCenterBookingService();
	private defaultPage = 1;
	private defaultLimit = 20;

	// create event center booking
	public createEventCenterBooking = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) => {
		try {
			const eventCenterBookingData = req.body;
			const eventCenterBooking =
				await this.eventCenterBookingService.createEventCenterBooking({
					...eventCenterBookingData,
					user: req.user?._id,
				});
			res.status(StatusCodes.CREATED).json({
				data: eventCenterBooking,
				message: "Event center booked successfully",
			});
		} catch (error) {
			next(error);
		}
	};

	// get single event center booking by id
	public getEventCenterBookingById = async (
		req: Request<{ id: string; eventCenterId: string }>,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { id, eventCenterId } = req.params;
			console.log(id, eventCenterId);
			const eventCenterBooking =
				await this.eventCenterBookingService.getEventCenterBookingById(
					id,
					eventCenterId
				);
			res.status(StatusCodes.OK).json({
				data: eventCenterBooking,
				message: "Single event center booking",
			});
		} catch (error) {
			next(error);
		}
	};

	// update event center booking
	public updateEventCenterBooking = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) => {
		try {
			const eventCenterBookingData = req.body;
			const eventCenterBooking =
				await this.eventCenterBookingService.updateEventCenterBooking(
					req.params.id,
					eventCenterBookingData
				);
			res.status(StatusCodes.CREATED).json({
				data: eventCenterBooking,
				message: "Event center booking updated successfully",
			});
		} catch (error) {
			next(error);
		}
	};

	// delete event center booking
	public deleteEventCenterBooking = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) => {
		try {
			const eventCenterBooking =
				await this.eventCenterBookingService.deleteEventCenterBooking(
					req.params.id
				);
			res.status(StatusCodes.OK).json({
				data: eventCenterBooking,
				message: "Event center booking deleted successfully",
			});
		} catch (error) {
			next(error);
		}
	};

	// get all event center bookings with pagination
	public getEventCenterBookings = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { limit, page } = req.query;
			const eventCenterBookings =
				await this.eventCenterBookingService.getEventCenterBookings({
					limit: limit ? parseInt(limit as string) : this.defaultLimit,
					page: page ? parseInt(page as string) : this.defaultPage,
				});
			res.status(StatusCodes.OK).json({
				data: eventCenterBookings,
				message: "All event center bookings",
			});
		} catch (error) {
			next(error);
		}
	};
}

export default EventCenterBookingController;
