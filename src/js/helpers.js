import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

function hover() { 
  function is_touch_enabled() { 

      // Check if touch is enabled 
      return "ontouchstart" 
          in window || navigator.maxTouchPoints > 0 
          || navigator.msMaxTouchPoints > 0; 
  } 
  if (!is_touch_enabled()) { 

      // If touch is not enabled, add "btn2" class 
      var b = document.getElementById("btn"); 
      b.classList.add("btn2"); 
  } 
} 
