// 1. Переделайте getRequest() так, чтобы она использовала промисы.

// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//
//     xhr.open('GET', url, true);
//
//     xhr.onreadystatechange = () => {
//         if(xhr.readyState === 4){
//             if(xhr.status !== 200){
//                 console.log('error')
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     }
//     xhr.send()
// };

// Решение:

let getRequest = url => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);

    xhr.onreadystatechange = () => {
      if(xhr.readyState === 4){
        if(xhr.status !== 200){
          reject('error');
        } else {
          resolve(xhr.responseText);
        }
      }
    };
    xhr.send()
  });
};
