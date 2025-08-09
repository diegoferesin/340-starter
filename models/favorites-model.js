const pool = require('../database/')

/* ***************************
 * Add vehicle to favorites
 * ************************** */
async function addFavorite(account_id, inv_id) {
  try {
    const sql = `INSERT INTO public.account_favorites (account_id, inv_id)
                 VALUES ($1, $2)
                 ON CONFLICT (account_id, inv_id) DO NOTHING`;
    const result = await pool.query(sql, [account_id, inv_id])
    return result.rowCount > 0
  } catch (error) {
    throw error
  }
}

/* ***************************
 * Remove vehicle from favorites
 * ************************** */
async function removeFavorite(account_id, inv_id) {
  try {
    const sql = `DELETE FROM public.account_favorites
                 WHERE account_id = $1 AND inv_id = $2`;
    const result = await pool.query(sql, [account_id, inv_id])
    return result.rowCount > 0
  } catch (error) {
    throw error
  }
}

/* ***************************
 * List favorites for an account (joined with inventory)
 * ************************** */
async function listFavoritesByAccount(account_id) {
  try {
    const sql = `SELECT i.inv_id, i.inv_make, i.inv_model, i.inv_year, i.inv_thumbnail, i.inv_price
                 FROM public.account_favorites af
                 JOIN public.inventory i ON i.inv_id = af.inv_id
                 WHERE af.account_id = $1
                 ORDER BY af.created_at DESC`;
    const result = await pool.query(sql, [account_id])
    return result.rows
  } catch (error) {
    throw error
  }
}

module.exports = { addFavorite, removeFavorite, listFavoritesByAccount }


