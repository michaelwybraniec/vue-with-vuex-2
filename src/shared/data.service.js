import axios from "axios";
import { API } from "./config";

const getHero = async function (id) {
  console.log("data.service, getHero id;", id)
  id = '644'

  //? AXIOS
  await axios(
    `${API.heroes.url}/${API.heroes.key}/${id}`,
    //? Trying to bypass 'Access-Control-Allow-Origin' err
    // {
    //   method: "GET",
    //   mode: "no-cors",
    //   headers: {
    //     "Access-Control-Allow-Origin": "*",
    //     "Content-Type": "application/json",
    //   },
    //   withCredentials: true,
    //   credentials: "same-origin",
    // },
  )
    .then(function (response) {
      let hero = this.sparseItem(response, 200);
      hero.fullName = `${hero.firstName} ${hero.lastName}`;
      return hero;
    })
    .catch(function (error) {
      console.error(error);
      return null;
    });

  //? FETCH
  // const testURL = `${API.heroes.url}/${API.heroes.key}/${this.search.by.name}`;
  // const myInit = {
  //   method: "HEAD",
  //   mode: "no-cors",
  // };
  // const myRequest = new Request(testURL, myInit);
  // await fetch(myRequest)
  //   .then(function(response) {
  //     // let hero = this.sparseItem(response, 200);
  //     //  hero.fullName = `${hero.firstName} ${hero.lastName}`;
  //     //  return hero;
  //     console.log(response);

  //     return response;
  //   })
  //   .then(function(response) {
  //     console.log(response);
  //   })
  //   .catch(function(err) {
  //     console.error(err);
  //     return null;
  //   });

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
};