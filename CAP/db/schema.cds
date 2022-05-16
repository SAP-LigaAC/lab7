namespace sap.ui.bookings;

using {managed} from '@sap/cds/common';

entity Bookings : managed {
  key ID                : UUID @(Core.Computed : true);
      flightDate        : Date;
      flightDestination : String;
      firstName         : String;
      lastName          : String;
      emailAddress      : String;
      phoneNumber       : String;
}