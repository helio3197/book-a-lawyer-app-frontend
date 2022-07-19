const API_RESERVATIONS_INDEX_ENDPOINT = `${process.env.REACT_APP_API_HOST}/api/v1/reservations`;
const REQUEST_STARTED = 'book-a-lawyer/reservations/REQUEST_STARTED';
const REQUEST_FAILED = 'book-a-lawyer/reservations/REQUEST_FAILED';
const REQUEST_COMPLETED = 'book-a-lawyer/reservations/REQUEST_COMPLETED';
const CLEAR_FETCH_STATE = 'book-a-lawyer/reservationsDelete/CLEAR_FETCH_STATE';

const initialState = {
  reservations: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_STARTED:
      return {
        ...state,
        ...action.payload,
      };
    case REQUEST_FAILED:
      return {
        ...state,
        ...action.payload,
      };
    case REQUEST_COMPLETED:
      return {
        ...state,
        ...action.payload,
      };
    case CLEAR_FETCH_STATE:
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

const requestCompleted = ({ reservations }) => ({
  type: REQUEST_COMPLETED,
  payload: {
    status: 'completed',
    reservations,
  },
});

export const clearFetchReservationState = () => ({
  type: CLEAR_FETCH_STATE,
  payload: {
    status: 'idle',
  },
});

export const fechReservations = () => async (dispatch, getState) => {
  dispatch(requestStarted());
  try {
    const { authToken } = getState().auth;
    const response = await fetch(API_RESERVATIONS_INDEX_ENDPOINT, {
      headers: {
        Authorization: authToken,
      },
    });
    if (!response.ok) {
      throw (await response.json()).error;
    }
    dispatch(requestCompleted(await response.json()));
  } catch (error) {
    dispatch(requestFailed(error));
  }
};

export default reducer;
