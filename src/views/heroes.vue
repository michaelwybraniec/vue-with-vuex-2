<template>
  <b-container>
      <b-card-group deck>
        <b-card header="Heroes" class="shadow">
          <b-row>
            <b-col>
              <div v-if="!selectedHero">
                <div>
                  <b-form inline>
                    <label class="sr-only" for="inline-form-input-name">Search:</label>

                    <b-input
                      id="inline-form-input-name"
                      class="mb-2 mr-sm-2 mb-sm-0"
                      placeholder="Name"
                      v-model="search.input"
                      v-on:keyup.enter="getHero()"
                    ></b-input>

                    <b-button variant="light" @click="getHero()">Find</b-button>
                   
                  </b-form>
                </div>
              </div>

              <div class="pt-4 pb-4 text-center" v-show="message">
                <b-spinner type="grow"></b-spinner>
                <p>{{ message }}</p>
              </div>

              <div v-if="!loading">

                <hr>

                <div v-if="hero">
                  <div v-for="(value, name, index) in hero" v-bind:key="index">
                    <div v-if='index !== 0'>
                      <b>{{ index }}. {{ name }}</b>: <span v-if="value.length">{{value}}</span>
                      <div v-else>
                        <div v-for="(value, name, index) in value" v-bind:key="index">
                          <span> - <i> {{ name }} </i>: {{value}}</span>
                        </div>
                      </div>
                    </div>
                    <br>
                  </div>
                </div>
                
                <!-- 
                <HeroDetail
                  :hero="selectedHero"
                  @save="saveHero"
                  @cancel="cancelHero"
                  v-if="selectedHero"
                /> -->

              </div>
              
            </b-col>
          </b-row>
        </b-card>
      </b-card-group>
  </b-container>
</template>

<script>
//import { mapActions, mapGetters } from "vuex";
import store from '@/store/index'
// import HeroDetail from "@/views/hero-detail";
export default {
  name: "Heroes",
  data() {
    return {
      loading: false,
      message: "",
      selectedHero: false,
      search: {
        input: "",
        by: {
          name: "",
          id: 0,
        },
      },
    };
  },
  components: {
   // HeroDetail,
  },
  computed: {
    hero() {
      return store.getters.getAvailableHero
    },
  },
  methods: {
     async getHero() {
      this.message = "Getting the hero, please be patient!";
      this.loading = true;
      await store.dispatch('getHeroAction', this.search.input)
      this.loading = false
      this.message = "";
    },
  },
};
</script>
