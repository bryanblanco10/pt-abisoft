<template>
  <b-modal
    :id="id"
    hide-footer
    centered
    :size="size"
  >
    <template v-slot:modal-header="{ close }">
      <h5>{{ title }}</h5>
      <button class="btn__close" @click="close()">
        <b-icon-x font-scale="2" />
      </button>
    </template>
    <b-container>
      <slot name="form" />
    </b-container>
  </b-modal>
</template>

<script>
import {
  BModal,
  BIconX,
  BContainer,
} from "bootstrap-vue";

export default {
  components: {
    BModal,
    BIconX,
    BContainer,
  },
  props: {
    title: {
      type: String,
      default: null,
    },
    id: {
      type: String,
      defualt: null,
    },
    size: {
      type: String,
      default: 'lg',
    },
  }
}
</script>

<style>

</style>