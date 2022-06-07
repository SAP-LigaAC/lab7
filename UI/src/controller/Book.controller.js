sap.ui.define([
    'flight/bookings/ui/controller/BaseController',
    'sap/ui/model/json/JSONModel'
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("flight.bookings.ui.controller.Book", {
        onInit: function () {
            this.oNewBookingModel = new JSONModel();
            this.getView().setModel(this.oNewBookingModel, "newBookingModel");

            this.valueStateModel = new JSONModel();
            this.getView().setModel(this.valueStateModel, "valueStateModel");

            this.getRouter().getRoute("book").attachPatternMatched(this.onPatternMatched, this);
        },

        onPatternMatched: function () {
            this.oNewBookingModel.setJSON(`{
                "booking" : {
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

            const oNewBooking = this.oNewBookingModel.getData().booking;

            if (this.validateBooking(oNewBooking)) {
                oNewBooking.flightDate = new Date(oNewBooking.flightDate).toISOString();
                oBookPage.setBusy(true);

                this.post(`http://localhost:4004/bookings/Bookings`, oNewBooking)
                    .then(oResponse => {
                        this.getRouter().navTo("booking", { bookingId: oResponse.ID });
                    })
                    .catch(oError => {
                        const sGenericErrorMessage = this.getI18nMessage("generic.error.message");
                        this.MessageBox.error(sGenericErrorMessage);
                    })
                    .finally(() => {
                        oBookPage.setBusy(false);
                    });
            }
        },

        validateBooking: function (booking) {
            let isValidBooking = true;
            if (!this.validateEmail(booking.emailAddress)) {
                this.getView().getModel("valueStateModel").setProperty('/emailError', "Error");
                isValidBooking = false;
            } else {
                this.getView().getModel("valueStateModel").setProperty('/emailError', "None");
            }
            if (!this.validatePhone(booking.phoneNumber)) {
                this.getView().getModel("valueStateModel").setProperty('/phoneError', "Error");
                isValidBooking = false;
            } else {
                this.getView().getModel("valueStateModel").setProperty('/phoneError', "None");
            }

            return isValidBooking;
        },

        onNavHomePress: function () {
            this.getRouter().navTo("bookings");
        }
    });
});