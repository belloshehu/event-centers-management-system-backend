import { IEntertainer } from "@/interfaces/entertainer.interface";
import { Model, Schema } from "mongoose";

type EntertainentModelType = Model<IEntertainer>;

const EntertainentSchema = new Schema<IEntertainer, EntertainentModelType>({
	name: {
		type: String,
		required: [true, "Name is required"],
		trim: true,
	},
	phone: {
		type: String,
		required: [true, "Phone is required"],
		trim: true,
	},
	email: {
		type: String,
		required: [true, "Email is required"],
		trim: true,
	},
	userId: {
		type: Schema.Types.ObjectId,
		required: [true, "User is required"],
		ref: "User",
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
	},
});
