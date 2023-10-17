export default {
  async login(context, payload) {
    const body = {
      email: payload.email,
      password: payload.password,
      returnSecureToken: true,
    };
    const url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
      process.env.VUE_APP_FIREBASE_KEY;
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
    context.commit('setUser', {
      token: responseData.idToken,
      tokenExpiration: responseData.expiresIn,
      userId: responseData.localId,
      email: responseData.email,
    });
  },
  async signup(context, payload) {
    const body = {
      email: payload.email,
      password: payload.password,
      returnSecureToken: true,
    };
    const url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
      process.env.VUE_APP_FIREBASE_KEY;
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
    context.commit('setUser', {
      token: responseData.idToken,
      tokenExpiration: responseData.expiresIn,
      userId: responseData.localId,
      email: responseData.email,
    });
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
