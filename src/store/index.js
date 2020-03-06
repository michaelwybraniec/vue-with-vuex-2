import Vue from "vue";
import "es6-promise/auto";
import Vuex from "vuex";

import { dataService } from "../shared";
import {
  GET_HERO,
} from "./mutation-types";

Vue.use(Vuex);

const state = () => ({
  heroes: []
});

const mutations = {
  [GET_HERO] (state, hero) {
    state.heroes = hero;
  },
};

const actions = {
  async getHeroAction ({ commit }) {
    const heroes = await dataService.getHero();
    commit(GET_HERO, heroes);
  },
};

const getters = {
  // parameterized getters are not cached. so this is just a convenience to get the state.
  getHeroById: state => id => state.heroes.find(h => h.id === id),
};

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state,
  mutations,
  actions,
  getters
});