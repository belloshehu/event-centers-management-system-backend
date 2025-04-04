import {
	IEventCenter,
	IEventCenterMethods,
} from "@/interfaces/event-center.interface";
import { Model, model, Schema } from "mongoose";

type EventCenterModelType = Model<IEventCenter, {}, IEventCenterMethods>;

const EventCenterSchema = new Schema<
	IEventCenter,
	EventCenterModelType,
	IEventCenterMethods
>(
	{
		name: {
			type: String,
			required: [true, "Name is required"],
			trim: true,
		},
		address: {
			type: String,
			required: [true, "Address is required"],
			trim: true,
		},
		city: {
			type: String,
			required: [true, "City is required"],
			trim: true,
		},
		state: {
			type: String,
			required: [true, "State is required"],
			trim: true,
		},
		country: {
			type: String,
			required: [true, "Country is required"],
			trim: true,
		},
		capacity: {
			type: Number,
			required: [true, "Capacity is required"],
		},
		price: {
			type: Number,
			required: [true, "Price is required"],
		},
		description: {
			type: String,
			required: [true, "Description is required"],
			trim: true,
		},
		images: {
			type: [String],
			required: false,
		},
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: [true, "User is required"],
		},
		supported_events_types: {
			type: [String],
			required: [true, "Supported events types is required"],
		},
		status: {
			type: String,
			enum: ["active", "inactive", "booked", "pending", "available"],
			default: "active",
		},
	},
	{ timestamps: true }
);

EventCenterSchema.index({ name: 1, userId: 1, city: 1 }, { unique: true });

const EventCenterModel = model<IEventCenter, EventCenterModelType>(
	"EventCenter",
	EventCenterSchema
);

export default EventCenterModel;
