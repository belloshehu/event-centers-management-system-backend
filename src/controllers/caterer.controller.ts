import CatererService from "@/services/caterer.service";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { RequestWithUser } from "@/interfaces/auth.interface";

class CatererController {
	public CatererService = new CatererService();
	private defaultPage = 1;
	private defaultLimit = 20;

	// create Caterer
	public createCaterer = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) => {
		try {
			const CatererData = req.body;
			const Caterer = await this.CatererService.createCaterer(
				CatererData,
				req.user?._id
			);
			res
				.status(StatusCodes.CREATED)
				.json({ data: Caterer, message: "Caterer created" });
		} catch (error) {
			next(error);
		}
	};

	// get all Caterers
	public getCaterers = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { availability } = req.query;
			const Caterers = await this.CatererService.getCaterers({
				limit: this.defaultLimit,
				page: this.defaultPage,
				filter: {
					availability: availability as "all" | "available" | "booked",
				},
			});
			res
				.status(StatusCodes.OK)
				.json({ data: Caterers, message: "All Caterers list" });
		} catch (error) {
			next(error);
		}
	};

	// get single Caterer by id
	public getCatererById = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const Caterer = await this.CatererService.getCatererById(req.params.id);
			res
				.status(StatusCodes.OK)
				.json({ data: Caterer, message: "Single Caterer" });
		} catch (error) {
			console.log(error);
			next(error);
		}
	};

	// get single Caterer by user id
	public getCatererByUserId = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) => {
		try {
			const caterer = await this.CatererService.getCatererByUserId(
				req.user?._id
			);
			res
				.status(StatusCodes.OK)
				.json({ data: caterer, message: "Single Caterer by User ID" });
		} catch (error) {
			console.log(error);
			next(error);
		}
	};

	// update Caterer
	public updateCaterer = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const Caterer = await this.CatererService.updateCaterer(
				req.params.id,
				req.body
			);
			res
				.status(StatusCodes.CREATED)
				.json({ data: Caterer, message: "Caterer updated" });
		} catch (error) {
			next(error);
		}
	};

	// delete Caterer
	public deleteCaterer = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const Caterer = await this.CatererService.deleteCaterer(req.params.id);
			res
				.status(StatusCodes.OK)
				.json({ data: Caterer, message: "Caterer deleted" });
		} catch (error) {
			next(error);
		}
	};
}

export default CatererController;
