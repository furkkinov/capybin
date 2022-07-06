const fs = require("fs");

/**
 * Get record from json database
 * @param {String} database file.js name
 * @param {String} item item id
 * @returns {Object} object with info
 */
 function get(database, item) {
    if(!fs.existsSync(`${__dirname}/databases/${database}.json`)) return null;
    let db = JSON.parse(fs.readFileSync(`${__dirname}/databases/${database}.json`));
    if(!db[item]) return null;
    return db[item];
}

/**
 * Set record in databse
 * @param {String} database file.js name
 * @param {String} item item id
 * @param {Object} content item content
 * @returns {Boolean} success or not
 */
function set(database, item, content) {
    if(!fs.existsSync(`${__dirname}/databases/${database}.json`)) fs.writeFileSync(`${__dirname}/databases/${database}.json`, `{}`, "utf-8");
    let db = JSON.parse(fs.readFileSync(`${__dirname}/databases/${database}.json`));
    db[item] = content;
    fs.writeFileSync(`${__dirname}/databases/${database}.json`, JSON.stringify(db), "utf-8");
    return true;
}

module.exports = { get, set };