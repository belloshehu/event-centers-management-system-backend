import BeverageService from "@/services/beverage.service";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

class BeverageController {
	// Controller methods go here
	private beverageService = new BeverageService();

	// create beverage
	public createBeverage = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const beverage = await this.beverageService.createBeverage(
				req.body,
				req.params.catererId
			);
			res
				.status(StatusCodes.CREATED)
				.json({ data: beverage, message: "Beverage created" });
		} catch (error) {
			next(error);
		}
	};

	// get single beverage by id
	public getDishById = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const beverage = await this.beverageService.getBeverageById(
				req.params.id
			);
			res
				.status(StatusCodes.OK)
				.json({ data: beverage, message: "Beverage found" });
		} catch (error) {
			next(error);
		}
	};

	// get all beverages
	public getBeverages = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { limit = 20, page = 1 } = req.query;
			const beverages = await this.beverageService.getBeverages({
				limit: Number(limit),
				page: Number(page),
			});
			res
				.status(StatusCodes.OK)
				.json({ data: beverages, message: "All beverages list" });
		} catch (error) {
			next(error);
		}
	};

	// get all beverages by caterer id
	public getBeveragesByCatererId = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const beverages = await this.beverageService.getBeveragesByCatererId(
				req.params.catererId
			);
			res
				.status(StatusCodes.OK)
				.json({ data: beverages, message: "Beverages by caterer id" });
		} catch (error) {
			next(error);
		}
	};

	// update beverage by id
	public updateBeverage = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const beverage = await this.beverageService.updateBeverage(
				req.params.id,
				req.body
			);
			res
				.status(StatusCodes.OK)
				.json({ data: beverage, message: "Beverage updated" });
		} catch (error) {
			next(error);
		}
	};

	// delete beverage by id
	public deleteBeverage = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			await this.beverageService.deleteBeverage(req.params.id);
			res.status(StatusCodes.OK).json({ message: "Beverage deleted" });
		} catch (error) {
			next(error);
		}
	};
}

export default BeverageController;
