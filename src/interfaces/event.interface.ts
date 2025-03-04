import { TimeStamps } from "@/typing/util.typing";
import { Document, Schema } from "mongoose";
import { EventCenterSupportedEventsTypes } from "./event-center.interface";

export interface IEvent extends Document<any>, TimeStamps {
	name: string;
	description: string;
	eventCenter: Schema.Types.ObjectId;
	startDate: Date;
	endDate: Date;
	startTime: string;
	endTime: string;
	cost?: number;
	images: string[];
	user: Schema.Types.ObjectId;
	eventType: EventCenterSupportedEventsTypes;
}
