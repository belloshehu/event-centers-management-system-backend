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
	},
	{ timestamps: true }
);

EntertainerSchema.index({ userId: 1, email: 1 }, { unique: true });

const EntertainerModel = model<IEntertainer, EntertainerModelType>(
	"Entertainer",
	EntertainerSchema
);

export default EntertainerModel;
