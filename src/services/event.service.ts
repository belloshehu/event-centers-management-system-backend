import HTTPException from "@/exceptions/http.exception";
import { IEvent } from "@/interfaces/event.interface";
import { EventModel } from "@/models/event.model";
import { IEventCenterDataType } from "@/schemas/event-center.validation.schema";
import { IEventDataType } from "@/schemas/event.validation.schema";
import { isEmpty } from "@/utils/util";
import { StatusCodes } from "http-status-codes";

class EventService {
	private eventModel = EventModel;

	async createEvent(data: IEventDataType, userId: string): Promise<IEvent> {
		if (isEmpty(userId))
			throw new HTTPException(StatusCodes.BAD_REQUEST, "UserId is required");
		if (isEmpty(data))
			throw new HTTPException(StatusCodes.BAD_REQUEST, "Data is required");

		const event = await this.eventModel.create({ ...data, user: userId });
		return event;
	}

	// get all events with pagination
	async getEvents({
		limit,
		page,
	}: {
		limit: number;
		page: number;
	}): Promise<IEvent[]> {
		return await this.eventModel
			.find()
			.skip((page - 1) * limit)
			.limit(limit)
			.populate("eventCenter", "name address city state country cost capacity"); // populate event center
	}

	// get single event by id
	async getEventById(id: string): Promise<IEvent> {
		if (!id) throw new HTTPException(StatusCodes.BAD_REQUEST, "Id is required");

		const event = await this.eventModel
			.findById(id)
			.populate("eventCenter", "name address city state country cost capacity");
		if (!event)
			throw new HTTPException(StatusCodes.NOT_FOUND, "Event not found");
		return event;
	}

	// update event
	async updateEvent(id: string, data: IEventCenterDataType): Promise<IEvent> {
		if (!id) throw new HTTPException(StatusCodes.BAD_REQUEST, "Id is required");
		if (isEmpty(data))
			throw new HTTPException(StatusCodes.BAD_REQUEST, "Data is required");

		const event = await this.eventModel.findByIdAndUpdate(id, data, {
			new: true,
		});
		if (!event)
			throw new HTTPException(StatusCodes.NOT_FOUND, "Event not found");
		return event;
	}

	// delete event
	async deleteEvent(id: string): Promise<IEvent> {
		if (!id) throw new HTTPException(StatusCodes.BAD_REQUEST, "Id is required");

		const event = await this.eventModel.findByIdAndDelete(id);
		if (!event)
			throw new HTTPException(StatusCodes.NOT_FOUND, "Event not found");
		return event;
	}
}

export default EventService;
