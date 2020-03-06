<template>
  <b-container>
    <div
      class="mt-4 mb-4 text-center"
      v-show="message"
      style="padding-top: 100px"
    >
      <b-spinner type="grow"></b-spinner>
      <p>{{ message }}</p>
    </div>
    <div v-if="!message">
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
                      v-on:keyup.enter="findHero()"
                    ></b-input>

                    <b-button variant="light" @click="findHero()"
                      >Find</b-button
                    >
                  </b-form>
                </div>
              </div>

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
    </div>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import HeroDetail from "@/views/hero-detail";
import axios from "axios";
import { API } from "../shared/config";
export default {
  name: "Heroes",
  data() {
    return {
      message: "",
      hero: {},
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
  async mounted() {
    //await this.loadHeroes();
  },
  methods: {
    ...mapActions(["getHeroAction"]),
    parseItem(response, code) {
      if (response.status !== code) throw Error(response.message);
      let item = response.data;
      if (typeof item !== "object") {
        item = undefined;
      }
      return item;
    },
    async findHero() {
      // const testURL = `${API.heroes.url}/${API.heroes.key}/${this.search.by.name}`;
      // const myInit = {
      //   method: "HEAD",
      //   mode: "no-cors",
      // };
      // const myRequest = new Request(testURL, myInit);
      // await fetch(myRequest)
      //   .then(function(response) {
      //     // let hero = this.sparseItem(response, 200);
      //     //  hero.fullName = `${hero.firstName} ${hero.lastName}`;
      //     //  return hero;
      //     console.log(response);

      //     return response;
      //   })
      //   .then(function(response) {
      //     console.log(response);
      //   })
      //   .catch(function(err) {
      //     console.error(err);
      //     return null;
      //   });

      await axios(
        `${API.heroes.url}/${API.heroes.key}/${this.search.by.name}`,
        {
          method: "GET",
          mode: "no-cors",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          withCredentials: true,
          credentials: "same-origin",
        },
      )
        .then(function(response) {
          let hero = this.sparseItem(response, 200);
          hero.fullName = `${hero.firstName} ${hero.lastName}`;
          return hero;
        })
        .catch(function(error) {
          console.error(error);
          return null;
        });
    },
    // async loadHeroes() {
    //   this.message = "Getting the heroes, please be patient";
    //   await this.getHeroesAction();
    //   this.message = "";
    // },
  },
  computed: {
    ...mapGetters(["getHeroById"]),
  },
};
</script>
