export function vaildType(type) {
   switch (true) {
      case /^image.+/g.test(type):
         return 'image';
      case type === 'application/pdf':
         return 'pdf';
      case type === 'video/mp4':
         return 'video';
      case type === 'application/x-zip-compressed':
         return 'zip';
      default:
         return 'text';
   }
}

export function converMillsecond(millsecond) {
   const minutes = Math.floor(millsecond / 60000);
   const seconds = ((millsecond % 60000) / 1000).toFixed(0);
   return `${minutes} min ${seconds < 10 ? '0' : ''}${seconds} sec`;
}
