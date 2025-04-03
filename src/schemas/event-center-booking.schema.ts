import { z } from "zod";

export const eventCenterBookingSchema = z.object({
	event_center: z.string(),
	user: z.string().optional(),
	event: z.string(),
	booking_status: z.enum(["pending", "successful", "cancelled"]),
	payment_status: z.enum(["pending", "successful", "failed"]),
	payment_reference: z
		.string()
		.min(8, "Payment reference should be atleast 8 characters")
		.max(255, "Payment reference should not exceed 255 characters"),
	payment_date: z.coerce.date({ message: "Payment date is required" }),
	payment_amount: z
		.number({ message: "Payment amount is required" })
		.min(0, "Payment amount must be at least 0"),
	payment_currency: z.enum(["NGN", "USD"]),
	payment_method: z.enum(["card", "bank", "cash"]).optional(),
	payment_description: z.string().optional(),
	entertainers: z.array(z.string()).optional(),
});

export type IEventCenterBookingDataType = z.infer<
	typeof eventCenterBookingSchema
>;
