const overflow = document.body.style.overflow;
const paddingRight = document.body.style.paddingRight;
const scrollbarWidth = window.innerWidth - document.body.clientWidth + "px";

export const bodyScroll = (() => {
  return {
    lock() {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = scrollbarWidth;
    },
    unlock() {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    },
  };
})();
