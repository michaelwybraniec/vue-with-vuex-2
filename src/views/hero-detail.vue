<template>
  <b-card class="mt-2 mb-2 m-0 ">
    <b-row>
      <b-col>
        <b-row class="my-1 mb-2 text-center">
          <b-col>
            <div style="height: 280px">
              <div
                class="text-center"
                style="padding-top: 40px;"
                v-if="!picLoaded"
                v-show="message"
              >
                <b-spinner type="grow"></b-spinner>
                <p>{{ message }}</p>
              </div>
              <div v-if="picLoaded">
                <b-img :src="pic" v-bind="mainProps" fluid alt="img"></b-img>
              </div>
            </div>
            <h3>{{ clonedHero.name }}</h3>
            <p>
              ( ID: <code>{{ clonedHero.id }}</code> )
            </p>
          </b-col>
        </b-row>

        <div
          v-for="(value, name, index) in clonedHero"
          v-bind:key="index + name"
          class=""
        >
          <b-row v-if="index !== 0" class="border-bottom mt-2 pb-2">
            <b-col md="2">
              <label for="{name}">
                <b>{{ name }}:</b>
              </label>
            </b-col>
            <b-col md="10">
              <span v-if="typeof value === 'string'" class="border-left pl-3">
                {{ value }}
              </span>
              <span v-else>
                <div
                  v-for="(value, name, index) in value"
                  v-bind:key="index + name"
                  class="border-left pl-3"
                >
                  <b-row>
                    <b-col md="3">
                      <b>{{ name }}:</b>
                    </b-col>
                    <b-col md="9">
                      <div
                        v-if="
                          typeof value === 'string' || typeof value === 'number'
                        "
                        class="border-left pl-3"
                      >
                        {{ value }}
                      </div>
                      <span v-else>
                        <div
                          v-for="(value, name, index) in value"
                          v-bind:key="index + value"
                          class="border-left pl-3"
                        >
                          <span v-if="typeof value === 'string'">
                            {{ value }}
                          </span>
                        </div>
                      </span>
                    </b-col>
                  </b-row>
                </div>
              </span>
            </b-col>
          </b-row>
        </div>

        <!-- <b-row class="my-1">
          <b-col md="2">
            <label for="name">Name:</label>
          </b-col>
          <b-col md="10">
            <b-form-input id="name" v-model="clonedHero.name"></b-form-input>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="2">
            <label for="description">Description:</label>
          </b-col>
          <b-col md="10">
            <b-form-input
              id="description"
              v-model="clonedHero.description"
            ></b-form-input>
          </b-col>
        </b-row>

        <div v-if="comicses.length > 0">
          <div class="text-center pt-4">
            Comics found: {{ clonedHero.comics.items.length }}
          </div>
          <div class="text-center pt-2 pb-2">First 3:</div>
          <div :key="comics.name" v-for="(comics, index) in comicses">
            <b-row class="my-1" v-if="index < 3">
              <b-col md="2">
                <label>{{ index + 1 }}:</label>
              </b-col>
              <b-col md="10" style="padding-left: 15px"
                >{{ comics.name }} ({{ comics.name }})</b-col
              >
            </b-row>
          </div>
        </div>

        <b-row class="text-center">
          <b-col
            v-show="messageNoComics"
            class="m-4"
            style="padding-top: 57px;"
          >
            <code>{{ messageNoComics }}</code>
          </b-col>

          <b-col v-show="message4comics" class="m-4" style="padding-top: 20px;">
            <b-spinner type="grow"></b-spinner>
            <p>{{ message4comics }}</p>
          </b-col>
        </b-row>

        <div class="float-right mt-4">
          <b-button class="mr-2" variant="light" @click="cancelHero()"
            >Cancel</b-button
          >
          <b-button variant="light" @click="saveHero()">Save</b-button>
        </div> -->
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
export default {
  name: 'HeroDetail',
  props: {
    id: {
      type: Number,
      default: 0
    },
    hero: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      clonedHero: {},
      message: '',
      message4comics: '',
      messageNoComics: '',
      picLoaded: undefined,
      pic: '',
      comicses: [],
      mainProps: {
        center: true,
        width: 200
      }
    }
  },
  computed: {
    fullName() {
      return this.clonedHero
        ? this.clonedHero.name + this.clonedHero.description
        : ''
    }
  },
  async mounted() {
    await this.cloneHero()
    await this.loadPics()
    await this.loadComics()
  },
  methods: {
    async cloneHero() {
      this.clonedHero = { ...this.hero } // to avoid obj mutation.
    },
    async loadPics() {
      this.message = 'Loading photo...'
      this.pic = this.clonedHero.image && this.clonedHero.image.url

      if (this.pic) {
        this.picLoaded = true
        this.message = ''
      } else this.message = 'Err.'
    },
    loadComics() {
      this.message4comics = 'And now getting comics info...'
      this.comicses = this.clonedHero.comics.items
      console.log('All comics available:', this.clonedHero.comics.items.length)
      if (this.clonedHero.comics.items.length === 0) {
        this.messageNoComics = 'No commics available :-('
      } else {
        this.messageNoComics = ''
      }
      this.message4comics = ''
    },
    cancelHero() {
      this.$emit('cancel')
    },
    async saveHero() {
      this.$emit('save', this.clonedHero)
    }
  }
}
</script>
