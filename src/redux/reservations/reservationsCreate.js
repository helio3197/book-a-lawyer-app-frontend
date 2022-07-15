const API_RESERVATIONS_CREATE_ENDPOINT = `${process.env.REACT_APP_API_HOST}/api/v1/reservations`;
const REQUEST_STARTED = 'book-a-lawyer/lawyersCreate/REQUEST_STARTED';
const REQUEST_FAILED = 'book-a-lawyer/lawyersCreate/REQUEST_FAILED';
const REQUEST_COMPLETED = 'book-a-lawyer/lawyersCreate/REQUEST_COMPLETED';
const initialState = {
  status: 'idle',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_STARTED:
      return action.payload;
    case REQUEST_FAILED:
      return action.payload;
    default:
      return state;
  }
};

const requestStarted = () => ({
  type: REQUEST_STARTED,
  payload: {
    status: 'fetching',
  },
});

const requestFailed = (error) => ({
  type: REQUEST_FAILED,
  payload: {
    status: 'failed',
    error,
  },
});

const requestCompleted = () => ({
  type: REQUEST_COMPLETED,
  payload: {
    status: 'success',
  },
});

export const createReservation = (body) => async (dispatch, getState) => {
  dispatch(requestStarted());
  try {
    const { authToken } = getState().auth;
    const response = await fetch(API_RESERVATIONS_CREATE_ENDPOINT, {
      method: 'POST',
      body,
      headers: {
        'Content-type': 'Application/json',
        Authorization: authToken,
      },
    });
    if (!response.ok) {
      throw (await response.json()).error;
    }

    dispatch(requestCompleted());
  } catch (error) {
    dispatch(requestFailed(error));
  }
};

export default reducer;
