<template>
  <transition name="component-fade" mode="out-in">
    <div class="session-frame">
      <div class="session-outer-container">
        <div class="session">
          <div class="session-modal-buttons">
            <a v-if="!hideBack" @click="goBack">
              <i class="material-icons notranslate circle back">arrow_back</i>
            </a>
            <a v-if="!hideBack" @click="$router.push(`/`)">
              <i class="material-icons notranslate circle">close</i></a
            >
          </div>
          <slot></slot>
        </div>
      </div>
      <div class="session-close">
        <a class="user-box" @click="$router.push(`/`)">
          <i class="material-icons notranslate">close</i>
        </a>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: `session-frame`,
  components: {},
  props: {
    hideBack: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    goBack() {
      this.$router.go(`-1`)
    }
  }
}
</script>

<style>
@import "../../styles/session.css";
</style>
