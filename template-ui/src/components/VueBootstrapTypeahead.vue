<template>
  <div>
    <div :class="sizeClasses">
      <div
        ref="prependDiv"
        v-if="$slots.prepend || prepend"
        class="input-group-prepend"
      >
        <slot name="prepend">
          <span class="input-group-text">{{ prepend }}</span>
        </slot>
      </div>
      <input
        ref="input"
        type="search"
        :class="`form-control ${inputClass}`"
        :placeholder="placeholder"
        :aria-label="placeholder"
        :value="inputValue"
        @focus="isFocused = true"
        @blur="handleBlur"
        @input="handleInput($event.target.value)"
        autocomplete="off"
      />
      <div v-if="$slots.append || append" class="input-group-append">
        <slot name="append">
          <span class="input-group-text">{{ append }}</span>
        </slot>
      </div>
    </div>
    <vue-bootstrap-typeahead-list
      class="vbt-autcomplete-list"
      ref="list"
      :class="{
        'vbt-autcomplete-list--hidden': !(isFocused && data.length > 0)
      }"
      :query="inputValue"
      :data="formattedData"
      :background-variant="backgroundVariant"
      :text-variant="textVariant"
      :maxMatches="maxMatches"
      :minMatchingChars="minMatchingChars"
      @hit="handleHit"
    >
      <!-- pass down all scoped slots -->
      <template
        v-for="(slot, slotName) in $scopedSlots"
        :slot="slotName"
        slot-scope="{ data, htmlText }"
      >
        <slot :name="slotName" v-bind="{ data, htmlText }"></slot>
      </template>
    </vue-bootstrap-typeahead-list>
  </div>
</template>

<script>
// Workaround to fix dead list selection in IE
// https://github.com/alexurquhart/vue-bootstrap-typeahead/issues/14#issuecomment-547389426
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead';

export default {
  extends: VueBootstrapTypeahead,
};
</script>

<style lang="scss">
/* Fake for IE. because it doesn't emit the hit event when using display:none */
.vbt-autcomplete-list--hidden {
  animation-name: hide;
  animation-fill-mode: both;
  animation-duration: 0.3s;
  animation-timing-function: linear;
}

@keyframes hide {
  to {
    visibility: hidden;
    display: none;
  }
}
</style>
