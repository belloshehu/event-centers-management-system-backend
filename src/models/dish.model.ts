import { IDish } from "@/interfaces/dish.interface";
import { model, Model, Schema } from "mongoose";

type DishModelType = Model<IDish>;

const DishSchema = new Schema<IDish, DishModelType>(
	{
		name: {
			type: String,
			required: [true, "Name is required"],
			trim: true,
			unique: true,
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
			required: [true, "Availability is required"], // events that Dish is available for
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

DishSchema.index({ caterer: 1, name: 1 }, { unique: true });

DishSchema.virtual("rating").get(function async() {
	return 4;
});

DishSchema.virtual("reviews", {
	ref: "Review",
	localField: "_id",
	foreignField: "DishId",
	justOne: false,
});

const DishModel = model<IDish, DishModelType>("Dish", DishSchema);

export default DishModel;
