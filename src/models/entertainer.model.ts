import { IEntertainer } from "@/interfaces/entertainer.interface";
import { model, Model, Schema } from "mongoose";

type EntertainerModelType = Model<IEntertainer>;

const EntertainerSchema = new Schema<IEntertainer, EntertainerModelType>(
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
		type: {
			type: String,
			required: [true, "Type is required"],
			enum: ["music", "comedy", "dance", "dj", "mc", "hypeman", "others"],
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
			required: [true, "Available for is required"],
		},
		performance_duration: {
			type: Number,
			required: [true, "Performance duration is required"],
		},
		performance_languages: {
			type: [String],
			required: [true, "Performance languages is required"],
		},
		availability: {
			type: String,
			required: [true, "Availability is required"],
			enum: ["available", "booked", "unavailable"],
		},
		price: {
			type: Number,
			required: [true, "Price is required"],
		},
		currency: {
			type: String,
			required: [true, "Currency is required"],
			enum: [
				"NGN",
				"USD",
				"EUR",
				"GBP",
				"CAD",
				"AUD",
				"ZAR",
				"GHS",
				"KES",
				"SAR",
			],
			default: "NGN",
		},
	},
	{ timestamps: true, toJSON: { virtuals: true } }
	// set this to use virtual below
);

EntertainerSchema.index({ userId: 1, email: 1 }, { unique: true });

EntertainerSchema.virtual("full_address").get(function () {
	return `${this.address}, ${this.city}, ${this.state}, ${this.country}`;
});

EntertainerSchema.virtual("rating").get(function async() {
	return 4;
});

EntertainerSchema.virtual("reviews", {
	ref: "Review",
	localField: "_id",
	foreignField: "entertainerId",
	justOne: false,
});

const EntertainerModel = model<IEntertainer, EntertainerModelType>(
	"Entertainer",
	EntertainerSchema
);

export default EntertainerModel;
