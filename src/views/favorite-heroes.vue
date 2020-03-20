<template>
  <b-container class="">
    <b-card-group deck class>
      <b-card class="shadow" header="Favorite Heroes">
        <b-row>
          <b-col>
            <div
              class="text-center"
              v-if="!favorite_heroes.data.length && !selectedHero"
            >
              Here you can find all your favorite heroes! :-)
            </div>
            <b-list-group v-if="!selectedHero">
              <div
                v-for="(value, index) in favorite_heroes.data"
                v-bind:key="index"
              >
                <b-list-group-item
                  button
                  class="mb-2"
                  @click="selectHero(favorite_heroes.data[index])"
                >
                  <!-- {{hero[index]}} -->
                  <b class>{{ value.name }}</b>
                </b-list-group-item>
              </div>
            </b-list-group>
            <HeroDetail
              :hero="selectedHero"
              @save="saveHero"
              @cancel="cancelHero"
              v-if="selectedHero"
            />
          </b-col>
        </b-row>
      </b-card>
    </b-card-group>
  </b-container>
</template>

<script>
import store from '@/store/index'
import HeroDetail from '@/views/hero-detail'
export default {
  name: 'FavoriteHeroes',
  data() {
    return {
      loading: false,
      selectedHero: undefined,
      favorite_heroes: {
        data: []
      }
    }
  },
  components: {
    HeroDetail
  },
  watch: {
    favoriteHeroes(newFav, oldFav) {
      this.favorite_heroes.data = newFav ? newFav : oldFav
    }
  },
  computed: {
    favoriteHeroes() {
      this.getFavoriteHeroes(store.getters.getFavoriteHeroes)
      return store.getters.getFavoriteHeroes
    }
  },
  methods: {
    getFavoriteHeroes(storedFavHeroes) {
      this.favorite_heroes.data = storedFavHeroes
    },
    selectHero(selectedHero) {
      const likedHero = this.favorite_heroes.data.find(
        h => h.id === selectedHero.id
      )
      if (likedHero) selectedHero.liked = true
      else selectedHero.liked = false
      this.selectedHero = selectedHero
    },
    cancelHero() {
      this.selectedHero = undefined
    },
    saveHero(hero) {
      const index = this.hero.findIndex(h => h.id === hero.id)
      this.hero.splice(index, 1, hero)
      this.hero = [...this.hero]
      this.selectedHero = undefined
    }
  }
}
</script>
