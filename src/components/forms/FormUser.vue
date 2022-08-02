<template>
  <b-form @submit.prevent="saveData" ref="form">
    <b-row class="mb-2">
      <b-col lg="12" md="12" sm="12">
        <div class="label_input text-danger">* Campos requeridos.</div>
      </b-col>
      <b-col lg="6" md="6" sm="12" class="mb-2">
        <div role="group">
          <label for="fullname" class="label_input">Nombre completo*</label>
          <b-form-input
            id="fullname"
            placeholder="Nombre completo"
            v-model="formData.fullname"
            :disabled="isDisable"
            @blur="validateFullname"
          />
          <span
            v-if="isCondition3"
            class="help-block text-danger text_error"
          >
            {{ messageValidation2("3") }}
          </span>
        </div>
      </b-col>
      <b-col lg="6" md="6" sm="12" class="mb-2">
        <div role="group">
          <label for="age" class="label_input">Edad*</label>
          <b-form-input
            id="age"
            placeholder="Edad"
            v-model="$v.formData.age.$model"
            @blur="$v.formData.age.$touch(), verifyAge()"
            :disabled="isDisable"
          />
          <span
            v-if="$v.formData.age.$error"
            class="help-block text-danger text_error"
          >
            {{ messageValidation($v.formData.age) }}
          </span>
        </div>
      </b-col>
      <b-col lg="6" md="6" sm="12">
        <date-picker
          v-model="formData.dateofbirth"
          class="margin-right"
          :attributes="attrs"
          :model-config="modelConfig"
          :available-dates="{ start: null, end: new Date() }"
          @input="verifyAge"
        >
          <template v-slot="{ inputValue, inputEvents }">
            <b-row>
              <b-col lg="12" md="12" sm="12">
                <div role="group">
                  <label class="label_input">Fecha de nacimiento</label>
                  <b-form-input
      
                    :value="inputValue"
                    v-on="inputEvents"
                    :disabled="isDisable"
                  />
                  <span
                    v-if="isCondition2"
                    class="help-block text-danger text_error"
                  >
                    {{ messageValidation2("2") }}
                  </span>
                </div>
              </b-col>
            </b-row>
          </template>
        </date-picker>
      </b-col>
      <b-col lg="6" md="6" sm="12">
        <date-picker
          v-model="formData.dateinscription"
          class="margin-right"
          :attributes="attrs"
          :model-config="modelConfig"
          @input="verifyCosto"
        >
          <template v-slot="{ inputValue, inputEvents }">
            <b-row>
              <b-col lg="12" md="12" sm="12">
                <div role="group">
                  <label class="label_input">Fecha de incripción</label>
                  <b-form-input
      
                    :value="inputValue"
                    v-on="inputEvents"
                    :disabled="isDisable"
                  />
                  <span
                    v-if="isCondition1"
                    class="help-block text-danger text_error"
                  >
                    {{ messageValidation2("1") }}
                  </span>
                </div>
              </b-col>
            </b-row>
          </template>
        </date-picker>
      </b-col>
      <b-col lg="6" md="6" sm="12" class="mb-2">
        <div role="group">
          <label for="cost" class="label_input">Costo*</label>
          <b-form-input
            id="cost"
            placeholder="0"
            v-model="formData.cost"
            disabled
          />
        </div>
      </b-col>
    </b-row>
    <b-row v-if="!isDisable">
      <b-col cols="12" class="d-flex justify-content-end mt-2">
        <b-button
          type="submit"
          class="btn btn-success"
          :disabled="isBusy || $v.$invalid || isCondition1 || isCondition2 || isCondition3"
        >
          <b-spinner v-if="isBusy" small />
          Guardar
        </b-button>
      </b-col>
    </b-row>
  </b-form>
</template>

<script>
import {
  BCol,
  BRow,
  BButton,
  BForm,
  BSpinner,
  BFormInput,
} from "bootstrap-vue";
import { required, between, } from "vuelidate/lib/validators";
import ActionCRUD from "@/mixins/ActionCRUD";
import DatePicker from "v-calendar/lib/components/date-picker.umd";
import moment from "moment";
moment.locale("es");

export default {
  inject: ["userRepository"],
  components: {
    BCol,
    BRow,
    BButton,
    BForm,
    BFormInput,
    BSpinner,
    DatePicker,
  },
  mixins: [ActionCRUD],
  props: {
    record: {
      type: Object,
      default: null,
    },
    isDisable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      profiles: [],
      isBusy: false,
      formData: {
        fullname: null,
        age: null,
        dateofbirth: null,
        dateinscription: null,
        cost: null,
      },
      repository: "userRepository",
      modelConfig: {
        type: "string",
        mask: "YYYY-MM-DD",
      },
      attrs: [
        {
          highlight: "orange",
          dates: new Date(),
        },
      ],
      isCondition1: false,
      isCondition2: false,
      isCondition3: false,
    };
  },
  validations: {
    formData: {
      fullname: {
        required,
      },
      age: {
        required,
        between: between(18, 100),
      },
      dateofbirth: {
        required,
      },
      dateinscription: {
        required,
      },
      cost: {
        required,
      },
    },
  },
  methods: {
    verifyAge() {
      const me = this;
      if (me.formData.age && me.formData.dateofbirth ) {
        const dateofbirth = (moment().subtract(moment().format("YYYY-MM-DD"), 'year'), moment().subtract(me.formData.age, 'year')).format("YYYY-MM-DD");
        if (me.formData.dateofbirth !== dateofbirth) {
          me.isCondition2 = true;
        } else {
          me.isCondition2 = false;
        }
      }
      me.verifyDates();
    },
    verifyCosto() {
      const me = this;
      const numDays = moment().diff(me.formData.dateinscription, 'year');
      me.formData.cost = me.format(numDays * 100);
      me.verifyDates();
    },
    format(price) {
      const formatter = new Intl.NumberFormat("es-CO", {
        minimumFractionDigits: 0,
      });

      return formatter.format(price);
    },
    verifyDates() {
      const me = this;
      if (me.formData.dateofbirth && me.formData.dateinscription) {
        if (me.formData.dateinscription <= me.formData.dateofbirth) {
          me.isCondition1 = true;
        } else {
          me.isCondition1 = false;
        }
      }
    },
    validateFullname() {
      const me = this;
      const name = me.formData.fullname.split(" ")[0];
      const lastname = me.formData.fullname.split(" ")[1];

      if(name.length < 4 || lastname && lastname.length < 4) {
        me.isCondition3 = true;
      }else if (!lastname) {
        me.isCondition3 = true;
      } else {
        me.isCondition3 = false;
      }
    },
    messageValidation2(type) {
      let text = null;
      if (type == "1") {
        text = "La fecha de inscripción debe ser mayor a la fecha de nacimiento";
      } else if (type == "2") {
        text = "La fecha de nacimiento no coincide con la edad digitada";
      } else if (type == "3") {
        text = "Debe ingresar al menos un nombre & un apellido y deben tener al menos 4 caracteres";
      }

      return text;
    },
  },
  async mounted() {
    const me = this;
    me.formData = { ...me.formData, ...me.record };
  },
};
</script>

<style></style>
