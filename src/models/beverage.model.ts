import { IBeverage } from "@/interfaces/beverage.interface";
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
