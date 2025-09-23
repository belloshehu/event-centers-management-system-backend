import { supportedEvents } from "@/constants";
import z from "zod";

export const catererValidationSchema = z.object({
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
	address: z.string().min(10, "Address must be at least 10 characters long"),
	city: z.string().min(3, "City must be at least 3 characters long"),
	state: z.string().min(3, "State must be at least 3 characters long"),
	country: z.string().min(3, "Country must be at least 3 characters long"),
	available_for: z
		.array(z.enum(supportedEvents as [string]))
		.min(1, "At least one event type is required"),
	availability: z.enum(["available", "booked"]),
});
export type CatererDataType = z.infer<typeof catererValidationSchema>;
