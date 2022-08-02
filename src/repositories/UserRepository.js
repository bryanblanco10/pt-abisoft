import { axios, API_ROUTES } from "@/config/index.js";

export default {
  async getAll() {
    let result = await axios.get(`${API_ROUTES.user.get}`);

    return result;
  },

  async save(id, data) {
    let result = await axios.post(`${API_ROUTES.user.save}`, data);

    return result;
  },

  async update(id, data) {
    let result = await axios.put(`${API_ROUTES.user.update}/${id}`, data);

    return result;
  },

  async delete(id) {
    let result = await axios.delete(`${API_ROUTES.user.delete}/${id}`);

    return result;
  },
}