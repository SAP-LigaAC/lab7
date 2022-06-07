sap.ui.define([
    'flight/bookings/ui/controller/BaseController',
    'sap/ui/model/json/JSONModel'
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("flight.bookings.ui.controller.Booking", {
        onInit: function () {
            this.oBookingModel = new JSONModel({});
            this.getView().setModel(this.oBookingModel, "bookingModel");
            this.getRouter().getRoute("booking").attachPatternMatched(this.onPatternMatched, this);
        },

        onPatternMatched: function (oEvent) {
            this._resetBookingModel();
            
            const oBookingPage = this.byId("idBookingPage");
            oBookingPage.setBusy(true);

            const sBookingId = oEvent.getParameter("arguments").bookingId;

            this.read(`/core/api/bookings/${sBookingId}`)
                .then(oResponse => {
                    this.oBookingModel.setProperty("/booking", oResponse);
                })
                .catch(oError => {
                    const sGenericErrorMessage = this.getI18nMessage("generic.error.message");
                    this.MessageBox.error(sGenericErrorMessage);
                })
                .finally(() => {
                    oBookingPage.setBusy(false);
                });
        },

        _resetBookingModel: function () {
            this.oBookingModel.setJSON(`{
                "booking" : {
                    "ID": null,
                    "BookingStatus": null,
                    "BookingDate": null,
                    "FlightDate": null,
                    "FlightDestination": null,
                    "FirstName": null,
                    "LastName": null,
                    "EmailAddress": null,
                    "PhoneNumber": null
                }
            }`);
        }
    });
});