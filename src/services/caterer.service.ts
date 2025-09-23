import HTTPException from "@/exceptions/http.exception";
import { ICaterer } from "@/interfaces/caterer.interface";
import CatererModel from "@/models/caterer.model";
import UserModel from "@/models/user.model";
import { CatererDataType } from "@/schemas/caterer.validation.schema";
import { isEmpty } from "@/utils/util";
import { StatusCodes } from "http-status-codes";

class CatererService {
	public entertainmentModel = CatererModel;

	// create Caterer
	async createCaterer(
		data: CatererDataType,
		userId: string
	): Promise<ICaterer> {
		if (isEmpty(data))
			throw new HTTPException(StatusCodes.BAD_REQUEST, "Data is required");

		if (isEmpty(userId))
			throw new HTTPException(StatusCodes.BAD_REQUEST, "UserId is required");

		data.userId = userId;
		const Caterer = await this.entertainmentModel.create(data);
		return Caterer;
	}

	// get all Caterers with pagination
	async getCaterers({
		limit,
		page,
		filter,
	}: {
		limit: number;
		page: number;
		filter?: { availability?: "all" | "available" | "booked" };
	}): Promise<ICaterer[]> {
		// fetch both available and booked Caterers if availability is all
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

	// get single Caterer by id
	async getCatererById(id: string): Promise<ICaterer> {
		if (!id) throw new HTTPException(StatusCodes.BAD_REQUEST, "Id is required");

		const Caterer = await this.entertainmentModel
			.findById(id)
			.populate("userId", "name email firstName lastName", UserModel);
		if (!Caterer)
			throw new HTTPException(StatusCodes.NOT_FOUND, "Caterer not found");
		return Caterer;
	}

	// get single Caterer by userId
	async getCatererByUserId(userId: string): Promise<ICaterer> {
		if (!userId)
			throw new HTTPException(StatusCodes.BAD_REQUEST, "UserId is required");
		const caterer = await this.entertainmentModel
			.findOne({ userId: userId.toString() })
			.populate("userId", "name email firstName lastName", UserModel);
		if (!caterer)
			throw new HTTPException(StatusCodes.NOT_FOUND, "Caterer not found");
		return caterer;
	}

	// update Caterer
	async updateCaterer(id: string, data: CatererDataType): Promise<ICaterer> {
		if (!id) throw new HTTPException(StatusCodes.BAD_REQUEST, "Id is required");
		if (isEmpty(data))
			throw new HTTPException(StatusCodes.BAD_REQUEST, "Data is required");
		const Caterer = await this.entertainmentModel.findByIdAndUpdate(id, data, {
			new: true,
		});
		if (!Caterer)
			throw new HTTPException(StatusCodes.NOT_FOUND, "Caterer not found");
		return Caterer;
	}

	// delete Caterer
	async deleteCaterer(id: string): Promise<ICaterer> {
		if (!id) throw new HTTPException(StatusCodes.BAD_REQUEST, "Id is required");
		const Caterer = await this.entertainmentModel.findByIdAndDelete(id);
		if (!Caterer)
			throw new HTTPException(StatusCodes.NOT_FOUND, "Caterer not found");
		return Caterer;
	}

	// book Caterer
	async bookCaterer(CatererId: string): Promise<ICaterer> {
		if (!CatererId)
			throw new HTTPException(
				StatusCodes.BAD_REQUEST,
				"Caterer Id is required"
			);

		const Caterer = await this.entertainmentModel.findById(CatererId);

		if (!Caterer)
			throw new HTTPException(StatusCodes.NOT_FOUND, "Caterer not found");

		if (Caterer.availability === "booked")
			throw new HTTPException(
				StatusCodes.BAD_REQUEST,
				"Caterer is already booked"
			);
		Caterer.availability = "booked";
		await Caterer.save();
		return Caterer;
	}
}

export default CatererService;
