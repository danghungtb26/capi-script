// type dispatch

export const ADD_DATA___name_up__ = 'ADD_DATA___name_up__'
export const SET_ERROR___name_up__ = 'SET_ERROR___name_up__'
export const SET_LOADING___name_up__ = 'SET_LOADING___name_up__'
export const SET_REFRESH___name_up__ = 'SET_REFRESH___name_up__'
export const CLEAR_DATA___name_up__ = 'CLEAR_DATA___name_up__'

type types =
  | 'ADD_DATA___name_up__'
  | 'SET_ERROR___name_up__'
  | 'SET_LOADING___name_up__'
  | 'SET_REFRESH___name_up__'
  | 'CLEAR_DATA___name_up__'
  | string

// type data
export interface IInitState {
  data: Array<{ [x: string]: any }>
  loading: boolean
  refresh: boolean
  page: {
    current: number
    max: number
  }
  error: boolean
  errorCode: number | undefined
}

export interface IPayloadSetData__name__ {
  data: Array<{ [x: string]: any }>
  page: {
    current: number
    max: number
  }
}

export interface IPayloadSetError__name__ {
  error: boolean
  errorCode: number | undefined
}

interface IPayload__name__ extends IPayloadSetData__name__, IPayloadSetError__name__ {}

export interface IAction__name__ {
  type: types
  payload: IPayload__name__
}
