const API_URL = process.env.VUE_APP_API_URL;
const API_VERSION = process.env.VUE_APP_API_VERSION;

const API_ROUTES = {
  user: {
    get: `${API_URL}/api/${API_VERSION}/user`,
    save: `${API_URL}/api/${API_VERSION}/user`,
    update: `${API_URL}/api/${API_VERSION}/user`,
    delete: `${API_URL}/api/${API_VERSION}/user`,
  },
}

export { API_ROUTES }