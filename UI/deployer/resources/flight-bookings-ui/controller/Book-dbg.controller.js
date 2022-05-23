sap.ui.define([
    'flight/bookings/ui/controller/BaseController',
    'sap/ui/model/json/JSONModel'
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("flight.bookings.ui.controller.Book", {
        onInit: function () {
            this.oNewBookingModel = new JSONModel();
            this.getView().setModel(this.oNewBookingModel, "newBookingModel");
            this.getRouter().getRoute("book").attachPatternMatched(this.onPatternMatched, this);
        },

        onPatternMatched: function () {
            this.oNewBookingModel.setJSON(`{
                "booking" : {
                    "id": null,
                    "firstName": null,
                    "lastName": null,
                    "emailAddress": null,
                    "phoneNumber": null,
                    "flightDate": null,
                    "flightDestination": null
                }
            }`);

            const oToday = new Date();
            const oTomorrow = new Date();
            oTomorrow.setDate(oToday.getDate() + 1);

            this.oNewBookingModel.setProperty("/minFlightDate", oTomorrow);
        },

        onPressBook: function (oEvent) {
            const oBookPage = this.byId("idBookPage");
            oBookPage.setBusy(true);

            const oNewBooking = this.oNewBookingModel.getData().booking;
            oNewBooking.flightDate = new Date(oNewBooking.flightDate).toISOString();

            this.post(`/core/api/booking`, oNewBooking)
                .then(oResponse => {
                    this.getRouter().navTo("booking", { bookingId: oNewBooking.id });
                })
                .catch(oError => {
                    const sGenericErrorMessage = this.getI18nMessage("generic.error.message");
                    this.MessageBox.error(sGenericErrorMessage);
                })
                .finally(() => {
                    oBookPage.setBusy(false);
                });
        }
    });
});