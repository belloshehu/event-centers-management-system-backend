import { supportedEvents } from "@/constants";
import { z } from "zod";

export const eventValidationSchema = z.object({
	name: z.string().min(5, "Name must be at least 5 characters long"),
	description: z
		.string()
		.min(20, "Description must be at least 20 characters long"),
	eventCenter: z.string(),
	startDate: z.string(),
	endDate: z.string(),
	startTime: z.string(),
	endTime: z.string(),
	cost: z.number().optional(),
	images: z.array(z.string()).min(1, "At least one image is required"),
	eventType: z.enum(supportedEvents as [string]),
});

export type IEventDataType = z.infer<typeof eventValidationSchema>;
