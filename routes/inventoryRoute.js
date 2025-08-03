// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/")
const regValidate = require('../utilities/account-validation')

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);
// Route to build specific inventory item detail view
router.get("/detail/:inventoryId", invController.buildByInventoryId)

// Route to build inventory management view (requires authorization)
router.get("/", utilities.checkAuthorization, invController.buildManagement)

// Route to build add-classification view (requires authorization)
router.get("/add-classification", utilities.checkAuthorization, invController.buildAddClassification)

// Route to build add-inventory view (requires authorization)
router.get("/add-inventory", utilities.checkAuthorization, invController.buildAddInventory)

// Route to build edit inventory view (requires authorization)
router.get("/edit/:inventory_id", utilities.checkAuthorization, utilities.handleErrors(invController.buildEditInventory))

// Route to get inventory data as JSON (requires authorization)
router.get("/getInventory/:classification_id", utilities.checkAuthorization, utilities.handleErrors(invController.getInventoryJSON))

// Route to process add-classification form (requires authorization)
router.post(
  "/add-classification",
  utilities.checkAuthorization,
  regValidate.classificationRules(),
  regValidate.checkClassificationData,
  invController.addClassification
)

// Route to process add-inventory form (requires authorization)
router.post(
  "/add-inventory",
  utilities.checkAuthorization,
  regValidate.inventoryRules(),
  regValidate.checkInventoryData,
  invController.addInventory
)

// Route to process update inventory form (requires authorization)
router.post(
  "/update",
  utilities.checkAuthorization,
  regValidate.inventoryRules(),
  regValidate.checkUpdateData,
  utilities.handleErrors(invController.updateInventory)
)

// Route to build delete confirmation view (requires authorization)
router.get("/delete/:inventory_id", utilities.checkAuthorization, utilities.handleErrors(invController.buildDeleteConfirmation))

// Route to process delete inventory (requires authorization)
router.post("/delete", utilities.checkAuthorization, utilities.handleErrors(invController.deleteInventory))

module.exports = router;