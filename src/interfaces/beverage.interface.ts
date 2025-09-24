import { TimeStamps } from "@/typing/util.typing";
import { Document, Schema } from "mongoose";

export interface IBeverage extends Document<any>, TimeStamps {
	name: string;
	caterer: Schema.Types.ObjectId;
	image: string;
	description: string;
	price: number;
	size: number; // in ml
	quantity: number;
	available: boolean;
}

export interface IBeverageOrder extends Document<any>, TimeStamps {
	beverage: Schema.Types.ObjectId;
	quantity: number;
	cost: number;
	orderDate: Date;
	user: Schema.Types.ObjectId;
	status: "pending" | "completed" | "cancelled";
	event?: Schema.Types.ObjectId;
}

export interface IBeverageMethods {
	getBeverage: (id: string) => Promise<IBeverage | null>;
	getBeverages: () => Promise<IBeverage[]>;
	createBeverage: (data: IBeverage) => Promise<IBeverage>;
	updateBeverage: (id: string, data: IBeverage) => Promise<IBeverage | null>;
	deleteBeverage: (id: string) => Promise<IBeverage | null>;
}
