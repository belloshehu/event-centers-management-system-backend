import ICategory from "@/interfaces/category.interface";
import { Model, model, Schema } from "mongoose";

type CategoryModelType = Model<ICategory>;

const categorySchema: Schema<ICategory, CategoryModelType> = new Schema({
	categoryName: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

const CategoryModel = model<ICategory, CategoryModelType>(
	"Category",
	categorySchema
);

export default CategoryModel;
