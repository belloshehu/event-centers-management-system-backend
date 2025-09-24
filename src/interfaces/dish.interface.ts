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

// interface for dish order model
export interface IDishOrder extends Document<any>, TimeStamps {
	dish: Schema.Types.ObjectId;
	quantity: number;
	cost: number;
	orderDate: Date;
	user: Schema.Types.ObjectId;
	status: "pending" | "completed" | "cancelled";
	event?: Schema.Types.ObjectId;
}

export interface IDishMethods {
	getDish: (id: string) => Promise<IDish | null>;
	getDishs: () => Promise<IDish[]>;
	createDish: (data: IDish) => Promise<IDish>;
	updateDish: (id: string, data: IDish) => Promise<IDish | null>;
	deleteDish: (id: string) => Promise<IDish | null>;
}
