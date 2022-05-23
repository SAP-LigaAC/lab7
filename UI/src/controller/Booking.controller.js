sap.ui.define([
    'flight/bookings/ui/controller/BaseController',
    'sap/ui/model/json/JSONModel'
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("flight.bookings.ui.controller.Booking", {
        onInit: function () {
            this.oBookingModel = new JSONModel({});
            this.oLocalModel = new JSONModel({});
            this.getView().setModel(this.oLocalModel, "localModel");
            this.getView().setModel(this.oBookingModel, "bookingModel");
            this.getRouter().getRoute("booking").attachPatternMatched(this.onPatternMatched, this);

            this.valueStateModel = new JSONModel();
            this.getView().setModel(this.valueStateModel, "valueStateModel");

            this.oLocalModel.setProperty("/isInEditMode", false);
        },

        onPatternMatched: function (oEvent) {
            this._resetBookingModel();
            this.sBookingId = oEvent.getParameter("arguments").bookingId;
            const oBookingPage = this.byId("idBookingPage");
            oBookingPage.setBusy(true);

            this.getBookingDetails(oBookingPage);
        },

        getBookingDetails: function (oBookingPage) {
            this.read(`http://localhost:4004/bookings/Bookings/${this.sBookingId}`)
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

        onNavHomePress: function () {
            this.getRouter().navTo("bookings");
        },

        _resetBookingModel: function () {
            this.oBookingModel.setJSON(`{
                "booking" : {
                    "ID": null,
                    "FlightDate": null,
                    "FlightDestination": null,
                    "FirstName": null,
                    "LastName": null,
                    "EmailAddress": null,
                    "PhoneNumber": null
                }
            }`);
        },

        onEditPress: function () {
            this.oLocalModel.setProperty("/isInEditMode", true);
        },

        onDeletePress: function () {
            const oBookingPage = this.byId("idBookingPage");
            oBookingPage.setBusy(true);

            this.delete(`http://localhost:4004/bookings/Bookings/${this.sBookingId}`)
                .then(() => {
                    oBookingPage.setBusy(false);
                })
                .catch(oError => {
                    debugger
                })
                .finally(() => {
                    this.onNavHomePress();
                });
        },

        onCancelEditPress: function () {
            this.oLocalModel.setProperty("/isInEditMode", false);
        },

        onEditDonePress: function () {

            const oBookingPage = this.byId("idBookingPage");
            const dataToBeSent = this.oBookingModel.getProperty("/booking");

            if (this.validateBooking(dataToBeSent)) {
                oBookingPage.setBusy(true);
                this.put(`http://localhost:4004/bookings/Bookings${this.sBookingId}`, dataToBeSent)
                    .then(() => {
                        this.onCancelEditPress();
                    })
                    .catch(oError => {
                        debugger
                    })
                    .finally(() => {
                        this.getBookingDetails(oBookingPage);
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
    });
});