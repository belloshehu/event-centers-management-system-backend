import HTTPException from "@/exceptions/http.exception";
import { IEntertainer } from "@/interfaces/entertainer.interface";
import EntertainerModel from "@/models/entertainer.model";
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
	}: {
		limit: number;
		page: number;
	}): Promise<IEntertainer[]> {
		return await this.entertainmentModel
			.find()
			.skip((page - 1) * limit)
			.limit(limit)
			.populate("userId", "name email firstName lastName", EntertainerModel);
	}

	// get single entertainer by id
	async getEntertainerById(id: string): Promise<IEntertainer> {
		if (!id) throw new HTTPException(StatusCodes.BAD_REQUEST, "Id is required");

		const entertainer = await this.entertainmentModel
			.findById(id)
			.populate("userId", "name email firstName lastName", EntertainerModel);
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
}

export default EntertainerService;
