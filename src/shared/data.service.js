import axios from "axios";
import { API } from "./config";


const getHero = async id => {
  const {herokuCors, url, key} = API.heroes;
  const request = `${herokuCors}/${url}/${key}/${id}`;
  axios.get(request)
    .then(response => response.data)
    .catch(error => error);
};


export const dataService = {
  getHero,
};