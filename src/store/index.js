import { createStore } from 'vuex';
import coachesModule from './modules/coaches/index.js';
export const store = createStore({
  modules: { coaches: coachesModule },
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
