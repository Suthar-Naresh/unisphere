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
  event_name: z.string().min(1).max(255),
  event_description: z.string().min(1).max(2048),
  event_date: z.string().refine((dateString) => {
    // Regular expression to match the format "DD/MM/YYYY"
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regex.test(dateString)) return false; // Invalid format
    // Extract day, month, and year from the date string
    const [day, month, year] = dateString.split('/');
    // Convert the date string to a Date object
    const eventDate = new Date(`${year}-${month}-${day}`);
    // Get today's date
    const today = new Date();
    // Return true if the event date is greater than or equal to today's date
    return eventDate >= today;
  }, { message: 'Invalid date format or date must be greater than or equal to today' }),
  event_start_registration: z.date(),
  event_end_registration: z.date(),
  event_scope: z.enum(["uni_only", "for_all"]),
  event_poster: z.string().url(),
  event_organizer: z.string().min(1).max(255),
  event_price: z.number().int('Price should be in integers only.').min(10,'Ticket price should be at least ₹10.'),
  event_start: z.date(),
  event_end: z.date(),
  isPaid:z.boolean(),
}).refine(data => data.isPaid === false || (data.isPaid === true && data.event_price), {
  message: "Role field is required when subject equals 1",
  path: ['role'] // Pointing out which field is invalid
});
;

export {
  loginSchema,
  signUpSchema,
  EventSchema
}
