sap.ui.define(
  ["sap/ui/thirdparty/jquery"],
  function ($) {
    "use strict";

    return {
      get: function (sUrl, queryParams) {
        return new Promise(function (resolve, reject) {
          $.ajax({
            url: sUrl,
            type: "GET",
            data: queryParams,
            success: function (data) {
              resolve(data);
            },
            error: function (xhr, status) {
              reject(xhr, status);
            }
          });
        });
      },

      makeAJAXCall: function (sMethodType, sUrl, oBody) {
        return new Promise(function (resolve, reject) {
          var tokenUrl = "/";
          $.ajax({
            url: tokenUrl,
            type: "GET",
            beforeSend: function (jqXHR) {
              jqXHR.setRequestHeader("X-CSRF-Token", "Fetch");
            },
            success: function (data, textStatus, jqXHR) {
              jQuery.ajax({
                url: sUrl,
                type: sMethodType,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(oBody),
                beforeSend: function (jqXHR1) {
                  jqXHR1.setRequestHeader("X-CSRF-Token", jqXHR.getResponseHeader("X-CSRF-Token"));
                },
                success: function (data) {
                  resolve(data);
                },
                error: function (xhr, status) {
                  reject(xhr, status);
                }
              });
            },
            error: function (xhr, status) {
              reject(xhr, status);
            }
          });
        });
      }
    };
  });
