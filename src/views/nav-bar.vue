<template>
  <div class="mt-3">
    <p class="text-center">Menu</p>
    <div class="text-center">
      <router-link to="/heroes" active-class="active">Heroes</router-link>
      <span> / </span>
      <router-link to="/favorite-heroes"
        >Favorite heroes ({{ favorites.length }})</router-link
      >
    </div>
    <br />
  </div>
</template>

<script>
import store from '@/store/index'
export default {
  name: 'NavBar',
  data() {
    return {
      favorites: {
        length: 0
      }
    }
  },
  watch: {
    favoriteHeroes(newFav) {
      this.favorites.length = newFav.length
    }
  },
  computed: {
    favoriteHeroes() {
      return store.getters.getFavoriteHeroes
    }
  }
}
</script>
