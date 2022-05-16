namespace sap.ui.bookings;

using {managed} from '@sap/cds/common';

entity Bookings : managed {
  key ID                : UUID @(Core.Computed : true);
      flightDate        : Timestamp;
      flightDestination : String;
      firstName         : String;
      lastName          : String;
      emailAddress      : String;
      phoneNumber       : String;
}