  //open modal when add button click
      const modal = new bootstrap.Modal(document.getElementById('modal'));

      function openModal(title,formHTML,onSave) {
       $('#modalTitle').text(title);
       $('#modalForm').html(formHTML);
       $('#btnSave').off().on('click',onSave);
       modal.show();
      }

      //close modal
      function closeModal() {
        modal.hide();
      }

      export { openModal, closeModal };