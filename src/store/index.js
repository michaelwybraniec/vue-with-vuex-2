import Vue from "vue";
import "es6-promise/auto";
import Vuex from "vuex";
import axios from "axios";
import { API } from "../shared/config";
import { GET_HERO, CLEAR_HERO, API_ERROR } from "./mutation-types";

//? This data service did not return the obj re.data to the vuex actions.
//? Therefore store:actions:getHeroAction: calls api itself currently.
//? import { dataService } from "../shared";

Vue.use(Vuex);

const state = () => ({
  hero: [],
  api_error: undefined
});

const mutations = {
 [GET_HERO] (state, hero) { 
   state.hero = hero; 
  },
  [CLEAR_HERO] (state, hero){
    state.hero = hero;
  },
  [API_ERROR] (state, error){
    console.log(state, error)
    state.api_error = error;
  }
};

const actions = {
  async getHeroAction (context, input ) {
    const { herokuCors, url, key } = API.heroes;
    const reqByNameUrl = `${herokuCors}/${url}/${key}/search/${input}`;
    const reqByIdUrl = `${herokuCors}/${url}/${key}/${input}`;
    
    try {
      const heroById = await axios.get(reqByIdUrl);

      if(!heroById.data.error) {
        if(heroById.data.response === "error") {
          context.commit(API_ERROR, heroById.data.error)
        } else {
          context.commit(GET_HERO, heroById.data)
        }
      } 

      else if(heroById.data.error) {
        const heroByName = await axios.get(reqByNameUrl)
        if(heroByName.data.response === "error") {
          context.commit(API_ERROR, heroByName.data.error)
        } else {
          context.commit(GET_HERO, heroByName.data.results)
        }
      } 

      else {
        context.commit(GET_HERO, {error: "Nothing found"})
      }
    }
    catch(err) {
      console.error(err)
    }
  },
  clearHeroAction(context){
    context.commit(CLEAR_HERO, undefined)
  }
};

const getters = {
  // parameterized getters are not cached. so this is just a convenience to get the state.
  // getHeroById: state => id => state.heroes.find(h => h.id === id), 
  getAvailableHero: state => state.hero,
  getApiErrorMsg: state => state.api_error
};

export default new Vuex.Store({
  //strict: process.env.NODE_ENV !== "production", //??? strict mode in vuex?
  state,
  mutations,
  actions,
  getters
});