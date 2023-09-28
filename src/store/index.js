import { createStore } from 'vuex';
import coachesModule from './modules/coaches/index.js';
import requestsModule from './modules/requests/index.js';

export const store = createStore({
  modules: { coaches: coachesModule, requests: requestsModule },
  state() {
    return {
      userId: Date.now(),
    };
  },
  getters: {
    useId(state) {
      return state.userId;
    },
  },
});
