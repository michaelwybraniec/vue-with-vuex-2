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
import { dataService } from "../shared";
import HeroDetail from "@/views/hero-detail";
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
      this.message = "Getting the hero, please be patient!";
      await dataService.getHero(this.search.by.name);
      this.message = "";
    },
  },
  computed: {
    ...mapGetters(["getHeroById"]),
  },
};
</script>
