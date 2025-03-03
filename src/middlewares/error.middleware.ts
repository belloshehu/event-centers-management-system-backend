import { NextFunction,  Response, Request } from "express";
import HTTPException from "../exceptions/http.exception";
import { StatusCodes } from "http-status-codes";
import { RequestWithUser } from "../interfaces/auth.interface";

const errorMiddleware = async (
	error: HTTPException,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const status: number = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
		const message: string = error.message || "Something went wrong";
		res.status(status).json({ message });
	} catch (error) {
		next(error);
	}
};

export default errorMiddleware;
