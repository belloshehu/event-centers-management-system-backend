import HTTPException from "@/exceptions/http.exception";
import { IEventCenterBooking } from "@/interfaces/event-center-booking.interface";
import EventCenterBookingModel from "@/models/event-center-booking.models";
import { IEventCenterBookingDataType } from "@/schemas/event-center-booking.schema";
import { isEmpty } from "@/utils/util";
import { StatusCodes } from "http-status-codes";
import EventService from "./event.service";
import EventCenterService from "./event-center.service";
import EntertainerService from "./entertainer.service";

class EventCenterBookingService {
	private eventCenterBookingModel = EventCenterBookingModel;
	private eventCenterService = new EventCenterService();
	private eventService = new EventService();
	private entertainerService = new EntertainerService();

	// create event center booking
	async createEventCenterBooking(
		data: IEventCenterBookingDataType
	): Promise<IEventCenterBooking> {
		console.log(data);
		if (isEmpty(data))
			throw new HTTPException(StatusCodes.BAD_REQUEST, "Data is required");

		if (!data.user)
			throw new HTTPException(StatusCodes.BAD_REQUEST, "User is required");

		// book entertainers if available
		if (data.entertainers && data.entertainers.length > 0) {
			for (const entertainerId of data.entertainers) {
				await this.entertainerService.bookEntertainer(entertainerId);
			}
		}

		const event_center = await this.eventCenterService.getEventCenterById(
			data.event_center
		);
		if (!event_center)
			throw new HTTPException(
				StatusCodes.BAD_REQUEST,
				"Event center not found"
			);

		const event = await this.eventService.getEventById(data.event);
		if (!event)
			throw new HTTPException(StatusCodes.BAD_REQUEST, "Event not found");

		const eventCenterBooking = await this.eventCenterBookingModel.create(data);
		return eventCenterBooking;
	}

	// get event center bookings
	async getEventCenterBookings({
		limit,
		page,
	}: {
		limit: number;
		page: number;
	}): Promise<IEventCenterBooking[]> {
		return await this.eventCenterBookingModel
			.find()
			.skip((page - 1) * limit)
			.limit(limit)
			.populate("event_center user event");
	}

	// get single event center booking by id
	async getEventCenterBookingById(id: string): Promise<IEventCenterBooking> {
		if (!id) throw new HTTPException(StatusCodes.BAD_REQUEST, "Id is required");
		const eventCenterBooking = await this.eventCenterBookingModel
			.findById(id)
			.populate("event_center user event");
		if (!eventCenterBooking)
			throw new HTTPException(
				StatusCodes.NOT_FOUND,
				"Event center booking not found"
			);
		return eventCenterBooking;
	}

	// update event center booking
	async updateEventCenterBooking(
		id: string,
		data: IEventCenterBookingDataType
	): Promise<IEventCenterBooking> {
		if (!id) throw new HTTPException(StatusCodes.BAD_REQUEST, "Id is required");
		if (isEmpty(data))
			throw new HTTPException(StatusCodes.BAD_REQUEST, "Data is required");
		const eventCenterBooking =
			await this.eventCenterBookingModel.findByIdAndUpdate(id, data, {
				new: true,
			});
		if (!eventCenterBooking)
			throw new HTTPException(
				StatusCodes.NOT_FOUND,
				"Event center booking not found"
			);
		return eventCenterBooking;
	}

	// delete event center booking
	async deleteEventCenterBooking(id: string): Promise<IEventCenterBooking> {
		if (!id) throw new HTTPException(StatusCodes.BAD_REQUEST, "Id is required");
		const eventCenterBooking =
			await this.eventCenterBookingModel.findOneAndDelete({ _id: id });
		if (!eventCenterBooking)
			throw new HTTPException(
				StatusCodes.NOT_FOUND,
				"Event center booking not found"
			);
		// delete associated events when a event center booking is deleted
		await this.eventService.deleteEvent(eventCenterBooking.event.toString());
		return eventCenterBooking;
	}
}

export default EventCenterBookingService;
