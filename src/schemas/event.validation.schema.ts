import { supportedEvents } from "@/constants";
import { z } from "zod";

export const eventValidationSchema = z
	.object({
		name: z.string().min(5, "Name must be at least 5 characters long"),
		description: z
			.string()
			.min(20, "Description must be at least 20 characters long"),
		eventCenter: z.string(),
		startDate: z.string(),
		endDate: z.string(),
		startTime: z.string().time(),
		endTime: z.string().time(),
		cost: z.number().optional(),
		images: z.array(z.string()).min(1, "At least one image is required"),
		eventType: z.enum(supportedEvents as [string]),
	})
	.refine(
		(data) => {
			if (data.startDate > data.endDate) {
				return false;
			}
			return true;
		},
		{
			// path: ["startDate", "endDate"],
			message: "Start date must be less than end date",
		}
	)
	.refine(
		(data) => {
			if (data.startTime > data.endTime || data.startTime === data.endTime) {
				return false;
			}
			return true;
		},
		{
			// path: ["startTime", "endTime"],
			message: "Start time must be less than end time",
		}
	);

export type IEventDataType = z.infer<typeof eventValidationSchema>;
