export default {
  async contactCoach(context, payload) {
    // const reqId = Date.now();
    const newRequest = {
      userEmail: payload.email,
      message: payload.message,
    };

    const response = await fetch(
      `https://practiceproject-972d5.firebaseio.com/requests/${payload.coachId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(newRequest),
      }
    );
    const responseData = await response.json();
    console.log('response:', responseData);
    if (!response.ok) {
      // error
      throw new Error(responseData.message || 'Failed to send request!');
    }

    context.commit('addRequest', {
      ...newRequest,
      id: responseData.name,
      coachId: payload.coachId,
    });
  },

  async loadRequests(context) {
    const coachId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    const response = await fetch(
      `https://practiceproject-972d5.firebaseio.com/requests/${coachId}.json?auth=${token}`
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to fetch requests!'
      );
      throw error;
    }

    console.log(responseData);
    const requests = [];
    for (const key in responseData) {
      const request = {
        id: key,
        coachId: coachId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message,
      };
      requests.push(request);
    }
    context.commit('setRequests', requests);
  },
};
