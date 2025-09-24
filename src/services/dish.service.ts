import HTTPException from "@/exceptions/http.exception";
import { IDish, IDishOrder } from "@/interfaces/dish.interface";
import DishModel, { DishOrderModel } from "@/models/dish.model";
import { IDishDataType } from "@/schemas/dish.validation.schema";
import { isEmpty } from "@/utils/util";
import { StatusCodes } from "http-status-codes";

class DishService {
	public dishModel = DishModel;
	private dishOrderModel = DishOrderModel;

	// method to create dish
	async createDish(data: IDishDataType, catererId: string): Promise<IDish> {
		if (isEmpty(data))
			throw new HTTPException(StatusCodes.BAD_REQUEST, "Data is required");

		// check for caterer id in data
		if (isEmpty(catererId))
			throw new HTTPException(
				StatusCodes.BAD_REQUEST,
				"Caterer id is required"
			);

		const dish = await this.dishModel.create({ ...data, caterer: catererId });
		return dish;
	}

	// method to fetch single dish by id
	async getDishById(id: string): Promise<IDish> {
		if (isEmpty(id))
			throw new HTTPException(StatusCodes.BAD_REQUEST, "Id is required");
		const dish = await this.dishModel.findById(id);
		if (!dish) throw new HTTPException(StatusCodes.NOT_FOUND, "Dish not found");
		return dish;
	}

	// get all dishes by caterer id
	async getDishesByCatererId(catererId: string): Promise<IDish[]> {
		if (isEmpty(catererId))
			throw new HTTPException(
				StatusCodes.BAD_REQUEST,
				"Caterer Id is required"
			);
		const dishes = await this.dishModel.find({ caterer: catererId });
		return dishes;
	}

	// method to fetch all dishes with pagination
	async getDishes({
		limit,
		page,
	}: {
		limit: number;
		page: number;
	}): Promise<IDish[]> {
		return await this.dishModel
			.find()
			.skip((page - 1) * limit)
			.limit(limit)
			.populate("caterer", "name phone images");
	}

	// method to update dish by id
	async updateDish(id: string, data: Partial<IDishDataType>): Promise<IDish> {
		if (isEmpty(id))
			throw new HTTPException(StatusCodes.BAD_REQUEST, "Id is required");
		if (isEmpty(data))
			throw new HTTPException(StatusCodes.BAD_REQUEST, "Data is required");

		const dish = await this.dishModel.findByIdAndUpdate(id, data, {
			new: true,
		});
		if (!dish) throw new HTTPException(StatusCodes.NOT_FOUND, "Dish not found");
		return dish;
	}

	// method to delete dish by id
	async deleteDish(id: string): Promise<IDish> {
		if (isEmpty(id))
			throw new HTTPException(StatusCodes.BAD_REQUEST, "Id is required");
		const dish = await this.dishModel.findByIdAndDelete(id);
		if (!dish) throw new HTTPException(StatusCodes.NOT_FOUND, "Dish not found");
		return dish;
	}

	// method for placing an order for a dish for an event
	async orderDishes(
		eventId: string,
		dishes: { id: string; quantity: number }[],
		userId: string
	): Promise<IDishOrder[]> {
		if (isEmpty(eventId)) {
			throw new HTTPException(StatusCodes.BAD_REQUEST, "Event ID is required");
		}
		if (!dishes || dishes.length === 0) {
			throw new HTTPException(
				StatusCodes.BAD_REQUEST,
				"dish orders are required"
			);
		}

		if (isEmpty(userId))
			throw new HTTPException(StatusCodes.BAD_REQUEST, "UserId is required");
		let orders = [];
		// create order for each dish
		for (const dishOrder of dishes) {
			const dish = await this.dishModel.findById(dishOrder.id);
			if (!dish) {
				throw new HTTPException(
					StatusCodes.NOT_FOUND,
					`dish with ID ${dishOrder.id} not found`
				);
			}
			if (dishOrder.quantity <= 0) {
				throw new HTTPException(
					StatusCodes.BAD_REQUEST,
					`Invalid quantity for dish ID ${dishOrder.id}`
				);
			}
			const totalCost = dish.price * dishOrder.quantity;
			const newOrder = await this.dishOrderModel.create({
				event: eventId,
				dish: dish._id,
				quantity: dishOrder.quantity,
				cost: totalCost,
				user: userId,
			});
			if (!newOrder) {
				throw new HTTPException(
					StatusCodes.INTERNAL_SERVER_ERROR,
					`Failed to create order for dish ID ${dishOrder.id}`
				);
			}
			orders.push(newOrder);
		}

		return orders;
	}
}

export default DishService;
