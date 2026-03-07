import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/\d/, "Password must contain at least one number");

export const loginSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export const UserRegisterSchema = z
  .object({
    first_name: z.string().min(2, "First name is too short"),
    last_name: z.string().min(2, "Last name is too short"),
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.email("Invalid email address"),
    phone_number: z
      .string()
      .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format"),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z.email("Please enter a valid work email"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type UserRegisterFormData = z.infer<typeof UserRegisterSchema>;
export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;
