import EntertainerService from "@/services/entertainer.service";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { RequestWithUser } from "@/interfaces/auth.interface";

class EntertainerController {
	public entertainerService = new EntertainerService();
	private defaultPage = 1;
	private defaultLimit = 20;

	// create entertainer
	public createEntertainer = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) => {
		try {
			const entertainerData = req.body;
			const entertainer = await this.entertainerService.createEntertainer(
				entertainerData,
				req.user?._id
			);
			res
				.status(StatusCodes.CREATED)
				.json({ data: entertainer, message: "Entertainer created" });
		} catch (error) {
			next(error);
		}
	};

	// get all entertainers
	public getEntertainers = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const entertainers = await this.entertainerService.getEntertainers({
				limit: this.defaultLimit,
				page: this.defaultPage,
			});
			res
				.status(StatusCodes.OK)
				.json({ data: entertainers, message: "All entertainers list" });
		} catch (error) {
			next(error);
		}
	};

	// get single entertainer by id
	public getEntertainerById = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const entertainer = await this.entertainerService.getEntertainerById(
				req.params.id
			);
			res
				.status(StatusCodes.OK)
				.json({ data: entertainer, message: "Single entertainer" });
		} catch (error) {
			console.log(error);
			next(error);
		}
	};

	// update entertainer
	public updateEntertainer = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const entertainer = await this.entertainerService.updateEntertainer(
				req.params.id,
				req.body
			);
			res
				.status(StatusCodes.CREATED)
				.json({ data: entertainer, message: "Entertainer updated" });
		} catch (error) {
			next(error);
		}
	};

	// delete entertainer
	public deleteEntertainer = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const entertainer = await this.entertainerService.deleteEntertainer(
				req.params.id
			);
			res
				.status(StatusCodes.OK)
				.json({ data: entertainer, message: "Entertainer deleted" });
		} catch (error) {
			next(error);
		}
	};
}

export default EntertainerController;
