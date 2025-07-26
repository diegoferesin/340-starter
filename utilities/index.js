const invModel = require("../models/inventory-model")
const utilities = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
utilities.getNav = async function (req, res, next) {
  try {
    let data = await invModel.getClassifications()
    let list = "<ul>"
    list += '<li><a href="/" title="Home page">Home</a></li>'
    data.rows.forEach((row) => {
      list += "<li>"
      list += '<a href="/inv/type/' + row.classification_id + '" title="See our inventory of ' + row.classification_name + ' vehicles">' + row.classification_name + "</a>"
      list += "</li>"
    })
    list += "</ul>"
    return list
  } catch (error) {
    console.error('Error in getNav:', error)
    throw error
  }
}

/* **************************************
 * Build the classification view HTML
 * ************************************ */
utilities.buildClassificationGrid = async function(data){
  try {
    let grid
    if(data.length > 0){
      grid = '<ul id="inv-display">'
      data.forEach(vehicle => { 
        grid += '<li>'
        grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
        + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
        + 'details"><img src="' + vehicle.inv_thumbnail 
        +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
        +' on CSE Motors" /></a>'
        grid += '<div class="namePrice">'
        grid += '<hr />'
        grid += '<h2>'
        grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
        + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
        + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
        grid += '</h2>'
        grid += '<span>$' 
        + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
        grid += '</div>'
        grid += '</li>'
      })
      grid += '</ul>'
    } else { 
      grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
    }
    return grid
  } catch (error) {
    console.error('Error in buildClassificationGrid:', error)
    throw error
  }
}

/* **************************************
 * Build the specific vehicle information into HTML
 * ************************************ */
utilities.buildVehicleHTML = function (data) {
  try {
    let section = '<div class="vehicle-detail">'
    section += '<div class="vehicle-image">'
    section += `<img src="${data.inv_image}" alt="Image of ${data.inv_make} ${data.inv_model} on CSE Motors">`
    section += '</div>'
    section += '<div class="vehicle-info">'
    section += `<h2>${data.inv_make} ${data.inv_model} Details</h2>`
    section += `<p><strong>Price:</strong> $${new Intl.NumberFormat('en-US').format(data.inv_price)}</p>`
    section += `<p><strong>Description:</strong> ${data.inv_description}</p>`
    section += `<p><strong>Color:</strong> ${data.inv_color}</p>`
    section += `<p><strong>Miles:</strong> ${new Intl.NumberFormat('en-US').format(data.inv_miles)}</p>`
    section += '</div>'
    section += '</div>'
    return section
  } catch (error) {
    console.error('Error in buildVehicleHTML:', error)
    throw error
  }
}

/* **************************************
 * Build the classification select list
 * ************************************ */
utilities.buildClassificationList = async function (classification_id = null) {
  try {
    let data = await invModel.getClassifications()
    let classificationList = '<select name="classification_id" id="classificationList" required>'
    classificationList += "<option value=''>Choose a Classification</option>"
    data.rows.forEach((row) => {
      classificationList += '<option value="' + row.classification_id + '"'
      if (classification_id != null && row.classification_id == classification_id) {
        classificationList += " selected "
      }
      classificationList += ">" + row.classification_name + "</option>"
    })
    classificationList += "</select>"
    return classificationList
  } catch (error) {
    console.error('Error in buildClassificationList:', error)
    throw error
  }
}

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
utilities.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

module.exports = utilities