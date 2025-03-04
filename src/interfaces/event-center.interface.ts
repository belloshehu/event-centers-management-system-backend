import { TimeStamps } from "@/typing/util.typing";
import { Document, Schema } from "mongoose";

export type EventCenterSupportedEventsTypes =
	| "wedding"
	| "birthday"
	| "conference"
	| "concert"
	| "party"
	| "others"
	| "training";

export interface IEventCenter extends Document<any>, TimeStamps {
	name: string;
	address: string;
	city: string;
	state: string;
	country: string;
	capacity: number;
	price: number;
	description: string;
	images: string[];
	userId: Schema.Types.ObjectId;
	supported_events_types: string[];
	contact_number: string;
	contact_email: string;
}

export interface IEventCenterMethods {
	findWithPagination: (limit: number, page: number) => Promise<IEventCenter[]>;
}
