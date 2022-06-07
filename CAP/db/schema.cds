namespace sap.ui.bookings;

using {
  managed,
  cuid
} from '@sap/cds/common';

entity Bookings : cuid, managed {
  flightDate        : String;
  flightDestination : String;
  firstName         : String;
  lastName          : String not null;
  emailAddress      : String;
  phoneNumber       : String;
}