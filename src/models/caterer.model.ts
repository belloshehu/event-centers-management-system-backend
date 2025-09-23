import { ICaterer } from "@/interfaces/caterer.interface";
import { model, Model, Schema } from "mongoose";

type CatererModelType = Model<ICaterer>;

const CatererSchema = new Schema<ICaterer, CatererModelType>(
	{
		name: {
			type: String,
			required: [true, "Name is required"],
			trim: true,
		},
		userId: {
			type: Schema.Types.ObjectId,
			required: [true, "User is required"],
			ref: "User",
			unique: true,
		},
		images: {
			type: [String],
			required: false,
		},
		description: {
			type: String,
			required: [true, "Description is required"],
			trim: true,
		},
		contact_number: {
			type: String,
			required: [true, "Contact number is required"],
			trim: true,
		},
		contact_email: {
			type: String,
			required: [true, "Contact email is required"],
			trim: true,
			unique: true,
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
		available_for: {
			type: [String],
			required: [true, "Available for is required"], // events that Caterer is available for
		},
		availability: {
			type: String,
			required: [true, "Availability is required"],
			enum: ["available", "booked", "unavailable"],
		},
	},
	{ timestamps: true, toJSON: { virtuals: true } }
	// set this to use virtual below
);

CatererSchema.index({ userId: 1, email: 1 }, { unique: true });

CatererSchema.virtual("full_address").get(function () {
	return `${this.address}, ${this.city}, ${this.state}, ${this.country}`;
});

CatererSchema.virtual("rating").get(function async() {
	return 4;
});

CatererSchema.virtual("reviews", {
	ref: "Review",
	localField: "_id",
	foreignField: "catererId",
	justOne: false,
});

const CatererModel = model<ICaterer, CatererModelType>(
	"Caterer",
	CatererSchema
);

export default CatererModel;
