'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = require("./react-google-places-autocomplete.cjs.prod.js");
} else {
  module.exports = require("./react-google-places-autocomplete.cjs.dev.js");
}
