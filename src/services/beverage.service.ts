import HTTPException from "@/exceptions/http.exception";
import { IBeverage, IBeverageOrder } from "@/interfaces/beverage.interface";
import BeverageModel, { BeverageOrderModel } from "@/models/beverage.model";
import {
	IBeverageDataType,
	IBeverageOrderDataType,
} from "@/schemas/beverage.validation.schema";
import { isEmpty } from "@/utils/util";
import { StatusCodes } from "http-status-codes";

class BeverageService {
	public beverageModel = BeverageModel;
	private beverageOrderModel = BeverageOrderModel;

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

	// method for ordering beverages for an event
	async orderBeverages(
		eventId: string,
		beverages: { id: string; quantity: number }[],
		userId: string
	): Promise<IBeverageOrder[]> {
		if (isEmpty(eventId)) {
			throw new HTTPException(StatusCodes.BAD_REQUEST, "Event ID is required");
		}
		if (!beverages || beverages.length === 0) {
			throw new HTTPException(
				StatusCodes.BAD_REQUEST,
				"Beverage orders are required"
			);
		}

		if (isEmpty(userId))
			throw new HTTPException(StatusCodes.BAD_REQUEST, "UserId is required");
		let orders = [];
		// create order for each beverage
		for (const beverageOrder of beverages) {
			const beverage = await this.beverageModel.findById(beverageOrder.id);
			if (!beverage) {
				throw new HTTPException(
					StatusCodes.NOT_FOUND,
					`Beverage with ID ${beverageOrder.id} not found`
				);
			}
			if (beverageOrder.quantity <= 0) {
				throw new HTTPException(
					StatusCodes.BAD_REQUEST,
					`Invalid quantity for beverage ID ${beverageOrder.id}`
				);
			}
			const totalCost = beverage.price * beverageOrder.quantity;
			const newOrder = await this.beverageOrderModel.create({
				event: eventId,
				beverage: beverage._id,
				quantity: beverageOrder.quantity,
				cost: totalCost,
				user: userId,
			});
			if (!newOrder) {
				throw new HTTPException(
					StatusCodes.INTERNAL_SERVER_ERROR,
					`Failed to create order for beverage ID ${beverageOrder.id}`
				);
			}
			orders.push(newOrder);
		}

		return orders;
	}
}

export default BeverageService;
