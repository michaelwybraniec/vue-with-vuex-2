import axios from "axios";
import { API } from "./config";


const getHero = async id => {
  const {herokuCors, url, key} = API.heroes;
  const request = `${herokuCors}/${url}/${key}/${id}`;
 await axios.get(request)
    .then(response => {
      console.log("data.service, response:", response.data)
      return response.data
    })
    .catch(error => {
      console.error(error);
      return null;
    })
};


export const dataService = {
  getHero,
};