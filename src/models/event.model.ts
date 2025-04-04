import { supportedEvents } from "@/constants";
import { IEvent } from "@/interfaces/event.interface";
import { model, Model, Schema } from "mongoose";

type EventModelType = Model<IEvent>;

const EventSchema = new Schema<IEvent, EventModelType>(
	{
		name: {
			type: String,
			required: [true, "Name is required"],
			trim: true,
		},
		description: {
			type: String,
			required: [true, "Description is required"],
			trim: true,
		},
		eventCenter: {
			type: Schema.Types.ObjectId,
			ref: "EventCenter",
			required: [true, "Event Center is required"],
		},
		startDate: {
			type: Date,
			required: [true, "Event Date is required"],
		},
		endDate: {
			type: Date,
			required: [true, "Event Date is required"],
		},
		startTime: {
			type: String,
			required: [true, "Event Start Time is required"],
		},
		endTime: {
			type: String,
			required: [true, "Event End Time is required"],
		},
		cost: {
			type: Number,
			required: false,
		},
		images: {
			type: [String],
			required: false,
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: [true, "User is required"],
		},
		eventType: {
			enum: supportedEvents,
			type: String,
			required: [true, "Event Type is required"],
		},
		entertainers: {
			type: [Schema.Types.ObjectId],
			ref: "Entertainer",
			required: false,
		},
	},
	{ timestamps: true }
);
EventSchema.index(
	{ eventCenter: 1, startDate: 1, endDate: 1, startTime: 1, endTime: 1 },
	{ unique: true }
);

const EventModel = model<IEvent, EventModelType>("Event", EventSchema);
export default EventModel;
