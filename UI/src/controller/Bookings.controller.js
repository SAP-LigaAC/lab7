sap.ui.define([
	'flight/bookings/ui/controller/BaseController',
	'sap/ui/model/json/JSONModel'
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("flight.bookings.ui.controller.Bookings", {
		onInit: function () {
			this.oBookingsModel = new JSONModel({});
			this.getView().setModel(this.oBookingsModel, "bookingsModel");
			this.getRouter().getRoute("bookings").attachPatternMatched(this.onPatternMatched, this);
		},

		onPatternMatched: function () {
			const oBookingsPage = this.byId("idBookingsPage");
			oBookingsPage.setBusy(true);

			this.read("http://localhost:4004/bookings/Bookings")
				.then(oResponse => {
					this.oBookingsModel.setProperty("/bookings", oResponse.value);
				})
				.catch(oError => {
					const sGenericErrorMessage = this.getI18nMessage("generic.error.message");
					this.MessageBox.error(sGenericErrorMessage);
				})
				.finally(() => {
					oBookingsPage.setBusy(false);
				});
		},

		onPressTableItem: function (oEvent) {
			const oTableItem = oEvent.getParameters().listItem;
			const oItemBindingContext = oTableItem.getBindingContext("bookingsModel");
			const oBooking = oItemBindingContext.getObject();
			this.getRouter().navTo("booking", { bookingId: oBooking.ID });
		},

		onPressBookNow: function () {
			this.getRouter().navTo("book");
		},

		onNavHomePress: function () {
			this.getRouter().navTo("bookings");
		}
	});
});