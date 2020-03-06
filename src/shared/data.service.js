import axios from "axios";
import { API } from "./config";

const hardCodedHero = {
  "response": "success", "id": "644", "name": "Superman", "powerstats": { "intelligence": "94", "strength": "100", "speed": "100", "durability": "100", "power": "100", "combat": "85" }, "biography": { "full-name": "Clark Kent", "alter-egos": "Superman Prime One-Million", "aliases": ["Clark Joseph Kent", "The Man of Steel", "the Man of Tomorrow", "the Last Son of Krypton", "Big Blue", "the Metropolis Marvel", "the Action Ace"], "place-of-birth": "Krypton", "first-appearance": "ACTION COMICS #1", "publisher": "Superman Prime One-Million", "alignment": "good" }, "appearance": { "gender": "Male", "race": "Kryptonian", "height": ["6'3", "191 cm"], "weight": ["225 lb", "101 kg"], "eye-color": "Blue", "hair-color": "Black" }, "work": { "occupation": "Reporter for the Daily Planet and novelist", "base": "Metropolis" }, "connections": { "group-affiliation": "Justice League of America, The Legion of Super-Heroes (pre-Crisis as Superboy); Justice Society of America (pre-Crisis Earth-2 version); All-Star Squadron (pre-Crisis Earth-2 version)", "relatives": "Lois Lane (wife), Jor-El (father, deceased), Lara (mother, deceased), Jonathan Kent (adoptive father), Martha Kent (adoptive mother), Seyg-El (paternal grandfather, deceased), Zor-El (uncle, deceased), Alura (aunt, deceased), Supergirl (Kara Zor-El, cousin), Superboy (Kon-El/Conner Kent, partial clone)" }, "image": { "url": "https://www.superherodb.com/pictures2/portraits/10/100/791.jpg" }
};


const getHero = async function (id) {
  console.log("data.service, getHero id;", id)
  id = '644'



  //? AXIOS
  await axios({
    method: "get",
    url: `${API.heroes.url}/${API.heroes.key}/${id}`,
    responseType: 'stream',
    crossorigin: true,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'

    }
  }).then(function (response) {
    //let hero = this.sparseItem(response, 200);
    //hero.fullName = `${hero.firstName} ${hero.lastName}`;
    let hero = response
    console.log(response)
    return hero;
  }).catch(function (error) {
    console.error(error, "\n\n Returning a hardCodedHero instead: \n", hardCodedHero);
    return hardCodedHero;
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