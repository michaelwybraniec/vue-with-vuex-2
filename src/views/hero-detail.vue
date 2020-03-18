<template>
  <b-card class="m-0">
    <div>
      <b-row>
        <b-col md="12">
          <div v-if="picLoaded" class="">
            <b-img
              :src="pic"
              v-bind="mainProps"
              fluid
              alt="this.message"
              width="180 px"
              class="float-left rounded "
            ></b-img>
          </div>

          <b-button
            class="float-right border btn-sm"
            variant="light"
            @click="cancelHero()"
          >
            <b-icon icon="arrow-left-short" font-scale="2"></b-icon>
          </b-button>

          <b-row class="my-1">
            <b-col sm="12" class="pb-2">
              Id: <code>{{ clonedHero.id }}</code>

              <b-button
                variant="light"
                class="btn-sm border ml-2"
                @click="onEdit()"
              >
                <div v-if="!this.edit">Edit</div>
                <div v-if="this.edit">Save</div>
              </b-button>

              <!-- <b-button
                  v-if="!this.edit"
                  variant="light"
                  class="btn-sm border ml-2"
                  @click="onSave()"
                >
                  <div v-if="!this.edit">Submit</div>
                </b-button> -->

              <b-button
                variant="light"
                class="btn-sm border ml-2"
                @click="onDetails()"
              >
                <div v-if="!this.details">More details</div>
                <div v-if="this.details">Hide details</div>
              </b-button>

              <b-button
                v-if="this.clonedHero"
                variant="light"
                class="btn-sm border ml-2"
                @click="onAddToFavorites()"
              >
                <div v-if="!this.favorite">Add to favorites</div>
                <div v-if="this.favorite">Added to favourites</div>
              </b-button>
            </b-col>
            <b-col>
              <h3 v-if="fullName">
                {{ fullName }}
              </h3>

              <div v-if="this.edit" class="pb-3">
                <b-row class="my-1">
                  <b-col md="2">
                    <label for="name">Name:</label>
                  </b-col>
                  <b-col md="10">
                    <b-form-input
                      id="name"
                      v-model="clonedHero.name"
                    ></b-form-input>
                  </b-col>
                </b-row>

                <b-row>
                  <b-col md="2">
                    <label for="description">Full name:</label>
                  </b-col>
                  <b-col md="10">
                    <b-form-input
                      id="description"
                      v-model="clonedHero.biography['full-name']"
                    ></b-form-input>
                  </b-col>
                </b-row>
              </div>

              <h6>
                <b>Appearance</b>:
                <span
                  v-for="(value, name, index) in clonedHero.appearance"
                  v-bind:key="index + name"
                  >{{ name }}: <b>{{ value }}</b>
                  <span
                    v-if="
                      Object.keys(clonedHero.appearance).length - 1 !== index
                    "
                    >,
                  </span>
                  <span v-else>.</span>
                </span>
              </h6>
              <h6>
                <b>Powerstats</b>:
                <span
                  v-for="(value, name, index) in clonedHero.powerstats"
                  v-bind:key="index + name"
                  >{{ name }}: <b>{{ value }}</b>
                  <span
                    v-if="
                      Object.keys(clonedHero.powerstats).length - 1 !== index
                    "
                    >,
                  </span>
                  <span v-else>.</span>
                </span>
              </h6>
            </b-col>
          </b-row>
        </b-col>
      </b-row>

      <div v-if="this.details" class="mt-4 p-0">
        <div
          v-for="(value, name, index) in clonedHero"
          v-bind:key="index + name"
        >
          <b-row
            v-if="
              index !== 0 &&
                name !== 'name' &&
                name !== 'id' &&
                name !== 'image'
            "
            class="m-1 border"
          >
            <b-col sm="2">
              <b>{{ name }}:</b>
            </b-col>

            <b-col>
              <b-row
                v-for="(value, name, index) in value"
                v-bind:key="index + name"
                class="border-left"
              >
                <b-col md="3">
                  <b>{{ name }}:</b>
                </b-col>

                <b-col>
                  <div
                    v-if="
                      typeof value === 'string' || typeof value === 'number'
                    "
                    class="border-left pl-3 row"
                  >
                    {{ value }}
                  </div>

                  <div v-else>
                    <b-row
                      v-for="(value, name, index) in value"
                      v-bind:key="index + value"
                      class="border-left pl-3"
                    >
                      <span v-if="typeof value === 'string'">
                        {{ value }}
                      </span>
                    </b-row>
                  </div>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </div>
      </div>

      <div class="float-right mt-4">
        <b-button class="mr-2 border" variant="light" @click="cancelHero()"
          >Cancel</b-button
        >
        <b-button class="border" variant="light" @click="saveHero()"
          >Submit</b-button
        >
      </div>
    </div>
  </b-card>
</template>

<script>
import store from '@/store/index'
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
      favorite: false,
      edit: false,
      details: false,
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
    onAddToFavorites() {
      this.favorite = !this.favorite
      if (this.favorite)
        store.dispatch('addFavoriteHero', {
          id: this.clonedHero.id,
          name: this.clonedHero.name
        })
      else console.log(this.favorite)
    },
    onEdit() {
      this.edit = !this.edit
    },
    onDetails() {
      this.details = !this.details
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
