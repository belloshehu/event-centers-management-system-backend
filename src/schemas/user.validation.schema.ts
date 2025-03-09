import z from "zod";

export const createUserValidationSchema = z.object({
	name: z.string().min(3).max(255),
	email: z.string().email(),
	password: z.string().min(6).max(255),
	lastName: z.string().min(3).max(255),
	firstName: z.string().min(3).max(255),
});

export type CreateUserDto = z.infer<typeof createUserValidationSchema>;
