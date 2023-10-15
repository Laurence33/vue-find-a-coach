import getters from './getters.js';
import mutations from './mutations.js';
import actions from './actions.js';

export default {
  state() {
    return {
      userId: null,
      token: null,
      tokenExpiration: null,
      email: null,
    };
  },
  getters,
  mutations,
  actions,
};
