import { registerUnbound } from 'discourse-common/lib/helpers';

// This is a handlebars helper
// Given a string "Blah Blah Collective", returns "Blah Blah"
// Given a string "Geronimo", returns "Geronimo"

const rmString = " Collective"

export default registerUnbound('name-minus-collective', function(name, options) {
  if (name === undefined ||
      name.length <= rmString.length ||
      name.substring(name.length - rmString.length, name.length) != rmString)
  {
      return name
  } else { // remove " Collective" off the end of the string
      return name.substring(0, name.length - rmString.length)
  }
});
