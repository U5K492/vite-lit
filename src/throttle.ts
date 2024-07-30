export function throttle(func: Function, wait: number) {
  let inThrottle: boolean
  let lastFunc: ReturnType<typeof setTimeout>
  let lastTime: number

  return function (this: any) {
    const args = arguments
    if (!inThrottle) {
      func.apply(this, args)
      lastTime = Date.now()
      inThrottle = true
    } else {
      clearTimeout(lastFunc)
      lastFunc = setTimeout(() => {
        if (Date.now() - lastTime >= wait) {
          func.apply(this, args)
          lastTime = Date.now()
        }
      }, Math.max(wait - (Date.now() - lastTime), 0))
    }
  }
}
