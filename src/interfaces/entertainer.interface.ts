import { TimeStamps } from "@/typing/util.typing";
import { Document, Schema } from "mongoose";

export interface IEntertainer extends Document<any>, TimeStamps {
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
	type: "music" | "comedy" | "dance" | "dj" | "mc" | "hypeman" | "others";
	available_for: string[];
	performance_duration: string;
	performance_languages: string[];
	availability: "available" | "booked";
	price: number;
	currency: "NGN" | "USD";
	rating: number;
}

export interface IEntertainerMethods {
	getEntertainer: (id: string) => Promise<IEntertainer | null>;
	getEntertainers: () => Promise<IEntertainer[]>;
	createEntertainer: (data: IEntertainer) => Promise<IEntertainer>;
	updateEntertainer: (
		id: string,
		data: IEntertainer
	) => Promise<IEntertainer | null>;
	deleteEntertainer: (id: string) => Promise<IEntertainer | null>;
}
