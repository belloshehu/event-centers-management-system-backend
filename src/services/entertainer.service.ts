import HTTPException from "@/exceptions/http.exception";
import { IEntertainer } from "@/interfaces/entertainer.interface";
import EntertainerModel from "@/models/entertainer.model";
import UserModel from "@/models/user.model";
import { EntertainerDataType } from "@/schemas/entertainer.validation.schema";
import { isEmpty } from "@/utils/util";
import { StatusCodes } from "http-status-codes";

class EntertainerService {
	public entertainmentModel = EntertainerModel;

	// create entertainer
	async createEntertainer(
		data: EntertainerDataType,
		userId: string
	): Promise<IEntertainer> {
		if (isEmpty(data))
			throw new HTTPException(StatusCodes.BAD_REQUEST, "Data is required");

		if (isEmpty(userId))
			throw new HTTPException(StatusCodes.BAD_REQUEST, "UserId is required");

		data.userId = userId;
		const entertainer = await this.entertainmentModel.create(data);
		return entertainer;
	}

	// get all entertainers with pagination
	async getEntertainers({
		limit,
		page,
		filter,
	}: {
		limit: number;
		page: number;
		filter?: { availability?: "all" | "available" | "booked" };
	}): Promise<IEntertainer[]> {
		// fetch both available and booked entertainers if availability is all
		const newFilter =
			filter?.availability === "all"
				? { $or: [{ availability: "booked" }, { availability: "available" }] }
				: filter;
		console.log(newFilter, "newFilter");
		return await this.entertainmentModel
			.find(newFilter!)
			.skip((page - 1) * limit)
			.limit(limit)
			.populate("userId", "email firstName lastName", UserModel);
	}

	// get single entertainer by id
	async getEntertainerById(id: string): Promise<IEntertainer> {
		if (!id) throw new HTTPException(StatusCodes.BAD_REQUEST, "Id is required");

		const entertainer = await this.entertainmentModel
			.findById(id)
			.populate("userId", "name email firstName lastName", UserModel);
		if (!entertainer)
			throw new HTTPException(StatusCodes.NOT_FOUND, "Entertainer not found");
		return entertainer;
	}

	// get entertainer by user id
	async getEntertainerByUserId(userId: string): Promise<IEntertainer> {
		if (!userId)
			throw new HTTPException(StatusCodes.BAD_REQUEST, "UserId is required");
		const entertainer = await this.entertainmentModel
			.findOne({ userId: userId.toString() })
			.populate("userId", "name email firstName lastName", UserModel);
		if (!entertainer)
			throw new HTTPException(StatusCodes.NOT_FOUND, "Entertainer not found");
		return entertainer;
	}

	// update entertainer
	async updateEntertainer(
		id: string,
		data: EntertainerDataType
	): Promise<IEntertainer> {
		if (!id) throw new HTTPException(StatusCodes.BAD_REQUEST, "Id is required");
		if (isEmpty(data))
			throw new HTTPException(StatusCodes.BAD_REQUEST, "Data is required");
		const entertainer = await this.entertainmentModel.findByIdAndUpdate(
			id,
			data,
			{ new: true }
		);
		if (!entertainer)
			throw new HTTPException(StatusCodes.NOT_FOUND, "Entertainer not found");
		return entertainer;
	}

	// delete entertainer
	async deleteEntertainer(id: string): Promise<IEntertainer> {
		if (!id) throw new HTTPException(StatusCodes.BAD_REQUEST, "Id is required");
		const entertainer = await this.entertainmentModel.findByIdAndDelete(id);
		if (!entertainer)
			throw new HTTPException(StatusCodes.NOT_FOUND, "Entertainer not found");
		return entertainer;
	}

	// book entertainer
	async bookEntertainer(entertainerId: string): Promise<IEntertainer> {
		if (!entertainerId)
			throw new HTTPException(
				StatusCodes.BAD_REQUEST,
				"Entertainer Id is required"
			);

		const entertainer = await this.entertainmentModel.findById(entertainerId);

		if (!entertainer)
			throw new HTTPException(StatusCodes.NOT_FOUND, "Entertainer not found");

		if (entertainer.availability === "booked")
			throw new HTTPException(
				StatusCodes.BAD_REQUEST,
				"Entertainer is already booked"
			);
		entertainer.availability = "booked";
		await entertainer.save();
		return entertainer;
	}
}

export default EntertainerService;
