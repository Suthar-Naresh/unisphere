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
  event_name: z.string().min(1,'Event name is required.').max(30,'Event title can\'t be grater than than 30 characters.'),
  event_description: z.string().min(1).max(2048),
  event_venue: z.string().min(1,'Please provide event venue/location.').max(1048),
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
