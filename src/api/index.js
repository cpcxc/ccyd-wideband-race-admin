import axios from 'axios'

export default {
  async query ({ page, size, field, value, start, end }) {
    const res = await axios.post('/race/admin/query', { page, size, field, value, start, end });
    return res.data;
  },

  async login ({username, password}) {
    const res = await axios.post(`/race/admin/login`, {username, password});
    return res.data;
  },

}