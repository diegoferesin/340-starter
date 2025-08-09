const utilities = require("../utilities/")
const favoritesModel = require("../models/favorites-model")

/* ***************************
 *  List saved vehicles for current user
 * ************************** */
async function buildFavorites(req, res, next) {
  const accountId = res.locals?.accountData?.account_id
  let nav = await utilities.getNav()
  const favorites = await favoritesModel.listFavoritesByAccount(accountId)
  res.render("account/favorites", {
    title: "My Saved Vehicles",
    nav,
    errors: null,
    favorites,
  })
}

/* ***************************
 *  Add a vehicle to favorites
 * ************************** */
async function addFavorite(req, res, next) {
  const accountId = res.locals?.accountData?.account_id
  const invId = parseInt(req.params.inv_id)
  await favoritesModel.addFavorite(accountId, invId)
  req.flash("notice", "Saved to favorites.")
  return res.redirect(`/inv/detail/${invId}`)
}

/* ***************************
 *  Remove a vehicle from favorites
 * ************************** */
async function removeFavorite(req, res, next) {
  const accountId = res.locals?.accountData?.account_id
  const invId = parseInt(req.params.inv_id)
  await favoritesModel.removeFavorite(accountId, invId)
  req.flash("notice", "Removed from favorites.")
  return res.redirect("/account/favorites")
}

module.exports = { buildFavorites, addFavorite, removeFavorite }


