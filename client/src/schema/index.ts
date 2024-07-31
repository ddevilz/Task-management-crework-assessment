import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password is required" }),
  code: z.optional(z.string()),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().email({ message: "Email is required." }),
  password: z.string().min(6, { message: "Minimum 6 characters is required." }),
});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;

export const TaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.enum(["To Do", "In Progress", "Under Review", "Finished"]),
  priority: z.enum(["Low", "Medium", "Urgent"]),
  deadline: z.string().optional(),
  user: z.any(),
});

export type TaskSchemaType = z.infer<typeof TaskSchema>;
