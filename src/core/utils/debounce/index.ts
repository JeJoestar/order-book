const debounce = (fn: Function, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  const debounced = function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, ms);
  };
  debounced.cancel = () => {
    clearTimeout(timeoutId);
  };
  return debounced;
};

export default debounce;
