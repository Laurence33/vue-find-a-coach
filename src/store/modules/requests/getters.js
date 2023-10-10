export default {
  requests(state, getters, rootState, rootGetters) {
    const coachId = rootGetters.userId;
    const result = state.requests.filter((req) => req.coachId === coachId);
    return result;
  },
  hasRequests(state, getters) {
    return state.requests && getters.requests.length > 0;
  },
};
