import { IBeverage, IBeverageOrder } from "@/interfaces/beverage.interface";
import { model, Model, Schema } from "mongoose";

type BeverageModelType = Model<IBeverage>;

const BeverageSchema = new Schema<IBeverage, BeverageModelType>(
	{
		name: {
			type: String,
			required: [true, "Name is required"],
			trim: true,
		},
		caterer: {
			type: Schema.Types.ObjectId,
			required: [true, "Caterer is required"],
			ref: "Caterer",
		},
		image: {
			type: String,
			required: false,
		},
		description: {
			type: String,
			required: [true, "Description is required"],
			trim: true,
		},
		available: {
			type: Boolean,
			required: [true, "Availability is required"], // events that Beverage is available for
		},
		price: {
			type: Number,
			required: [true, "Price is required"],
			trim: true,
		},
		size: {
			type: Number,
			required: [true, "Size is required"],
			trim: true,
		}, // in ml
		quantity: {
			type: Number,
			required: [true, "Quantity is required"],
			trim: true,
			default: 0,
			min: [0, "Quantity cannot be less than 0"],
		},
	},
	{ timestamps: true, toJSON: { virtuals: true } }
	// set this to use virtual below
);

BeverageSchema.index({ caterer: 1, name: 1 }, { unique: true });

BeverageSchema.virtual("rating").get(function async() {
	return 4;
});

BeverageSchema.virtual("reviews", {
	ref: "Review",
	localField: "_id",
	foreignField: "BeverageId",
	justOne: false,
});

const BeverageModel = model<IBeverage, BeverageModelType>(
	"Beverage",
	BeverageSchema
);
export default BeverageModel;

// Beverage order model
type BeverageOrderModelType = Model<IBeverageOrder>;
const BeverageOrderSchema = new Schema<IBeverageOrder, BeverageOrderModelType>(
	{
		beverage: {
			type: Schema.Types.ObjectId,
			required: [true, "Beverage is required"],
			ref: "Beverage",
		},
		quantity: {
			type: Number,
			required: [true, "Quantity is required"],
			min: [1, "Quantity must be at least 1"],
		},
		cost: {
			type: Number,
			required: [true, "Cost is required"],
			min: [0, "Cost cannot be less than 0"],
		},
		orderDate: {
			type: Date,
			required: [true, "Order date is required"],
			default: Date.now,
		},
		status: {
			type: String,
			enum: ["pending", "completed", "cancelled"],
			default: "pending",
		},
		user: {
			type: Schema.Types.ObjectId,
			required: [true, "User is required"],
			ref: "User",
		},
		event: {
			type: Schema.Types.ObjectId,
			ref: "Event",
		},
	},
	{ timestamps: true }
);

// Ensure a user can only order the same beverage once per day
BeverageOrderSchema.index(
	{ beverage: 1, user: 1, orderDate: 1 },
	{ unique: true }
);
export const BeverageOrderModel = model<IBeverageOrder, BeverageOrderModelType>(
	"BeverageOrder",
	BeverageOrderSchema
);
