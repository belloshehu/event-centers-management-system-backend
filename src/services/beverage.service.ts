import HTTPException from "@/exceptions/http.exception";
import { IBeverage } from "@/interfaces/beverage.interface";
import BeverageModel from "@/models/beverage.model";
import { IBeverageDataType } from "@/schemas/beverage.validation.schema";
import { isEmpty } from "@/utils/util";
import { StatusCodes } from "http-status-codes";

class BeverageService {
	public beverageModel = BeverageModel;

	// method to create beverage
	async createBeverage(
		data: IBeverageDataType,
		catererId: string
	): Promise<IBeverage> {
		if (isEmpty(data))
			throw new HTTPException(StatusCodes.BAD_REQUEST, "Data is required");
		// check for caterer id
		if (isEmpty(catererId))
			throw new HTTPException(
				StatusCodes.BAD_REQUEST,
				"Caterer id is required"
			);
		const beverage = await this.beverageModel.create({
			...data,
			caterer: catererId,
		});
		return beverage;
	}

	// method to fetch single beverage by id
	async getBeverageById(id: string): Promise<IBeverage> {
		if (isEmpty(id))
			throw new HTTPException(StatusCodes.BAD_REQUEST, "Id is required");
		const beverage = await this.beverageModel.findById(id);
		if (!beverage)
			throw new HTTPException(StatusCodes.NOT_FOUND, "Beverage not found");
		return beverage;
	}

	// method to fetch all beverages with pagination
	async getBeverages({
		limit,
		page,
	}: {
		limit: number;
		page: number;
	}): Promise<IBeverage[]> {
		return await this.beverageModel
			.find()
			.skip((page - 1) * limit)
			.limit(limit)
			.populate("caterer", "name phone images");
	}

	// method to get beverages by caterer id
	async getBeveragesByCatererId(catererId: string): Promise<IBeverage[]> {
		if (isEmpty(catererId))
			throw new HTTPException(
				StatusCodes.BAD_REQUEST,
				"Caterer Id is required"
			);
		const beverages = await this.beverageModel.find({ caterer: catererId });
		return beverages;
	}

	// method to update beverage by id
	async updateBeverage(
		id: string,
		data: Partial<IBeverageDataType>
	): Promise<IBeverage> {
		if (isEmpty(id))
			throw new HTTPException(StatusCodes.BAD_REQUEST, "Id is required");
		if (isEmpty(data))
			throw new HTTPException(StatusCodes.BAD_REQUEST, "Data is required");

		const beverage = await this.beverageModel.findByIdAndUpdate(id, data, {
			new: true,
		});
		if (!beverage)
			throw new HTTPException(StatusCodes.NOT_FOUND, "Beverage not found");
		return beverage;
	}

	// method to delete beverage by id
	async deleteBeverage(id: string): Promise<IBeverage> {
		if (isEmpty(id))
			throw new HTTPException(StatusCodes.BAD_REQUEST, "Id is required");
		const beverage = await this.beverageModel.findByIdAndDelete(id);
		if (!beverage)
			throw new HTTPException(StatusCodes.NOT_FOUND, "Beverage not found");
		return beverage;
	}
}

export default BeverageService;
