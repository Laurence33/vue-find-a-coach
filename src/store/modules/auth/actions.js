export default {
  async login(context, payload) {
    return context.dispatch('auth', { ...payload, mode: 'login' });
  },
  async signup(context, payload) {
    return context.dispatch('auth', { ...payload, mode: 'signup' });
  },
  async auth(context, payload) {
    const { mode } = payload;
    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
      process.env.VUE_APP_FIREBASE_KEY;
    if (mode === 'signup') {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
        process.env.VUE_APP_FIREBASE_KEY;
    }
    const body = {
      email: payload.email,
      password: payload.password,
      returnSecureToken: true,
    };
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
    });
    const responseData = await response.json();
    console.log(responseData);
    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to authenticate.'
      );
      throw error;
    }
    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);
    localStorage.setItem('email', responseData.email);
    localStorage.setItem('tokenExpiration', responseData.expiresIn);
    context.commit('setUser', {
      token: responseData.idToken,
      tokenExpiration: responseData.expiresIn,
      userId: responseData.localId,
      email: responseData.email,
    });
  },
  tryLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const email = localStorage.getItem('email');
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    if (token && userId) {
      context.commit('setUser', {
        token,
        userId,
        email,
        tokenExpiration,
      });
      return true;
    }

    return false;
  },
  async logout(context) {
    context.commit('setUser', {
      token: null,
      userId: null,
      tokenExpiration: null,
      email: null,
    });
  },
};
