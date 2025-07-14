const overflow = document.body.style.overflow;
const paddingRight = document.body.style.paddingRight;
const scrollbarWidth = window.innerWidth - document.body.clientWidth + "px";

export function lockBodyScroll() {
  document.body.style.overflow = "hidden";
  document.body.style.paddingRight = scrollbarWidth;
  return () => {
    document.body.style.overflow = overflow;
    document.body.style.paddingRight = paddingRight;
  };
}
