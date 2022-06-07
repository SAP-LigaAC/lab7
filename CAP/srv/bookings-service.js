const cds = require("@sap/cds");

module.exports = cds.service.impl((srv) => {
  srv.before("CREATE", "Bookings", async (req) => {
    if (!validateEmail(req.data.emailAddress)) {
      req.reject("Invalid email address");
    }
  });
});

function validateEmail(email) {
  return String(email)
    .toLowerCase()
    .match(/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/);
}