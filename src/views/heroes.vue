<template>
  <b-container>
      <b-card-group deck>
        <b-card header="Heroes" class="shadow">
          <b-row>
            <b-col>
              <div v-if="!selectedHero">
                <div>
                  <b-form inline>
                    <label class="sr-only" for="inline-form-input-name"
                      >Search:</label
                    >
                    <b-input
                      id="inline-form-input-name"
                      class="mb-2 mr-sm-2 mb-sm-0"
                      placeholder="Name"
                      v-model="search.by.name"
                      v-on:keyup.enter="getHero()"
                    ></b-input>

                    <b-button variant="light" @click="getHero()"
                      >Find</b-button
                    >
                   
                  </b-form>
                </div>
              </div>
     <div
      class="mt-4 mb-4 text-center"
      v-show="message"
      style="padding-top: 100px"
    >
      <b-spinner type="grow"></b-spinner>
      <p>{{ message }}</p>
    </div>
<div v-if="!loading">
               {{hero}}

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
//import { mapActions, mapGetters } from "vuex";
import store from '@/store/index'
import HeroDetail from "@/views/hero-detail";
export default {
  name: "Heroes",
  data() {
    return {
      loading: false,
      message: "",
      selectedHero: false,
      search: {
        by: {
          name: "",
          id: "",
        },
      },
    };
  },
  components: {
    HeroDetail,
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
      await store.dispatch('getHeroAction', this.search.by.name)
      .then(()=> {
        this.loading = false
         this.message = "";
      })
    
    },
  },
};
</script>