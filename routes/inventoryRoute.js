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
// Route to build inventory management view
router.get("/", invController.buildManagement)
// Route to build add-classification view
router.get("/add-classification", invController.buildAddClassification)
// Route to build add-inventory view
router.get("/add-inventory", invController.buildAddInventory)

// Route to build edit inventory view
router.get("/edit/:inventory_id", utilities.handleErrors(invController.buildEditInventory))

// Route to get inventory data as JSON
router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON))

// Route to process add-classification form
router.post(
  "/add-classification",
  regValidate.classificationRules(),
  regValidate.checkClassificationData,
  invController.addClassification
)

// Route to process add-inventory form
router.post(
  "/add-inventory",
  regValidate.inventoryRules(),
  regValidate.checkInventoryData,
  invController.addInventory
)

// Route to process update inventory form
router.post(
  "/update",
  regValidate.inventoryRules(),
  regValidate.checkUpdateData,
  utilities.handleErrors(invController.updateInventory)
)

module.exports = router;