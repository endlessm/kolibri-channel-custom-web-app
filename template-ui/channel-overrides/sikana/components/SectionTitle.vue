<template>
<b-container>
  <h2 :class="{ title: hasIcon }" :id="sectionSlug">
    <i :class="iconClasses" v-if="hasIcon"></i>
    {{ section.title }}
  </h2>
</b-container>
</template>

<script>
import { getSlug } from '@/utils';

export default {
  name: 'SectionTitle',
  props: {
    section: Object,
  },
  computed: {
    sectionSlug() {
      return getSlug(this.section.title);
    },
    iconClasses() {
      const title = this.section.title.toLowerCase();
      return `text-primary si si-${title}`;
    },
    hasIcon() {
      return [
        'Cooking',
        'Art',
        'Nature',
        'Sport',
        'DIY',
        'Health',
      ].includes(this.section.title);
    },
  },
};
</script>

<style lang="scss">
  @font-face {
    font-family: "sikana-icons";
    src: url("../assets/sikana-icons2.woff") format("woff");
  }

  .si {
    position: absolute;
    left: 0;
    bottom: 0;
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
    &.si-sport::before {
      content: "\5f";
    }
  }

  .title {
    font-weight: 500;
    position: relative;
    padding-left: 50px;
  }
</style>
