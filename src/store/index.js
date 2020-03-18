import Vue from 'vue'
import 'es6-promise/auto'
import Vuex from 'vuex'
import axios from 'axios'
import { API } from '../shared/config'
import { ADD_HERO, CLEAR_HERO, API_ERROR, ADD_FAVORITE_HERO } from './mutation-types'

//? This data service did not return the obj re.data to the vuex actions.
//? Therefore store:actions:getHeroAction: calls api itself currently.
//? import { dataService } from "../shared";

Vue.use(Vuex)

const state = () => ({
  hero: [],
  //heroes: [],
  api_error: undefined
})

const mutations = {
  [ADD_HERO] (state, hero) {
    //state.heroes.unshift(hero) //? mutable addition
    state.hero = hero
  },
  [CLEAR_HERO] (state, hero) {
    state.hero = hero
  },
  [API_ERROR] (state, error) {
    console.log('state, error', state, error)
    state.api_error = error
  },
  [ADD_FAVORITE_HERO] (state, favoriteHero) {
    console.log('state, favoriteHero', state, favoriteHero)
    state.favorite_hero = favoriteHero
  }
}

const actions = {
  async getHeroAction (context, input) {
    const { herokuCors, url, key } = API.heroes
    const reqByNameUrl = `${herokuCors}/${url}/${key}/search/${input}`
    const reqByIdUrl = `${herokuCors}/${url}/${key}/${input}`

    try {
      const heroById = await axios.get(reqByIdUrl)

      if (!heroById.data.error) {
        if (heroById.data.response === 'error') {
          console.log('getHeroAction -> heroById.data', heroById.data)
          context.commit(API_ERROR, heroById.data.error)
          context.commit(CLEAR_HERO, undefined)
        } else {
          context.commit(API_ERROR, undefined)
          context.commit(ADD_HERO, heroById.data)
        }
      } else if (heroById.data.error) {
        const heroByName = await axios.get(reqByNameUrl)
        if (heroByName.data.response === 'error') {
          console.log('getHeroAction -> heroByName.data', heroByName.data)
          context.commit(API_ERROR, heroByName.data.error)
          context.commit(CLEAR_HERO, undefined)
        } else {
          context.commit(API_ERROR, undefined)
          context.commit(ADD_HERO, heroByName.data.results)
        }
      } else {
        context.commit(CLEAR_HERO, undefined)
        context.commit(API_ERROR, 'getHeroAction else case error')
      }
    } catch (err) {
      console.log('getHeroAction -> err', err)
      context.commit(CLEAR_HERO, undefined)
      context.commit(API_ERROR, err)
    }
  },
  clearHeroAction (context) {
    context.commit(CLEAR_HERO, undefined)
  }
}

const getters = {
  // parameterized getters are not cached. so this is just a convenience to get the state.
  //getAvailableHero: state => id => state.heroes.find(h => h.id === id)
  getAvailableHero: state => state.hero,
  getApiErrorMsg: state => state.api_error,
  getFavoriteHeroes: state => state.favorite_heroes
}

export default new Vuex.Store({
  //strict: process.env.NODE_ENV !== "production", //??? strict mode in vuex?
  state,
  mutations,
  actions,
  getters
})
