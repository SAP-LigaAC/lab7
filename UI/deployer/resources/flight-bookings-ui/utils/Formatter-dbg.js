sap.ui.define([
    "sap/ui/core/format/DateFormat"
], function (DateFormat) {
    return {
        formatDateTime: function (sDate, sPattern) {
            const oDate = new Date(sDate);
            const oDateFomat = DateFormat.getDateInstance({ pattern: sPattern });
            return oDateFomat.format(oDate);
        }
    };
});