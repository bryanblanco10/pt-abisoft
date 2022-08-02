export default {
  data() {
    return {}
  },
  mounted() {},
  methods: {
    async handleLoadData() {
      const me = this;

      try {
        if (Object.prototype.hasOwnProperty.call(me, 'isBusy')) {
          me.isBusy = true;
        }
        
        const result = await me[me.repository].getAll(me.enterpriseUuid);
        me.records = result.data;
      } catch (error) {
        console.log(error)
      } finally {
        if (Object.prototype.hasOwnProperty.call(me, 'isBusy')) {
          me.isBusy = false;
        }
      }
    },

    async saveData() {
      const me = this;
      try {
        let formData = null;
        if (Object.prototype.hasOwnProperty.call(me, 'isBusy')) {
          me.isBusy = true;
        }

        formData = { ...me.formData }

        const uuid = formData.uuid ? formData.uuid : null
        const option = uuid ? 'update' : 'save'

        await me[me.repository][option](uuid, formData)
        me.$emit('save')
      } catch (error) {
        console.log(error);
      } finally {
        if (Object.prototype.hasOwnProperty.call(me, 'isBusy')) {
          me.isBusy = false;
        }
      }
    },

    async save() {
      const me = this
      me.$bvToast.toast('Registro guardado con exito', {
        title: 'Registro guardado',
        variant: 'success',
        solid: true,
        autoHideDelay: 5000,
      })
      me.$bvModal.hide(me.id);
      await me.handleLoadData()
    },

    async del(uuid) {
      const me = this
      me.$bvModal.msgBoxConfirm('¿Seguro que deseas eliminar este registro?', {
        title: 'Confirmar eliminación',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'Si',
        cancelTitle: 'No',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      })
        .then(async (value) => {
          if (value) {
            try {
              await me[me.repository].delete(uuid)

              me.$bvToast.toast('Registro eliminado con exito', {
                title: 'Registro eliminado',
                variant: 'success',
                solid: true,
                autoHideDelay: 5000,
              })
              await me.handleLoadData();
            } catch (error) {
              console.log(error);
            }
            
          }
        })
    },

    messageValidation(error) {
      let text = null;

      // if (!error.required) {
      //   text = "Campo requerido";
      // }  
      if (error.email == false) {
        text = "Ingrese una dirección de correo válida.";
      } else if (error.numeric == false) {
        text = "Ingrese solo números."
      } else if (error.minLength == false) {
        text = `El campo debe tener mínimo ${error.$params.minLength.min} dígitos.`
      } else if (error.maxLength == false) {
        text = `El campo debe tener máximo ${error.$params.maxLength.max} dígitos.`
      } else if (error.between == false) {
        text = `La edad debe ser de ${error.$params.between.min} años en adelante.`
      }

      return text;
    }
  }
}