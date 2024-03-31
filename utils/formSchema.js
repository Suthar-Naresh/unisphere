import { z } from 'zod';

const loginSchema = z.object({
  login_email: z.string().email(),
  login_password: z.string().min(8, 'Password must contain at least 8 characters'),
});

const signUpSchema = z.object({
  signup_name: z.string().min(2),
  signup_email: z.string().email(),
  signup_password: z.string().min(8, 'Password must contain at least 8 characters'),
  signup_retypePassword: z.string(),
  signup_universityName: z.string().min(1, 'Please select your university.'),
}).refine(data => data.signup_password === data.signup_retypePassword, {
  message: 'Passwords do not match',
  path: ['signup_retypePassword'], // Path to the field where the error should be displayed
});

const EventSchema = z.object({
  event_poster: z.string().url(),
  event_name: z.string().min(1).max(255),
  event_starts: z.date(),
  event_ends: z.date(),
  event_start_registration: z.date(),
  event_end_registration: z.date(),
  event_description: z.string().min(1).max(2048),
  event_scope: z.enum(["uni_only", "for_all"]),
  event_price: z.number().int('Price should be in integers only.').min(10, 'Ticket price should be at least ₹10.'),
  event_organizer: z.string().min(1).max(255),
});

const AnnouncementSchema = z.object({
  announcement_title: z.string().min(5,'Title must contain at least 5 characters.').max(255),
  announcement_description: z.string().min(10,'Description must contain at least 10 characters.').max(2048),
});

export {
  loginSchema,
  signUpSchema,
  EventSchema,
  AnnouncementSchema
}
