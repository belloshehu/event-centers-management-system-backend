import { TimeStamps } from "@/typing/util.typing";
import { Document } from "mongoose";

export interface IUser extends Document<any>, TimeStamps {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	varified: boolean;
	varificationToken?: string;
	verificationTokenExpiresBy: number;
	role: "admin" | "user" | "partner";
}
