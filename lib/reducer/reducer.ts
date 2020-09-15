import {
  ADD_DATA___name_up__,
  CLEAR_DATA___name_up__,
  IAction__name__,
  IInitState,
  SET_ERROR___name_up__,
  SET_LOADING___name_up__,
  SET_REFRESH___name_up__,
} from './types'

const initState: IInitState = {
  data: [],
  loading: true,
  refresh: false,
  page: {
    current: 1,
    max: 10,
  },
  error: false,
  errorCode: undefined,
}

const __name__low__reducer: (state: IInitState, action: IAction__name__) => IInitState = (
  state = initState,
  action
) => {
  switch (action.type) {
    case ADD_DATA___name_up__: {
      const { data, page } = action.payload
      return {
        ...state,
        data,
        page,
        loading: false,
        error: false,
        errorCode: undefined,
        refresh: false,
      }
    }

    case SET_ERROR___name_up__: {
      const { errorCode, error } = action.payload
      return { ...state, error, errorCode }
    }

    case SET_LOADING___name_up__: {
      return { ...state, loading: true }
    }

    case SET_REFRESH___name_up__: {
      return { ...state, refresh: true }
    }

    case CLEAR_DATA___name_up__: {
      return initState
    }

    default:
      return state
  }
}

export default __name__low__reducer
