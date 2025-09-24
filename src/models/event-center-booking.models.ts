import { IEventCenterBooking } from "@/interfaces/event-center-booking.interface";
import { model, Model, Schema } from "mongoose";

type EventCenterBookingModelType = Model<IEventCenterBooking>;

const EventCenterBookingSchema = new Schema<
	IEventCenterBooking,
	EventCenterBookingModelType
>(
	{
		event_center: {
			type: Schema.Types.ObjectId,
			required: [true, "Event center is required"],
			ref: "EventCenter",
		},
		user: {
			type: Schema.Types.ObjectId,
			required: [true, "User is required"],
			ref: "User",
		},
		event: {
			type: Schema.Types.ObjectId,
			required: [true, "Event is required"],
			ref: "Event",
		},
		booking_status: {
			type: String,
			enum: ["pending", "successful", "cancelled"],
			default: "pending",
			required: false,
		},
		payment_status: {
			type: String,
			enum: ["pending", "successful", "failed"],
			default: "pending",
			required: false,
		},
		payment_reference: {
			type: String,
			required: [true, "Payment reference is required"],
		},
		payment_date: {
			type: Date,
			required: [true, "Payment date is required"],
		},
		payment_amount: {
			type: Number,
			required: [true, "Payment amount is required"],
		},
		payment_currency: {
			type: String,
			enum: ["NGN", "USD"],
			required: [true, "Payment currency is required"],
			default: "NGN",
		},
		payment_method: {
			type: String,
			enum: ["card", "bank", "cash"],
			required: [true, "Payment method is required"],
			default: "card",
		},
		payment_description: {
			type: String,
			required: false,
		},
		entertainers: {
			type: [Schema.Types.ObjectId],
			ref: "Entertainer",
			required: false,
			default: [],
		},
		beveragesOrder: {
			type: [Schema.Types.ObjectId],
			required: false,
			default: [],
			ref: "BeverageOrder",
		}, // array of beverage added to the event booking with quantity
		dishesOrder: {
			type: [Schema.Types.ObjectId],
			required: false,
			default: [],
			ref: "DishOrder",
		}, // array of dishes added to the event booking with quantity
	},
	{ timestamps: true }
);

const EventCenterBookingModel = model<
	IEventCenterBooking,
	EventCenterBookingModelType
>("EventCenterBooking", EventCenterBookingSchema);

EventCenterBookingSchema.index(
	{ event_center: 1, user: 1, event: 1 },
	{
		unique: true,
	}
);

export default EventCenterBookingModel;
