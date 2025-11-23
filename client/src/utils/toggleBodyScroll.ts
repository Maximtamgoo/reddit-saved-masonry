const overflow = document.body.style.overflow;
const paddingRight = document.body.style.paddingRight;
const scrollbarWidth = window.innerWidth - document.body.clientWidth + "px";

export const bodyScroll = (() => {
  let locked = false;

  function lock() {
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = scrollbarWidth;
    locked = true;
  }

  function unlock() {
    document.body.style.overflow = overflow;
    document.body.style.paddingRight = paddingRight;
    locked = false;
  }

  function toggle() {
    if (locked) {
      unlock();
    } else {
      lock();
    }
  }

  return {
    lock,
    unlock,
    toggle,
  };
})();
