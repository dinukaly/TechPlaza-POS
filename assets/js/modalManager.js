  let modalInstance = null;

  const getModal = () => {
    if (!modalInstance) {
      const modalElement = document.getElementById("modal");
      if (!modalElement) {
        return null;
      }
      modalInstance = new bootstrap.Modal(modalElement);
    }
    return modalInstance;
  };

  function openModal(title, formHTML, onSave) {
    $("#modalTitle").text(title);
    $("#modalForm").html(formHTML);
    $("#btnSave").off().on("click", onSave);

    const modal = getModal();
    if (modal) {
      modal.show();
    }
  }

  //close modal
  function closeModal() {
    const modal = getModal();
    if (modal) {
      modal.hide();
    }
  }

      export { openModal, closeModal };
