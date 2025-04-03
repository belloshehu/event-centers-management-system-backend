import { suppertedlanguages, supportedEvents } from "@/constants";
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
	address: z.string().min(10, "Address must be at least 10 characters long"),
	city: z.string().min(3, "City must be at least 3 characters long"),
	state: z.string().min(3, "State must be at least 3 characters long"),
	country: z.string().min(3, "Country must be at least 3 characters long"),
	available_for: z
		.array(z.enum(supportedEvents as [string]))
		.min(1, "At least one event type is required"),
	performance_duration: z
		.number()
		.min(30, "Performance duration must be at least 30 minutes long"),
	performance_languages: z
		.array(z.enum(suppertedlanguages as [string]))
		.min(1, "At least one language is required"),
	availability: z.enum(["available", "booked"]),
	price: z.number().min(0, "Price must be greater than 0"),
	currency: z.enum([
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
	]),
});
export type EntertainerDataType = z.infer<typeof entertainerValidationSchema>;
