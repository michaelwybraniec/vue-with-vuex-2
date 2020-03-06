import axios from "axios";
import { API } from "./config";


const getHero = async id => {
  const url = `https://cors-anywhere.herokuapp.com/${API.heroes.url}/${API.heroes.key}/${id}`;
  axios.get(url)
    .then(response => response.data)
    .catch(error => error);
};


export const dataService = {
  getHero,
};