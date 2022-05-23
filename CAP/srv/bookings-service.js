const cds = require("@sap/cds");

module.exports = cds.service.impl((srv) => {
  srv.before("CREATE", "Bookings", async (req) => {
    const matchingEmail = String(req.data.emailAddress)
      .toLowerCase()
      .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (!matchingEmail) {
      throw new Error("Invalid email!");
    }
  });
});