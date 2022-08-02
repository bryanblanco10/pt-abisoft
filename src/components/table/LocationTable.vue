<template>
  <b-card no-body class="p-2 overflow-hidden">
    <b-row>
      <b-col lg="6" class="mb-2">
        <div class="d-flex">
          <b-button
            variant="success"
            class="btn-icon mr-2"
            size="sm"
            @click.prevent="() => $emit('handleCreating')"
          >
            Nuevo usuario
          </b-button>
        </div>
      </b-col>
      <b-col lg="1" />
      <b-col lg="5" class="">
        <b-form-group>
          <b-input-group size="sm">
            <b-form-input
              v-model="filter"
              type="search"
              placeholder="Buscar"
            ></b-form-input>

            <b-input-group-append>
              <b-button size="sm" :disabled="!filter" @click="filter = ''">
                Limpiar
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>

    <b-table
      ref="selectableTable"
      striped
      hover
      responsive
      bordered
      small
      show-empty
      b-table-select-multi
      :fields="fields"
      :items="records"
      :filter="filter"
      :busy="busy"
      :filter-included-fields="filterOn"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      @filtered="onFiltered"
    >
      <template #table-busy>
        <div class="text-center text-success my-2">
          <b-spinner class="align-middle mr-1" />
          <strong>Cargando datos...</strong>
        </div>
      </template>
      <template #empty>
        <h6 class="text-center py-2">No hay registros</h6>
      </template>
      <template #cell(actions)="data">
        <div class="d-flex">
          <b-button
            variant="primary"
            class="btn-icon btn_icon mr-2"
            size="sm"
            @click.prevent="() => $emit('handleDetail', data.item)"
          >
            <b-icon-eye-fill class="mr-25" />
          </b-button>
          <b-button
            variant="warning"
            class="btn-icon btn_icon mr-2"
            size="sm"
            @click.prevent="() => $emit('handleEditing', data.item)"
          >
            <b-icon-pencil-square class="mr-25" />
          </b-button>
          <b-button
            variant="danger"
            class="btn-icon btn_icon mr-2"
            size="sm"
            @click.prevent="() => $emit('handleDeleting', data.item.uuid)"
          >
            <b-icon-trash-fill class="mr-25" />
          </b-button>
        </div>
      </template>
    </b-table>
  </b-card>
</template>

<script>
import {
  BTable,
  BCol,
  BRow,
  BFormGroup,
  BFormInput,
  BInputGroup,
  BInputGroupAppend,
  BButton,
  BSpinner,
  BCard,
  BIconTrashFill,
  BIconPencilSquare,
  BIconEyeFill,
} from "bootstrap-vue";

export default {
  components: {
    BTable,
    BCol,
    BRow,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BInputGroupAppend,
    BButton,
    BCard,
    BSpinner,
    BIconTrashFill,
    BIconPencilSquare,
    BIconEyeFill,
  },
  props: {
    records: {
      type: Array,
      default: () => [],
    },
    busy: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      filter: null,
      filterOn: [],
      sortDesc: false,
      sortDirection: "asc",
      fields: [
        {
          key: "fullname",
          label: "Nombre completo",
          sortable: true,
        },
        {
          key: "age",
          label: "Edad",
          sortable: true,
        },
        {
          key: "dateofbirth",
          label: "Fecha de nacimiento",
          sortable: true,
        },
        {
          key: "dateinscription",
          label: "Fecha de inscriptición",
          sortable: true,
        },
        {
          key: "cost",
          label: "Costo",
          sortable: true,
        },
        { key: "actions", label: "Accion" },
      ],
    };
  },
  methods: {
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.pagination.currentPage = 1;
    },
  },
};
</script>
<style lang="css">
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.table > thead {
  background: var(--fourth-color);
  color: var(--white-color);
  font-family: var(--fuente-econde-sans);
  font-size: 16px;
  text-align: center;
}

.table > tbody {
  color: var(--black-color);
  font-family: var(--fuente-econde-sans);
  font-size: 16px;
}

.actions_ {
  background: var(--white-color) !important;
  border: 1px solid var(--second-color) !important;
  color: var(--black-color) !important;
  font-weight: bold !important;
}

.btn_icon {
  margin-right: 5px;
}
</style>
