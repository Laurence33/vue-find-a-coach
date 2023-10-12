export default {
  coaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    return state.coaches && state.coaches.length > 0;
  },
  isCoach(state, getters, rootState, rootGetters) {
    const coaches = getters.coaches;
    const userId = rootGetters.userId;
    return coaches.some((coach) => coach.id === userId);
  },
  shouldUpdate(state) {
    const lastFetch = state.lastFetch;
    console.log('last fetch: ' + lastFetch);
    if (!lastFetch) {
      return true;
    }
    const currentTimestamp = new Date().getTime();
    const diff = (currentTimestamp - lastFetch) / 1000;
    console.log(diff);
    return diff > 60;
  },
};
