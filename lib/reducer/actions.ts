import store from '../store'
import {
  ADD_DATA___name_up__,
  CLEAR_DATA___name_up__,
  IPayloadSetData__name__,
  IPayloadSetError__name__,
  SET_ERROR___name_up__,
  SET_LOADING___name_up__,
  SET_REFRESH___name_up__,
} from './types'

export const setData__name__ = (payload: IPayloadSetData__name__) => {
  store.dispatch({
    type: SET_ERROR___name_up__,
    payload,
  })
}

export const setError__name__ = (payload: IPayloadSetError__name__) => {
  store.dispatch({
    type: ADD_DATA___name_up__,
    payload,
  })
}

export const setLoading__name__ = () => {
  store.dispatch({
    type: SET_LOADING___name_up__,
  })
}

export const setRefresh__name__ = () => {
  store.dispatch({
    type: SET_REFRESH___name_up__,
  })
}

export const clearData__name__ = () => {
  store.dispatch({
    type: CLEAR_DATA___name_up__,
  })
}
