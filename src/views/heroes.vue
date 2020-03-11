<template>
  <b-container>
      <b-card-group deck class="pt-4">
        <b-card header="Heroes" class="shadow">
          <b-row>
            <b-col>
              <div >
                <div>
                  <b-form inline>
                    <label class="sr-only" for="inline-form-input-name">Search:</label>
                    <b-input
                      id="inline-form-input-name"
                      class="mb-2 mr-sm-2 mb-sm-0"
                      placeholder="Name or ID"
                      v-model="search.input"
                      v-on:keyup.enter="getHero()"
                    ></b-input>

                    <b-button
                      variant="light"
                      class="border"
                      @click="getHero()"
                      :disabled="this.buttons.search.disabled">
                     
                       <div v-if="!loading">
                          Search
                       </div>
                       <div v-else>
                          <b-spinner small type="grow"></b-spinner>
                        Loading...
                       </div>
                    </b-button>

                    <fade-transition v-if="buttons.clear.show">
                      <b-button 
                        variant="light" 
                        @click="clearHero()"
                        class="ml-2 border"
                        >
                        Clear
                      </b-button>
                    </fade-transition>
                    
                   <fade-transition v-if="this.message.error" >
                    <b-alert 
                    show
                     
                      variant="danger"
                      style="padding: 6px; margin: 0px;" 
                      class="ml-2 pl-3 pr-3"
                      >
                      {{this.message.error}}
                    </b-alert>
                  </fade-transition>
                   
                  </b-form>
                </div>
              </div>

             
              <div v-if="!loading">

                <b-list-group v-if="hero">
                  <div v-if="hero.response !== 'success'">
                    <div v-for="(value, name, index) in hero" v-bind:key="index">
                        <b-list-group-item button class="shadow-sm mt-1">
                        //TODO: Component
                          <span v-if="value.length">{{value}}</span>
                            <div v-else>
                              <div v-for="(value, name, index) in value" v-bind:key="index">
                                <span> - <i> {{ name }} </i>: {{value}}</span>
                              </div>
                            </div>
                          <br>
                        </b-list-group-item>
                    </div>
                  </div>
                  <div v-else>
                    <b-list-group-item button class="shadow-sm mt-1">
                      Result: {{hero.name}} <br>
                      //TODO: Component
                    </b-list-group-item>
                  </div>
                </b-list-group>
                
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
      buttons: {
        search:{ 
          disabled: true
          },
        clear: {
          show: false
        }
      },
      message: {
        info:undefined,
        error:undefined,
        success: undefined
      },
      search: {
        input: undefined
      },
    };
  },
    components: {
   // HeroDetail,
  },
  watch: {
   disableSearch () {
     if(this.search.input === "") this.buttons.search.disabled = true;
     else this.buttons.search.disabled = false;
   },
   apiError(errNew, errOld) {
     console.log("apiErro_____", errNew, errOld)
 if(errNew === "access denied") this.message.error = "Api access denied, try later pls !";
   }
  },
  computed: {
    disableSearch() {
      return this.search.input
      },
    hero() {
      return store.getters.getAvailableHero
    },
    apiError() { 
      console.log(" falling into computed apiErrorMsg", store.getters.getApiErrorMsg)
      return store.getters.getApiErrorMsg
    }
  },
  methods: {
     async getHero() {
      if(this.search.input !== ''){
        this.message.info = "Getting the hero, please be patient!";
        this.loading = true;
        this.buttons.search.disabled = true;
        await store.dispatch('getHeroAction', this.search.input)
        this.message.info = undefined;
        this.loading = false;
        this.buttons.search.disabled = false;
        this.buttons.clear.show = true;
      }
      else {
        this.message.error = "Input empty, I can't read minds yet!"
        this.disabled = true;
      }
    },
    clearHero(){
      store.dispatch('clearHeroAction')
      this.buttons.clear.show = false;
      this.message.error = undefined;
    }
  },
};
</script>
