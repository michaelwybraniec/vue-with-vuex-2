import axios from "axios";
import { API } from "./config";

const getHeroes = async function (id) {
  id = '644'
  try {
    const response = await axios.get(`${API.heroes.url}/${API.heroes.key}/${id}`);
    let hero = parseItem(response, 200);
    hero.fullName = `${hero.firstName} ${hero.lastName}`;
    return hero;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getHero = async function (id) {
  console.log("getHeroAction", id)
  try {
    const response = await axios.get(`${API}/heroes/${id}`);
    let hero = parseItem(response, 200);
    hero.fullName = `${hero.firstName} ${hero.lastName}`;
    return hero;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const updateHero = async function (hero) {
  try {
    const response = await axios.put(`${API}/heroes/${hero.id}`, hero);
    const updatedHero = parseItem(response, 200);
    return updatedHero;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// const parseList = response => {
//   if (response.status !== 200) throw Error(response.message);
//   if (!response.data) return [];
//   let list = response.data;
//   if (typeof list !== "object") {
//     list = [];
//   }
//   return list;
// };

export const parseItem = (response, code) => {
  if (response.status !== code) throw Error(response.message);
  let item = response.data;
  if (typeof item !== "object") {
    item = undefined;
  }
  return item;
};

export const dataService = {
  getHero,
  getHeroes,
  updateHero
};