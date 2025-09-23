import { TimeStamps } from "@/typing/util.typing";
import { Document, Schema } from "mongoose";

export interface ICaterer extends Document<any>, TimeStamps {
	name: string;
	userId: Schema.Types.ObjectId;
	images: string[];
	description: string;
	contact_number: string;
	contact_email: string;
	address: string;
	city: string;
	state: string;
	country: string;
	available_for: string[];
	availability: "available" | "booked";
	rating: number;
}

export interface ICatererMethods {
	getCaterer: (id: string) => Promise<ICaterer | null>;
	getCaterers: () => Promise<ICaterer[]>;
	createCaterer: (data: ICaterer) => Promise<ICaterer>;
	updateCaterer: (id: string, data: ICaterer) => Promise<ICaterer | null>;
	deleteCaterer: (id: string) => Promise<ICaterer | null>;
}
