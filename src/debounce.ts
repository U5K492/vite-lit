export function debounce<T extends Function>(
  func: T,
  ms: number
): (...args: any[]) => void {
  let timeoutId: ReturnType<typeof setTimeout>

  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      func.apply(this, args)
    }, ms)
  }
}
