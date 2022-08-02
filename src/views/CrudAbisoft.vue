<template>
  <div>
    <b-container>
      <b-row>
        <b-col cols="12">
          <h3>Abisoft</h3>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <location-table
            :records="records"
            :busy="isBusy"
            @handleCreating="handleCreating"
            @handleDetail="handleDetail"
            @handleEditing="handleEditing"
            @handleDeleting="handleDeleting"    
          />
        </b-col>
      </b-row>
    </b-container>
    <base-modal :title="title" :id="id">
      <template v-slot:form>
        <form-user :record="record" :isDisable="isDisable" @save="save" />
      </template>
    </base-modal>
  </div>
</template>

<script>
import { BContainer, BCol, BRow } from "bootstrap-vue";
import ActionCRUD from "@/mixins/ActionCRUD";
import BaseModal from "@/components/base/BaseModal";
import FormUser from "@/components/forms/FormUser";
import LocationTable from "@/components/table/LocationTable";


export default {
  inject: ["userRepository"],
  mixins: [ActionCRUD],
   components: {
    BContainer,
    BCol,
    BRow,
    BaseModal,
    FormUser,
    LocationTable,
  },
  data() {
    return {
      repository: "userRepository",
      title: "Crear usuario",
      id: "modal-user",
      isDisable: null,
      record: null,
      records: [],
      isBusy: false,
    };
  },
  methods: {
    handleCreating() {
      const me = this;
      me.title = "Crear usuario";
      me.isDisable = false;

      me.record = null;
      me.$bvModal.show(me.id);
    },
    handleDetail(item) {
      const me = this;
      me.title = "Detalle usuario";
      me.isDisable = true;
      me.record = item;
      me.$bvModal.show(me.id);
    },
    handleEditing(item) {
      const me = this;
      me.title = "Actualizar usuario";
      me.isDisable = false;
      me.record = item;
      me.$bvModal.show(me.id);
    },
    async handleDeleting(id) {
      await this.del(id);
    },
  },
  async mounted() {
    const me = this;
    await me.handleLoadData();
  },
}
</script>

<style>

</style>