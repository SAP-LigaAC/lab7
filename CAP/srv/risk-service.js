const cds = require("@sap/cds");

module.exports = cds.service.impl((srv) => {
  srv.before("CREATE", "Bookings", async (req) => {
    console.log(req.data);
  });

  srv.on("CREATE", "Bookings", async (req) => {
    console.log(req.data);
  });

  srv.on("UPDATE", "Bookings", async (req) => {
    console.log(req.data);
  });

  srv.on("UPDATE", "Bookings", async (req) => {
    console.log(req.data);
  });

  srv.on("DELETE", "Bookings", async (req) => {
    console.log(req.data);
  });

  srv.on("DELETE", "Bookings", async (req) => {
    console.log(req.data);
  });
});
