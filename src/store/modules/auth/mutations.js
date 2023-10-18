export default {
  setUser(state, payload) {
    state.token = payload.token;
    state.userId = payload.userId;
    state.tokenExpiration = payload.tokenExpiration;
    state.email = payload.email;
    state.didAutoLogout = false;
  },
  didAutoLogout(state) {
    state.didAutoLogout = true;
    console.log('mutation: didAutoLogout()', state.didAutoLogout);
  },
};
