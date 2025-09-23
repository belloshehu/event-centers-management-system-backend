import DishModel from "@/models/dish.model";
import DishService from "@/services/dish.service";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

class DishController {
	// Controller methods will go here
	public dishService = new DishService();

	// create dish
	public createDish = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const dish = await this.dishService.createDish(
				req.body,
				req.params.catererId
			);
			res
				.status(StatusCodes.CREATED)
				.json({ data: dish, message: "Dish created" });
		} catch (error) {
			next(error);
		}
	};

	// get single dish by id
	public getDishById = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const dish = await this.dishService.getDishById(req.params.id);
			res.status(StatusCodes.OK).json({ data: dish, message: "Dish found" });
		} catch (error) {
			next(error);
		}
	};

	// get all dishes
	public getDishes = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { limit = 20, page = 1 } = req.query;
			const dishes = await this.dishService.getDishes({
				limit: Number(limit),
				page: Number(page),
			});
			res
				.status(StatusCodes.OK)
				.json({ data: dishes, message: "All dishes list" });
		} catch (error) {
			next(error);
		}
	};

	// get all dishes by caterer id
	public getDishesByCatererId = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const dishes = await this.dishService.getDishesByCatererId(
				req.params.catererId
			);
			res
				.status(StatusCodes.OK)
				.json({ data: dishes, message: "Dishes by caterer id list" });
		} catch (error) {
			next(error);
		}
	};

	// update dish by id
	public updateDish = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const dish = await this.dishService.updateDish(req.params.id, req.body);
			res.status(StatusCodes.OK).json({ data: dish, message: "Dish updated" });
		} catch (error) {
			next(error);
		}
	};

	// delete dish by id
	public deleteDish = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const dish = await this.dishService.deleteDish(req.params.id);
			res.status(StatusCodes.OK).json({ data: dish, message: "Dish deleted" });
		} catch (error) {
			next(error);
		}
	};
}

export default DishController;
