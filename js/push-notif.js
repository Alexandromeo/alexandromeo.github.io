// Register service worker
const registerServiceWorker = () => {
  return navigator.serviceWorker.register('../sw.js')
  .then(function (registration) {
    console.log('Registrasi service worker sukses.');
      return registration;
    })
    .catch(function (err) {
      console.error('Registrasi service worker gagal.', err);
    });
}

const requestPermission = () => {
  if ('Notification' in window) 
  {
    Notification.requestPermission().then((result) => {
      if (result === "denied") {
        console.log("Fitur notifikasi tidak diijinkan.");
        return;
      } else if (result === "default") {
        console.error("Pengguna menutup kotak dialog permintaan ijin.");
        return;
      }
      
      navigator.serviceWorker.getRegistration().then((reg) => {
        reg.showNotification('Notifikasi diijinkan!');
      });
    });
  }
}

if (!('serviceWorker' in navigator)) 
{
  console.log("Service worker tidak didukung browser ini.");
} 

else 
{
  registerServiceWorker();
  requestPermission();
}
