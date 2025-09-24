import z from "zod";

export const beverageValidationSchema = z.object({
	name: z.string().min(3, "Name must be at least 3 characters long"),
	image: z.string().min(1, "Dish image required"),
	description: z
		.string()
		.min(20, "Description must be at least 20 characters long"),
	quantity: z.coerce.number().min(0, "Quantity must be or greater than 0"),
	price: z.coerce.number().min(0, "Price must be greater than 0"),
	size: z.coerce.number().min(0, "Size must be greater than 0"),
	available: z.boolean().optional().default(true),
});
export type IBeverageDataType = z.infer<typeof beverageValidationSchema>;

export const beverageOrderValidationSchema = z.object({
	beverage: z.string().min(1, "Beverage ID is required"),
	quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
	cost: z.coerce.number().min(0, "Cost must be greater than or equal to 0"),
	orderDate: z.coerce.date().optional().default(new Date()),
	status: z
		.enum(["pending", "completed", "cancelled"])
		.optional()
		.default("pending"),
	event: z.string().optional(),
	user: z.string().min(1, "User ID is required"),
});

export type IBeverageOrderDataType = z.infer<
	typeof beverageOrderValidationSchema
>;
