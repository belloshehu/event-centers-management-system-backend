import { TimeStamps } from "@/typing/util.typing";
import { Document, Schema } from "mongoose";
import { z } from "zod";

export interface IEntertainer extends Document<any>, TimeStamps {
	name: string;
	phone: string;
	email: string;
	userId: Schema.Types.ObjectId;
	images: string[];
	description: string;
	contact_number: string;
	contact_email: string;
}
