<template>
  <div id="app">
    <b-container id="nav">
<b-row>
  <b-col md="auto">
      <b-button-toolbar>
        <b-button-group class="top">
          <b-button variant="light" to="/">
            <img :src="logo" alt="Sikana" />
          </b-button>
          <b-button
            v-for="section in mainSections"
            variant="light"
            :to="getSectionUrl(section)"
            :key="'menu-' + section.id"
            :class="{ current: section === currentSection }"
          >
            <span>{{ section.title }}</span>
          </b-button>
          <b-button  variant="light" v-b-toggle:collapse-search>
            <b-icon-search></b-icon-search>
          </b-button>
        </b-button-group>
      </b-button-toolbar>
  </b-col>
</b-row>
<b-collapse id="collapse-search">
<b-row>
  <b-col md="12">
    <vue-bootstrap-typeahead
      v-model="query"
      placeholder="Search"
      :serializer="searchLabel"
      :data="contentNodes"
      v-on:hit="goToContent"
    />
  </b-col>
</b-row>
</b-collapse>

    </b-container>

    <router-view/>

    <div id="footer" class="mt-5 bg-secondary">
      <b-container>
        <b-card class="border-0 bg-transparent text-light text-center">
          <h3>About {{ channel.title }}</h3>
          <p class="font-weight-bold">{{ channel.description }}</p>
        </b-card>
      </b-container>
    </div>
  </div>
</template>

<script>
import arrayToTree from 'array-to-tree';
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead';
import { getSlug, goToContent, askChannelInformation } from '@/kolibri-api';
import logo from '@/sikana/sikana-logo.png';

let mockData;
if (process.env.VUE_APP_USE_MOCK_DATA === 'true') {
  // eslint-disable-next-line global-require
  mockData = require('@/nodes.json');
}

export default {
  name: 'App',
  components: {
    VueBootstrapTypeahead,
  },
  data() {
    return {
      channel: {},
      nodes: [],
      currentSection: {},
      currentSubsection: {},
      query: '',
      logo,
    };
  },
  watch: {
    $route(to) {
      if (to.name !== 'VideosList') {
        this.currentSection = {};
        this.currentSubsection = {};
        return;
      }
      console.log(to.params.section, to.params.subsection);
      const section = this.mainSections.find((n) => getSlug(n.title) === to.params.section);
      if (!section || !section.children) {
        this.currentSection = {};
        this.currentSubsection = {};
        return;
      }
      this.currentSection = section;
      const subsection = section.children.find((n) => getSlug(n.title) === to.params.subsection);
      if (!subsection) {
        this.currentSubsection = {};
        return;
      }
      this.currentSubsection = subsection;
    },
  },
  computed: {
    contentNodes() {
      return this.nodes.filter((n) => n.kind !== 'topic');
    },
    nodesTree() {
      return arrayToTree(this.nodes, { parentProperty: 'parent' });
    },
    mainSections() {
      if (this.nodesTree && this.nodesTree[0]) {
        return this.nodesTree[0].children;
      }
      return [];
    },
  },
  methods: {
    gotChannelInformation(data) {
      if (data.channel) {
        this.channel = data.channel;
      }
      if (data.nodes) {
        this.nodes = data.nodes;
      }
    },
    getSectionUrl(section) {
      return `/#${getSlug(section.title)}`;
    },
    searchLabel(node) {
      return node.title;
    },
    goToContent,
  },
  created() {
    if (process.env.VUE_APP_USE_MOCK_DATA === 'true') {
      this.gotChannelInformation(mockData);
    } else {
      askChannelInformation(this.gotChannelInformation);
    }
  },
};
</script>

<style lang="scss">
@import './styles.scss';

@font-face {
  font-family: "sikana-icons";
  src: url("./sikana-icons2.woff") format("woff");
}

.si {
  font: normal normal normal 40px/1 "sikana-icons";
  &.si-cooking::before {
    content: "\22";
  }
  &.si-art::before {
    content: "\32";
  }
  &.si-diy::before {
    content: "\28";
  }
  &.si-nature::before {
    content: "\5e";
  }
  &.si-health::before {
    content: "\29";
  }
  &.si-sports::before {
    content: "\5f";
  }
}

.btn-group {
  display: initial !important;
}

.btn-toolbar img {
  height: 2em;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nav {
  a {
    &.current, &.router-link-exact-active {
      color: $primary;
    }
  }
}

#footer {
  text-shadow: 1px 1px 2px #333;
  background-image: url("./sikana-footer.jpg");
  background-repeat: repeat;
}
</style>
