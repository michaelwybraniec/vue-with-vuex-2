import Vue from "vue";
import "es6-promise/auto";
import Vuex from "vuex";
import axios from "axios";
import { API } from "../shared/config";

//import { dataService } from "../shared";
import {
  GET_HERO,
} from "./mutation-types";

Vue.use(Vuex);

const state = () => ({
  hero: []
});

const mutations = {
 [GET_HERO] (state, hero) {
    console.log("getHero mutation", state, hero)
    state.hero = hero;
  },
};

const actions = {
   async getHeroAction (context, id ) {
   // await dataService.getHero(id)
   const {herokuCors, url, key} = API.heroes;
   const request = `${herokuCors}/${url}/${key}/${id}`;
    await axios.get(request)
    .then(res => {
      console.log(res.data)
      context.commit(GET_HERO, res.data)
    })
    .catch(err => {
       //! in this case api res with an spec err but if not then we can handle it here
     console.error(err)})
  },
};

const getters = {
  // parameterized getters are not cached. so this is just a convenience to get the state.
  // getHeroById: state => id => state.heroes.find(h => h.id === id), //! hero code, it ?
  getAvailableHero: state => state.hero
};

export default new Vuex.Store({
  //strict: process.env.NODE_ENV !== "production",
  state,
  mutations,
  actions,
  getters
});