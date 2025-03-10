import z from "zod";

export const entertainerValidationSchema = z.object({
	name: z.string().min(3, "Name must be at least 3 characters long"),
	userId: z.string().optional(),
	images: z.array(z.string()).min(1, "At least one image is required"),
	description: z
		.string()
		.min(20, "Description must be at least 20 characters long"),
	contact_number: z
		.string()
		.min(11, "Contact number must be at least 11 characters long"),
	contact_email: z.string().email(),
	type: z.enum(["music", "comedy", "dance", "dj", "mc", "hypeman", "others"]),
});
export type EntertainerDataType = z.infer<typeof entertainerValidationSchema>;
