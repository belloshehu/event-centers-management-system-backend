import { TimeStamps } from "@/typing/util.typing";
import { Document, Schema } from "mongoose";

export interface IEventCenterBooking extends Document<any>, TimeStamps {
	event_center: Schema.Types.ObjectId; // event center id
	user: Schema.Types.ObjectId; // user id
	event: Schema.Types.ObjectId; // event id
	booking_status: "pending" | "successful" | "cancelled";
	payment_status: "pending" | "successful" | "failed";
	payment_reference: string;
	payment_date: Date;
	payment_amount: number;
	payment_currency: "NGN" | "USD";
	payment_method: "card" | "bank" | "cash";
	payment_description?: string;
	entertainers?: Schema.Types.ObjectId[];
}
