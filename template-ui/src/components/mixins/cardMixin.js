import { getThumbnail, goToContent } from 'kolibri-api';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      thumbnail: null,
      isHovered: false,
    };
  },
  computed: {
    ...mapGetters(['getCardLabel', 'getAsset']),
    title() {
      if (this.node.kind === 'topic') {
        return this.getCardLabel(this.node);
      }
      return this.node.title;
    },
    isLeaf() {
      return this.node.kind !== 'topic';
    },
  },
  methods: {
    goToContent,
    getTopicUrl(node) {
      return `/${node.id}`;
    },
    async getThumbnail() {
      if (!this.node.thumbnail && process.env.VUE_APP_USE_MOCK_DATA === 'true') {
        this.thumbnail = this.getAsset('defaultThumbnail');
        this.$emit('thumbLoaded', this.thumbnail);
        return;
      }
      if (this.node.thumbnail) {
        this.thumbnail = this.node.thumbnail;
        this.$emit('thumbLoaded', this.thumbnail);
        return;
      }
      const thumbnail = await getThumbnail(this.node);
      if (thumbnail) {
        this.thumbnail = thumbnail;
      } else {
        this.thumbnail = this.getAsset('defaultThumbnail');
      }
      this.$emit('thumbLoaded', this.thumbnail);
    },
    handleHover(hovered) {
      this.isHovered = hovered;
    },
  },
  created() {
    if (this.node) {
      this.getThumbnail();
    }
  },
};
