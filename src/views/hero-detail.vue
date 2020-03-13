<template>
  <b-card class="mt-2 mb-2 m-0">
    <b-row>
      <b-col>
        <b-row class="my-1 mb-2 text-center">
          <b-col>
            <b-button class="float-right" variant="light" @click="saveHero()">
              <b-icon icon="arrow-left-short" font-scale="2"></b-icon>
            </b-button>
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
                <b-img :src="pic" v-bind="mainProps" thumbnail fluid alt="img" class="shadow"></b-img>
              </div>
            </div>
            <h3 v-if="fullName">{{fullName}}</h3>
            <p>
              ( id:
              <code>{{ clonedHero.id }}</code> )
            </p>
          </b-col>
        </b-row>

        <div class="pb-4">
          <b-row class="my-1">
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
              <b-form-input id="description" v-model="clonedHero.biography['full-name']"></b-form-input>
            </b-col>
          </b-row>
        </div>

        <div v-for="(value, name, index) in clonedHero" v-bind:key="index + name" class>
          <b-row v-if="index !== 0" class="border-bottom mt-2 pb-2">
            <b-col md="2">
              <label for="{name}">
                <b>{{ name }}:</b>
              </label>
            </b-col>
            <b-col md="10">
              <span v-if="typeof value === 'string'" class="border-left pl-3">{{ value }}</span>
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
                      >{{ value }}</div>
                      <span v-else>
                        <div
                          v-for="(value, name, index) in value"
                          v-bind:key="index + value"
                          class="border-left pl-3"
                        >
                          <span v-if="typeof value === 'string'">{{ value }}</span>
                        </div>
                      </span>
                    </b-col>
                  </b-row>
                </div>
              </span>
            </b-col>
          </b-row>
        </div>

        <div class="float-right mt-4">
          <b-button class="mr-2 border" variant="light" @click="cancelHero()">Cancel</b-button>
          <b-button class="border" variant="light" @click="saveHero()">Save</b-button>
        </div>
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
      picLoaded: undefined,
      pic: '',
      mainProps: {
        center: true,
        width: 200
      }
    }
  },
  computed: {
    fullName() {
      return this.clonedHero
        ? this.clonedHero.name +
            ' ( ' +
            this.clonedHero.biography['full-name'] +
            ' )'
        : ''
    }
  },
  async mounted() {
    await this.cloneHero()
    await this.loadPicture()
  },
  methods: {
    async cloneHero() {
      this.clonedHero = { ...this.hero }
      console.log('cloneHero -> this.hero', this.hero)
    },
    async loadPicture() {
      this.message = 'Loading photo...'
      this.pic = this.clonedHero.image && this.clonedHero.image.url
      if (this.pic) {
        this.picLoaded = true
        this.message = ''
      } else this.message = 'Picture unavailable ;-)'
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
