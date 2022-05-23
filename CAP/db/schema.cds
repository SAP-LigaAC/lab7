namespace sap.ui.bookings;

using {managed} from '@sap/cds/common';

entity Bookings : managed {
  key ID                : String;
      flightDate        : Date;
      flightDestination : String;
      firstName         : String;
      lastName          : String;
      emailAddress      : String;
      phoneNumber       : String;
}
