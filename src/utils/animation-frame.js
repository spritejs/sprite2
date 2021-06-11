function nowtime() {
  if(typeof performance !== 'undefined' && performance.now) {
    return performance.now();
  } if(typeof process !== 'undefined' && process.hrtime) {
    const [s, ns] = process.hrtime();
    return s * 1e3 + ns * 1e-6;
  }
  return Date.now ? Date.now() : (new Date()).getTime();
}

let requestAnimationFrame, // eslint-disable-line import/no-mutable-exports
  cancelAnimationFrame;

if(typeof global !== 'undefined' && typeof global.requestAnimationFrame === 'function') {
  requestAnimationFrame = global.requestAnimationFrame.bind(global);
  cancelAnimationFrame = global.cancelAnimationFrame.bind(global);
} else {
  requestAnimationFrame = function (fn) {
    return setTimeout(() => {
      fn(nowtime());
    }, 16);
  };
  cancelAnimationFrame = function (id) {
    return clearTimeout(id);
  };
}

export {requestAnimationFrame, cancelAnimationFrame};