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

export const deleteComment = (data, id, user) => {
  console.log('data: ', data)
  console.log('id: ', id)
  console.log('user: ', user)
  return axios({
    url: apiUrl + '/comments/' + id,
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      comment: { entryId: data }
    }
  })
}
