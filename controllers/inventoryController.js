const utilities = require("../utilities/")
const invModel = require("../models/inventory-model")

/* ***************************
 *  Build inventory by classification view
 * ************************** */
async function buildByClassificationId(req, res, next) {
  try {
    const classification_id = req.params.classificationId
    const data = await invModel.getInventoryByClassificationId(classification_id)
    const grid = await utilities.buildClassificationGrid(data)
    let nav = await utilities.getNav()
    const className = data[0].classification_name
    res.render("./inventory/classification", {
      title: className + " vehicles",
      nav,
      grid,
    })
  } catch (error) {
    console.error('Error in buildByClassificationId:', error)
    next(error)
  }
}

/* ***************************
 *  Build inventory item detail view
 * ************************** */
async function buildByInventoryId(req, res, next) {
  try {
    const inv_id = req.params.inventoryId
    const data = await invModel.getInventoryById(inv_id)
    const content = utilities.buildVehicleHTML(data)
    let nav = await utilities.getNav()
    const className = `${data.inv_year} ${data.inv_make} ${data.inv_model}`
    res.render("./inventory/detail", {
      title: className,
      nav,
      content,
    })
  } catch (error) {
    console.error('Error in buildByInventoryId:', error)
    next(error)
  }
}

module.exports = { buildByClassificationId, buildByInventoryId } 