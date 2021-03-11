<template>
  <b-navbar toggleable="lg" type="light" variant="light">
    <HeaderNavBarBrand />

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <slot name="sections">
        <HeaderNavBarSections />
      </slot>

      <slot></slot>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <slot name="right"></slot>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>

export default {
  name: 'HeaderNavBar',
};
</script>
