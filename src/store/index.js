import Vue from "vue";
import "es6-promise/auto";
import Vuex from "vuex";
import axios from "axios";
import { API } from "../shared/config";
import { GET_HERO } from "./mutation-types";

//? This data service did not return the obj re.data to the vuex actions.
//? Therefore store:actions:getHeroAction: calls api itself currently.
//? import { dataService } from "../shared";

Vue.use(Vuex);

const state = () => ({
  hero: []
});

const mutations = {
 [GET_HERO] (state, hero) { 
   state.hero = hero; 
  },
};

const actions = {
  async getHeroAction (context, input ) {
    const { herokuCors, url, key } = API.heroes;
    const reqByNameUrl = `${herokuCors}/${url}/${key}/search/${input}`;
    const reqByIdUrl = `${herokuCors}/${url}/${key}/${input}`;
    
    const heroById = await axios.get(reqByIdUrl)
    if(!heroById.data.error) {
      context.commit(GET_HERO, heroById.data)
    }
    else if(heroById.data.error) {
      const heroByName = await axios.get(reqByNameUrl)
      context.commit(GET_HERO, heroByName.data.results)
    }
    else {
      context.commit(GET_HERO, {error: "Nothing found"})
    }
  }

};

const getters = {
  // parameterized getters are not cached. so this is just a convenience to get the state.
  // getHeroById: state => id => state.heroes.find(h => h.id === id), 
  getAvailableHero: state => state.hero
};

export default new Vuex.Store({
  //strict: process.env.NODE_ENV !== "production", //??? strict mode in vuex?
  state,
  mutations,
  actions,
  getters
});