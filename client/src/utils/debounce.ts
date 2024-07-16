export function debounce(fn: Function, ms: number) {
  let timerId: ReturnType<typeof setTimeout>;

  return function func(str: string) {
    clearTimeout(timerId);
    timerId = setTimeout(function(this: typeof func) { fn.apply(this, [str]) }, ms);
  };
}
