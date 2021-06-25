import apiUrl from '../apiConfig'
import axios from 'axios'

export const createComment = (data, user) => {
  return axios({
    url: apiUrl + '/comments',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      comment: data
    }
  })
}

export const deleteComment = (id, user) => {
  return axios({
    url: apiUrl + '/comments/' + id,
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}
