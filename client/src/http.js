import { converMillsecond } from './utils';
import {
   cancleUpload,
   uploadComplete,
   progessBar,
   showError,
   onCancleButtonClick,
   uploadCounter,
} from './views';

class HTTPUpload {
   constructor(file, url = '/upload') {
      this._url = url;
      this.file = file;
      this._now = Date.now();
   }

   static httpUpload = (file, url) => {
      return new HTTPUpload(file, url).http();
   };

   http = () => {
      if (this.file.uploaded) return;

      const formData = new FormData();
      formData.append('file', this.file);

      this.http = new XMLHttpRequest();
      this.http.open('POST', this._url);
      this.http.onloadstart = this._handleLoadStart;
      this.http.upload.onprogress = this._handleOnProgress;
      this.http.onload = this._handleOnLoad;
      this.http.onerror = this._handleError;
      this.http.onabort = this._handleAbort;
      this.http.send(formData);
   };
   _handleLoadStart = () => {
      this.file.uploading = true;
      const abort = () => this.http.abort();
      onCancleButtonClick(this.file.name, abort);
   };

   _handleOnProgress = (e) => {
      const { name } = this.file;
      const yetToUpload = e.total - e.loaded;
      const timeTaken = Date.now() - this._now;
      const willTaken = (yetToUpload / e.loaded) * timeTaken;

      const uploaded = Math.round((e.loaded * 100) / e.total);

      progessBar(name, uploaded);

      uploadCounter(name, converMillsecond(willTaken));
   };

   _handleAbort = () => {
      cancleUpload(this.file.name);
   };

   _handleOnLoad = () => {
      if (this.http.status === 200) {
         uploadComplete(this.file.name);
         this.file.uploaded = true;
         this.file.uploading = false;
      } else this.http.onerror('some things went wrong');
   };

   _handleError = () => {
      showError('something went wrong');
   };
}

export default HTTPUpload.httpUpload;
