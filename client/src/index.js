import Uploader from './app';

const fileItemContainer = document.querySelector('.uploader__file');
const alertContainer = document.querySelector('.alert-container');
const fileUploadInput = document.querySelector('#file-input');
const fileUploadArea = document.querySelector('#file-upload');

const uploader = new Uploader(fileItemContainer, alertContainer);

// take files by input
fileUploadInput.addEventListener('input', (e) => {
   uploader.onFileInput(e.target.files);
});

// take files by darg and drop
fileUploadArea.addEventListener('drop', (e) => {
   uploader.onFileInput(e.dataTransfer.files);
});

const dragStart = ['dragenter', 'dragover'];
const dragEnd = ['dragleave', 'drop'];

[...dragEnd, ...dragStart].forEach((eventName) => {
   fileUploadArea.addEventListener(eventName, (evt) => {
      evt.preventDefault();
      evt.stopPropagation();
   });
});

dragEnd.forEach((eventName) => {
   fileUploadArea.addEventListener(
      eventName,
      () => {
         if (fileUploadArea.classList.contains('highlight')) {
            fileUploadArea.classList.remove('highlight');
         }
      },
      false
   );
});

dragStart.forEach((eventName) => {
   fileUploadArea.addEventListener(
      eventName,
      () => {
         if (!fileUploadArea.classList.contains('highlight')) {
            fileUploadArea.classList.add('highlight');
         }
      },
      false
   );
});
