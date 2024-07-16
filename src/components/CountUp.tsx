import {Component, createSignal, onCleanup, onMount} from "solid-js";

interface CountUpProps {
  start: number;
  end: number;
  duration: number; // in seconds
  easing?: (t: number, b: number, c: number, d: number) => number;
}

const CountUp: Component<CountUpProps> = (props) => {
  const [current, setCurrent] = createSignal(props.start);

  const easeOutExpo = (t: number, b: number, c: number, d: number) =>
    c * (-Math.pow(2, (-10 * t) / d) + 1) + b;

  onMount(() => {
    const startTime = performance.now();
    const step = () => {
      const timeElapsed = performance.now() - startTime;
      const progress = Math.min(timeElapsed / (props.duration * 1000), 1);

      const easingFn = props.easing || easeOutExpo;
      const easedValue = easingFn(
        progress,
        props.start,
        props.end - props.start,
        1,
      );
      setCurrent(easedValue);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  });

  onCleanup(() => {
    // This isn't strictly necessary, but good practice for potential long-running animations
    window.cancelAnimationFrame(requestAnimationFrame(() => {}));
  });

  return <span>{current().toFixed(0)}</span>; // Display as integer
};

export default CountUp;
