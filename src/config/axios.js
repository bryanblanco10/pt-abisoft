import axios from "axios";
// const X_APLICATION = process.env.VUE_APP_X_APLICATION_ID;
axios.defaults.headers.common["Content-Type"] = "application/json";


// axios.interceptors.request.use(config => {
//   let access_token = localStorage.getItem( "access_token")
//   if (access_token) {
//     config.headers.Authorization = `Bearer ${access_token}`
//   } else {
//     config.headers.appPublicKey = X_APLICATION
//   }

//   return config;
// });

axios.interceptors.response.use(
  res => res,
  err => {
    switch (err.response.status) {
      case 419:
        // localStorage.clear();
        // window.location.reload();
        break;

      //Server errors
      case 500:
      case 501:
      case 502:
      case 503:
      case 504:
      case 505:
      case 506:
      case 507:
      case 508:
      case 509:
      case 510:
      case 511:
        // console.log("Ocurrió un error, por favor comuníquese con su proveedor");
        break;
    }

    return Promise.reject(err.response);
  }
);

export default axios;