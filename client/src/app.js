import httpUpload from './http';
import {
   uploadFileItem,
   duplicatFileAlert,
   removeDuplicatFileAlert,
} from './views';
import { vaildType } from './utils';

class Uploader {
   constructor(fileItemContainerEl, alertContainerEl) {
      this.fileItemContainerEl = fileItemContainerEl;
      this.alertContainerEl = alertContainerEl;
      this.state = {
         files: {},
         error: {},
      };
      this.onFileInput = this.onFileInput.bind(this);
   }

   fileAlreadyUploaded(filesArry) {
      if (Object.keys(this.state.files).length === 0) {
         this.state = Object.values(filesArry).reduce(
            (fileObj, file) => {
               fileObj.files[file.name] = file;
               fileObj.error = {};
               return fileObj;
            },
            { ...this.state }
         );
      } else {
         this.state = Object.values(filesArry).reduce(
            (acc, file) => {
               if (
                  file.name in this.state.files &&
                  this.state.files[file.name].size === file.size
               ) {
                  acc.error[file.name] = file;
               } else {
                  acc.files[file.name] = file;
               }
               return acc;
            },
            { ...this.state }
         );
      }
      return this;
   }

   onFileInput(files) {
      this.fileAlreadyUploaded(files)
         .renderUploadFile(this.fileItemContainerEl)
         .handleUploadFile(httpUpload)
         .renderDuplicatFileAlert(this.alertContainerEl);
   }

   handleUploadFile(http) {
      const url = 'http://localhost:2000/upload';
      Object.values(this.state.files).forEach((file) => {
         if (!file.uploaded && !file.uploading) {
            http(file, url);
         }
      });
      return this;
   }

   renderUploadFile(fileItemsEle) {
      Object.values(this.state.files).forEach((file) => {
         if (!file.rendered) {
            fileItemsEle.insertAdjacentHTML(
               'beforeend',
               uploadFileItem({
                  name: file.name,
                  type: vaildType(file.type),
               })
            );
            file.rendered = true;
         }
      });
      return this;
   }

   removeFileError(key) {
      const newError = {};
      if (!key) {
         this.state.error = {};
      }
      Object.keys(this.state.error).forEach((file) => {
         if (key !== file) {
            newError[file] = this.state.error[file];
         }
      });
      this.state.error = newError;
   }

   renderDuplicatFileAlert(alertContainerEl) {
      const errorFiles = Object.values(this.state.error);
      if (errorFiles.length < 1) return;
      errorFiles.forEach((el) => {
         alertContainerEl.insertAdjacentHTML(
            'beforeend',
            duplicatFileAlert({
               name: el.name,
               type: vaildType(el.type),
            })
         );
         setTimeout(() => {
            removeDuplicatFileAlert(el.name);
            this.removeFileError(el.name);
         }, 5000);
      });
      removeDuplicatFileAlert();
      this.removeFileError();
   }
}
export default Uploader;
