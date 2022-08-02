
const actionLayout = {
  methods: {
    btnBars(e){
      e.preventDefault();
      let menu = document.querySelector('.sideBar');
      menu.classList.add("active");
    },

    btnClosed(e){
      e.preventDefault();
      let cerrar = document.querySelector('.sideBar');
      cerrar.classList.remove('active');
    },
  }
};

export {
  actionLayout
};