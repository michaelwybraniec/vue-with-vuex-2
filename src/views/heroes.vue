<template>
  <b-container class="p-2 mt-4">
    <b-card-group deck class>
      <b-card class="shadow" header="Heroes">
        <b-row>
          <b-col>
            <div>
              <div>
                <b-row class="mb-2">
                  <b-col sm="6" class="pr-2">
                    <label class="sr-only" for="inline-form-input-name">Search:</label>
                    <b-input
                      id="inline-form-input-name"
                      class="mb-20"
                      placeholder="Name or ID"
                      v-model="search.input"
                      v-on:keyup.enter="getHero()"
                    ></b-input>
                  </b-col>

                  <b-col sm="6" class="pl-2">
                    <!-- <div> -->

                    <span v-if="!this.message.error">
                      <b-button
                        variant="light"
                        class="border"
                        @click="getHero()"
                        :disabled="!search.input || loading"
                      >
                        <span v-if="!loading">Search</span>
                        <div v-else>
                          <b-spinner small type="grow"></b-spinner>
                          {{ this.message.info }}
                        </div>
                      </b-button>
                    </span>

                    <span
                      v-if="
                          buttons.clear.show &&
                            !this.message.error &&
                            !this.loading &&
                            search.input
                        "
                    >
                      <b-button variant="light" @click="clearHero()" class="ml-2 border">Clear</b-button>
                    </span>

                    <div v-if="this.message.error">
                      <b-alert
                        show
                        variant="danger"
                        style="padding: 6px; margin: 0px;"
                        class="text-center"
                      >{{ this.message.error }}</b-alert>
                    </div>

                    <!-- </div> -->
                  </b-col>
                </b-row>
              </div>
            </div>

            <div v-if="!loading">
              <b-list-group v-if="!selectedHero">
                <div v-if="hero.response !== 'success'">
                  <div v-for="(value, index) in hero" v-bind:key="index">
                    <b-list-group-item button class="mb-2" @click="selectHero(hero[index])">
                      <!-- {{hero[index]}} -->
                      <b class>{{value.name}}</b>
                    </b-list-group-item>
                  </div>
                </div>
                <div v-else>
                  <b-list-group-item
                    button
                    class="shadow-sm mt-1"
                    @click="selectHero(hero)"
                  >{{ hero.name }}</b-list-group-item>
                </div>
              </b-list-group>

              <HeroDetail
                :hero="selectedHero"
                @save="saveHero"
                @cancel="cancelHero"
                v-if="selectedHero"
              />
            </div>
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
  name: 'Heroes',
  data() {
    return {
      loading: false,
      selectedHero: undefined,
      buttons: {
        search: {
          disabled: true
        },
        clear: {
          show: false
        }
      },
      message: {
        info: undefined,
        error: undefined,
        success: undefined
      },
      search: {
        input: undefined
      }
    }
  },
  components: {
    HeroDetail
  },
  watch: {
    // disableSearch() {
    //   if (this.search.input === '') {
    //     this.buttons.search.disabled = true
    //     this.buttons.clear.show = false
    //     this.message.error = undefined
    //   } else {
    //     this.buttons.search.disabled = false
    //   }
    // },
    apiError(errNew, errOld) {
      console.log('apiError -> errNew, errOld', errNew, errOld)
      switch (errNew) {
        case 'access denied':
          this.message.error = 'Api access denied, try later pls !'
          break
        case 'character with given name not found':
          //! err is falling to the 2nd test on the action level, refactor function.
          this.message.error = 'Hero with a given id or name not found :-('
          break
        default:
          this.message.error = errNew
      }
    }
  },
  computed: {
    // disableSearch() {
    //   return this.search.input
    // },
    hero() {
      return store.getters.getAvailableHero
    },
    apiError() {
      return store.getters.getApiErrorMsg
    }
  },
  methods: {
    async getHero() {
      if (this.search.input !== '') {
        this.message.info = 'Loading...'
        this.loading = true
        this.buttons.search.disabled = true
        await store.dispatch('getHeroAction', this.search.input)
        this.message.info = undefined
        this.loading = false
        this.buttons.search.disabled = false
        this.buttons.clear.show = true
        this.hero ? (this.message.error = undefined) : null
        this.selectedHero = undefined
      } else {
        this.message.error = "Input empty, I can't read minds yet!"
      }
    },
    clearHero() {
      store.dispatch('clearHeroAction')
      this.buttons.clear.show = false
      this.message.error = undefined
      this.search.input = undefined
      this.selectedHero = undefined
    },
    selectHero(selectedHero) {
      console.log('selectHero -> hero', selectedHero.name)
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
