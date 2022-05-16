using { sap.ui.bookings as mySchema } from '../db/schema';

@path: '/bookings'
service BookingsService {
  entity Bookings as projection on mySchema.Bookings;
}