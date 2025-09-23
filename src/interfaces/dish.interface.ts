import { TimeStamps } from "@/typing/util.typing";
import { Document, Schema } from "mongoose";

export interface IDish extends Document<any>, TimeStamps {
	name: string;
	caterer: Schema.Types.ObjectId;
	image: string;
	description: string;
	price: number;
	size: number; // in ml
	quantity: number;
	available: boolean;
}

export interface IDishMethods {
	getDish: (id: string) => Promise<IDish | null>;
	getDishs: () => Promise<IDish[]>;
	createDish: (data: IDish) => Promise<IDish>;
	updateDish: (id: string, data: IDish) => Promise<IDish | null>;
	deleteDish: (id: string) => Promise<IDish | null>;
}
