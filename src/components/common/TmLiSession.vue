<template>
  <router-link :to="route" class="tm-li-session">
    <div class="tm-li-session-icon">
      <i class="material-icons notranslate circle">{{ icon }}</i>
    </div>
    <div class="tm-li-session-text">
      <div class="tm-li-session-title">
        <span>{{ title }}</span>
      </div>
    </div>
    <!-- <div class="tm-li-session-icon">
      <i class="material-icons notranslate">arrow_forward</i>
    </div> -->
  </router-link>
</template>

<script>
export default {
  name: `tm-li-session`,
  props: {
    icon: {
      type: String,
      default: ``
    },
    img: {
      type: String,
      default: ``
    },
    title: {
      type: String,
      required: true
    },
    route: {
      type: String,
      default: ``
    }
  }
}
</script>

<style scoped>
.tm-li-session {
  padding: 2rem 1.5rem;
  margin: 0.5rem;
  background-color: var(--app-fg);
  border-radius: 0.25rem;
  width: 33%;
}

.tm-li-session:hover {
  cursor: pointer;
  background: var(--hover-bg);
}

.tm-li-session-icon {
  padding-bottom: 1rem;
}

.tm-li-session-icon i {
  font-size: 1.25rem;
}

.tm-li-session-icon img {
  max-height: 100%;
  max-width: 52px;
  display: block;
}

.tm-li-session-title {
  color: var(--bright);
  font-size: var(--h4);
  font-weight: 400;
}

.material-icons.circle {
  border: 2px solid var(--dim);
  color: var(--dim);
  border-radius: 50%;
  padding: 0.5rem;
}
</style>
