// Extend discourse/app/assets/javascripts/discourse/models/user.js.es6
// The vanilla createAccount method doesn't pass custom fields
import { ajax } from 'discourse/lib/ajax';

import { userPath } from 'discourse/lib/url';
import { withPluginApi } from 'discourse/lib/plugin-api';
import InputValidation from 'discourse/models/input-validation';
import createAccountController from 'discourse/controllers/create-account';
import User from 'discourse/models/user';

import DebtAmountValidation from '../mixins/debt-amount-validation';

function initializeTdcUser(api) {
  api.modifyClassStatic('model:user', {
    createAccount(attrs) {
      // the original implementation does not pass on customFields data
      let data = {
        name: attrs.accountName,
        email: attrs.accountEmail,
        password: attrs.accountPassword,
        username: attrs.accountUsername,
        password_confirmation: attrs.accountPasswordConfirm,
        challenge: attrs.accountChallenge,
      };

      data = this.uglyHackPartTwo(data, attrs);

      return ajax(userPath(), { data, type: 'POST' });
    },

    uglyHackPartTwo(data, attrs) {
      // see uglyHackPartOne, in tdc-create-account-controller
      // we hijacked userFields to pass customField data instead
      // now we need to move it back to correct place
      data.user_fields = null;
      data.custom_fields = attrs.userFields;
      return data;
    },
  });
}

export default {
  name: 'tdc-user',
  initialize() {
    withPluginApi('0.8.7', initializeTdcUser);
  },
};
