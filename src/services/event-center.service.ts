import HTTPException from "@/exceptions/http.exception";
import { IEventCenter } from "@/interfaces/event-center.interface";
import EventCenterModel from "@/models/event-center";
import { IEventCenterDataType } from "@/schemas/event-center.validation.schema";
import { isEmpty } from "@/utils/util";
import { StatusCodes } from "http-status-codes";
import UserService from "./user.service";

class EventCenterService {
	private eventCenterModel = EventCenterModel;
	private userService = new UserService();

	async createEventCenter(
		data: IEventCenterDataType,
		userId: string
	): Promise<IEventCenter> {
		if (isEmpty(data))
			throw new HTTPException(StatusCodes.BAD_REQUEST, "Data is required");

		const user = await this.userService.getUser(userId);
		if (!user) throw new HTTPException(StatusCodes.NOT_FOUND, "User not found");

		data.userId = userId;
		const eventCenter = new this.eventCenterModel(data);
		return await eventCenter.save();
	}

	async getEventCenters({
		limit,
		page,
	}: {
		limit: number;
		page: number;
	}): Promise<IEventCenter[]> {
		return await this.eventCenterModel
			.find()
			.skip((page - 1) * limit)
			.limit(limit);
	}

	// get single event center by id
	async getEventCenterById(id: string): Promise<IEventCenter> {
		if (!id) throw new HTTPException(StatusCodes.BAD_REQUEST, "Id is required");

		const eventCenter = await this.eventCenterModel.findById(id);
		if (!eventCenter)
			throw new HTTPException(StatusCodes.NOT_FOUND, "Event center not found");
		return eventCenter;
	}

	// update event center
	async updateEventCenter(
		id: string,
		data: IEventCenterDataType
	): Promise<IEventCenter> {
		if (isEmpty(data))
			throw new HTTPException(StatusCodes.BAD_REQUEST, "Data is required");
		const eventCenter = await this.eventCenterModel.findByIdAndUpdate(
			id,
			data,
			{ new: true }
		);
		if (!eventCenter)
			throw new HTTPException(StatusCodes.NOT_FOUND, "Event center not found");
		return eventCenter;
	}

	// delete event center
	async deleteEventCenter(id: string): Promise<IEventCenter> {
		if (!id) throw new HTTPException(StatusCodes.BAD_REQUEST, "Id is required");
		const eventCenter = await this.eventCenterModel.findByIdAndDelete(id);
		if (!eventCenter)
			throw new HTTPException(StatusCodes.NOT_FOUND, "Event center not found");
		return eventCenter;
	}
}

export default EventCenterService;
