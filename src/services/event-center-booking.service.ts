import HTTPException from "@/exceptions/http.exception";
import { IEventCenterBooking } from "@/interfaces/event-center-booking.interface";
import EventCenterBookingModel from "@/models/event-center-booking.models";
import {
	IEventCenterBookingDataType,
	IGetEventCenterBookingsQueryParams,
} from "@/schemas/event-center-booking.schema";
import { isEmpty } from "@/utils/util";
import { StatusCodes } from "http-status-codes";
import EventService from "./event.service";
import EventCenterService from "./event-center.service";
import EntertainerService from "./entertainer.service";
import DishService from "./dish.service";
import BeverageService from "./beverage.service";

class EventCenterBookingService {
	private eventCenterBookingModel = EventCenterBookingModel;
	private eventCenterService = new EventCenterService();
	private eventService = new EventService();
	private entertainerService = new EntertainerService();
	private dishService = new DishService();
	private beverageService = new BeverageService();

	// create event center booking
	async createEventCenterBooking(
		data: IEventCenterBookingDataType
	): Promise<IEventCenterBooking> {
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

		event_center.status = "booked";
		await event_center.save();
		const event = await this.eventService.getEventById(data.event);
		if (!event)
			throw new HTTPException(StatusCodes.BAD_REQUEST, "Event not found");

		// create order for dishes if dishes are selected
		let dishesOrder = null;
		if (data.dishes && data.dishes.length > 0) {
			dishesOrder = await this.dishService.orderDishes(
				data.event,
				data.dishes,
				data.user
			);
		}

		// create order for beverages if beverages are selected
		let beveragesOrder = null;
		if (data.beverages && data.beverages.length > 0) {
			beveragesOrder = await this.beverageService.orderBeverages(
				data.event,
				data.beverages,
				data.user
			);
		}

		const eventCenterBooking = await this.eventCenterBookingModel.create({
			data,
			beveragesOrder,
			dishesOrder,
		});
		return eventCenterBooking;
	}

	// get event center bookings
	async getEventCenterBookings({
		limit,
		page,
		filter,
	}: {
		limit: number;
		page: number;
		filter?: IGetEventCenterBookingsQueryParams;
	}): Promise<IEventCenterBooking[]> {
		console.log(filter, "newFilter");

		const bookings = await this.eventCenterBookingModel
			.find({ ...filter })
			.skip((page - 1) * limit)
			.limit(limit)
			.populate("event_center user event");

		return bookings;
	}

	// get single event center booking by id
	async getEventCenterBookingById(
		id: string,
		eventCenterId: string
	): Promise<IEventCenterBooking> {
		if (!id) throw new HTTPException(StatusCodes.BAD_REQUEST, "Id is required");

		if (!eventCenterId)
			throw new HTTPException(
				StatusCodes.BAD_REQUEST,
				"Event center id is required"
			);

		const eventCenterBooking = await this.eventCenterBookingModel
			.findOne({ _id: id })
			.populate("event_center user event entertainers");
		if (!eventCenterBooking)
			throw new HTTPException(
				StatusCodes.NOT_FOUND,
				"Event center booking not found"
			);
		return eventCenterBooking;
	}

	// get users event center bookings
	async getUsersEventCenterBookings(
		userId: string,
		limit: number,
		page: number
	): Promise<IEventCenterBooking[]> {
		if (!userId)
			throw new HTTPException(StatusCodes.BAD_REQUEST, "user Id is required");
		const eventCenterBookings = await this.eventCenterBookingModel
			.find({ user: userId })
			.skip((page - 1) * limit)
			.limit(limit)
			.populate("event_center user event entertainers");
		return eventCenterBookings;
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
