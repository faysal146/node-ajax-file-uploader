import image from '../icons/image-icon.svg';
import pdf from '../icons/pdf-icon.svg';
import video from '../icons/video-icon.svg';
import text from '../icons/text-icon.svg';
import cancle from '../icons/cancle-icon.svg';
import complete from '../icons/complete-icon.svg';

const icons = {
   image,
   pdf,
   video,
   text,
   cancle,
   complete,
};

export function uploadFileItem({ name, type }, bindCancle) {
   return `
        <div class="uploader__file-item" data-name="${name.trim()}">
            <div class="file-info">
                <div class="file-icon">
                <img src="${icons[type]}" alt="video icon" />
                </div>
                <div class="file-name">${
                   name.length > 20 ? name.substr(0, 18) + '...' : name
                }</div>
            </div>
            <div class="uploader__file--progress">
                <div class="progess-bar">
                <div class="bar"></div>
                </div>
                <div class="progess-status">
                <span class="time-left">
                    0 min 0 sec
                </span>
                <span class="uploaded">
                  0%
                </span>
                </div>
            </div>
            <div class="uploader__file--control">
                <button class="cancle-button">
                  <img src="${icons.cancle}" alt="" srcset="" />
                </button>
            </div>
        </div>
    `;
}

export function fillItemErrorAlert({ name, type }) {
   return `
      <div class="alert" data-name="${name.trim()}">
         <div class="file-icon">
            <img src="${icons[type]}" alt="video icon" />
         </div>
         <div class="file-name">
            ${name.length > 10 ? `${name.substr(0, 10)}..` : name}
         </div>
         <button class="cancle-button">
            <img src="${icons.cancle}" alt="" srcset="" />
         </button>
      </div>
   `;
}

export function progessBar(fileName, percent) {
   document.querySelector(
      `[data-name="${fileName}"] .bar`
   ).style.width = `${percent}%`;
   document.querySelector(
      `[data-name="${fileName}"] .uploaded`
   ).innerHTML = `${percent}%`;
}

export function uploadCounter(fileName, time) {
   document.querySelector(
      `[data-name="${fileName}"] .time-left`
   ).innerHTML = `${time}`;
}

export function onCancleButtonClick(fileName, callBack) {
   const cancleBtn = document.querySelector(
      `[data-name="${fileName}"] .cancle-button`
   );

   const eventHnd = cancleBtn.addEventListener('click', () => {
      cancleBtn.removeEventListener('click', eventHnd);
      callBack();
   });
}

export function uploadComplete(fileName) {
   document.querySelector(
      `[data-name="${fileName}"] .uploader__file--control`
   ).innerHTML = `
             <div class="complete">
                <img src='${icons.complete}' alt='' srcset='' />
             </div>
          `;
}

export function showError(message) {
   const serverAlert = document.querySelector('.server-error-alert');
   serverAlert.classList.add('show-alert');
   serverAlert.innerHTML = message;
   setTimeout(() => {
      serverAlert.innerHTML = '';
      serverAlert.classList.remove('show-alert');
   }, 4000);
}
export function cancleUpload(fileName) {
   const el = document.querySelector(`[data-name="${fileName}"]`);
   el.classList.add('remove-file');
   setTimeout(() => el.remove(), 500);
}

export function duplicatFileAlert({ name, type }) {
   return `
      <div class="alert" data-name="${name.trim()}">
         <div class="file-icon">
            <img src="${icons[type]}" alt="video icon" />
         </div>
         <div class="file-name">
            ${name.length > 10 ? `${name.substr(0, 10)}..` : name}
         </div>
         <button class="cancle-button">
            <img src="${icons['cancle']}" alt="" srcset="" />
         </button>
      </div>
   `;
}

export function removeDuplicatFileAlert(name) {
   document.querySelectorAll('.alert').forEach((el) => {
      if (name) name === el.dataset.name && el.remove();
      const event = el.addEventListener('click', (e) => {
         el.removeEventListener('click', event);
         el.classList.add('remove-file');
         setTimeout(() => el.remove(), 300);
      });
   });
}
