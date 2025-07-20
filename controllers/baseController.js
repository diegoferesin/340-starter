const utilities = require("../utilities/")

/* ***************************
 *  Build home view
 * ************************** */
async function buildHome(req, res, next) {
  try {
    let nav = await utilities.getNav()
    res.render("index", { title: "Home", nav })
  } catch (error) {
    console.error('Error in buildHome:', error)
    next(error)
  }
}

/* ***************************
 *  Intentional error for testing
 * ************************** */
async function triggerError(req, res, next) {
  try {
    throw new Error("Intentional error for testing")
  } catch (error) {
    console.error('Intentional error triggered:', error)
    next(error)
  }
}

module.exports = { buildHome, triggerError }