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
  api_error: undefined,
  favorite_heroes: []
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
    state.api_error = error
  },
  [ADD_FAVORITE_HERO] (state, favoriteHero) {
    function remove (array, element) {
      return array.filter(el => el.id !== element.id);
    }
    const matchingHero = state.favorite_heroes.find(h => h.id === favoriteHero.id)
    if (!matchingHero) state.favorite_heroes.push(favoriteHero)
    else state.favorite_heroes = remove(state.favorite_heroes, favoriteHero)
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
          context.commit(API_ERROR, heroById.data.error)
          context.commit(CLEAR_HERO, undefined)
        } else {
          context.commit(API_ERROR, undefined)
          context.commit(ADD_HERO, heroById.data)
        }
      } else if (heroById.data.error) {
        const heroByName = await axios.get(reqByNameUrl)
        if (heroByName.data.response === 'error') {
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
      context.commit(CLEAR_HERO, undefined)
      context.commit(API_ERROR, err)
    }
  },
  clearHeroAction (context) {
    context.commit(CLEAR_HERO, undefined)
  },
  addFavoriteHero (context, heroId) {
    const heroFound = context.state.favorite_heroes.find(h => {
      h.id === heroId
    })
    if (!heroFound) context.commit(ADD_FAVORITE_HERO, heroId)
    else console.warn("addFavoriteHero: HERO EXISTS!")
  }
}

const getters = {
  // parameterized getters are not cached. so this is just a convenience to get the state.
  // getAFavoriteHeroes: state => id => state.heroes.find(h => h.id === id),
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
