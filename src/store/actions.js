/* eslint-disable no-unused-vars */
import * as types from './mutation-types'
import {Auth, List, Task} from '../api'
/* eslint-enable no-unused-vars */

export default {
  login: ({commit}, authInfo) => {
    return Auth.login(authInfo)
      .then(({token, userId}) => {
        commit(types.AUTH_LOGIN, {token, userId})
      })
      .catch(err => { throw err })
  },

  fetchList: ({commit}) => {
    // todo:
    throw new Error('fetchList action should be implemented')
  },

  addTask: ({commit}) => {
    // todo:
    throw new Error('addTask action should be implemented')
  },

  updateTask: ({commit}) => {
    // todo:
    throw new Error('updateTask action should be implemented')
  },

  removeTask: ({commit}) => {
    // todo:
    throw new Error('removeTask action should be implemented')
  },

  logout: ({commit}) => {
    // todo:
    throw new Error('logout action should be implemented')
  }
}
