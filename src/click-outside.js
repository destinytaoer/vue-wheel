export default function(el, binding, vnode) {
  if (vnode.context[binding.value]) {
    document.addEventListener('click', function fn(e) {
      let { target } = e;
      if (target === el || el.contains(target)) return;
      vnode.context[binding.value] = false;
      document.removeEventListener('click', fn);
    });
  }
}
