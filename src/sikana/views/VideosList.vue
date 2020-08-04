<template>
  <div id="videos-list">
  <b-container class="my-5">
    <b-row>
      <SectionTitle :section="currentSection" />
    </b-row>
    <b-card
      no-body
      :style="style"
      class="mt-4 header-card bg-secondary text-light"
    >
      <b-container class="my-auto">
        <b-row>
          <b-col class="m-4">
            <b-card-title>{{ currentSubsection.title }}</b-card-title>
            <b-card-text class="description">
              <v-clamp
                ref="c"
                autoresize
                :max-lines="9"
                :expanded.sync="expanded"
              >
                {{ currentSubsection.description }}
  <template v-slot:after="slotProps">
        <b-button
          class="more-text"
          variant="dark"
          v-if="slotProps.clamped"
          v-on:click="toggleExpanded">(more) {{ clamped }}</b-button>
  </template>
              </v-clamp>
            </b-card-text>
          </b-col>
          <b-col>
          </b-col>
        </b-row>
      </b-container>
    </b-card>
  </b-container>

  <b-container
      class="subsection-container my-5"
      v-for="s in currentSubsection.children"
      :key="'subsection-' + s.id"
  >
  <b-row>
  <h3>{{ s.title }}</h3>
  </b-row>
  <b-row>
        <b-col
          cols="6"
          md="4"
          class="subsection"
          v-for="v in s.children.slice(0, 6)"
          xxx-v-for="v in s.children"
          :key="'video-' + v.id"
        >
          <div class="rounded overflow-hidden mb-2 mt-4">
            <b-link
              v-on:click="goToContent(v)"
              class="m-0 text-reset text-decoration-none"
              >
            <img
              v-if="v.thumbnail"
              :alt=v.title
              :src=v.thumbnail
              class="w-100"
            >
            <p v-else>{{ v.title }}</p>
            </b-link>
          </div>
        </b-col>
  </b-row>
  <b-collapse :id="'collapse-'+ s.id" class="mt-2">
  <b-row>
        <b-col
          cols="6"
          md="4"
          class="subsection"
          v-for="v in s.children.slice(6)"
          xxx-v-for="v in s.children"
          :key="'video-' + v.id"
        >
          <div class="rounded overflow-hidden mb-2 mt-4">
            <b-link
              v-on:click="goToContent(v)"
              class="m-0 text-reset text-decoration-none"
              >
            <img
              v-if="v.thumbnail"
              :alt=v.title
              :src=v.thumbnail
              class="w-100"
            >
            <p v-else>{{ v.title }}</p>
            </b-link>
          </div>
        </b-col>
  </b-row>
  </b-collapse>
  <b-row
    align-h="center"
    v-if="s.children.length > 6"
  >
    <b-button class="mt-2" v-b-toggle="'collapse-' + s.id" variant="light">
      <span class="when-open">Show less</span>
      <span class="when-closed">Show more</span>
      <b-icon-arrow-up class="when-open"/>
      <b-icon-arrow-down class="when-closed"/>
    </b-button>
  </b-row>
  </b-container>
  </div>
</template>

<script>
import VClamp from 'vue-clamp';
import SectionTitle from '@/sikana/components/SectionTitle.vue';
import { goToContent } from '@/sikana/sikana';

export default {
  name: 'VideosList',
  components: {
    SectionTitle,
    VClamp,
  },
  data() {
    return {
      expanded: false,
    };
  },
  computed: {
    currentSection() {
      return this.$root.$children[0].currentSection;
    },
    currentSubsection() {
      return this.$root.$children[0].currentSubsection;
    },
    style() {
      return `background-image: linear-gradient(.25turn, rgba(0, 0, 0, .8), rgba(0, 0, 0, .8), rgba(0, 0, 0, .1)), url(${this.currentSubsection.thumbnail}) !important;`;
    },
  },
  methods: {
    toggleExpanded() {
      this.expanded = !this.expanded;
    },
    goToContent,
  },
};
</script>

<style lang="scss" scoped>
@import '@/sikana/styles.scss';

.header-card {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-style: none;;
  text-shadow: 0 1px 0 black;
  font-weight: 400;
  min-height: 20rem;

}
.subsection {
  font-weight: 600;
  transition: all ease .4s;
  img {
    transform: scale(1);
    transition: all ease .8s;
    border-style: none;
  }
  &:hover {
    color: $primary;
    img {
      transform: scale(1.1);
    }
  }
}

.collapsed > .when-open,
.not-collapsed > .when-closed {
  display: none;
}

button:hover {
  color: $primary;
}

.more-text {
  background: none;
  border: none;
}
</style>
