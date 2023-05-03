export default function debounce<T extends Function>(func: T, delay = 0) {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return function (...args: any) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => func(...args), delay);
  };
}
