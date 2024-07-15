import {Component, createSignal, onCleanup, onMount} from 'solid-js'
import solidLogo from './assets/solid.svg'
import viteLogo from '/vite.svg'
import './App.css'


interface CountUpProps {
    start: number;
    end: number;
    duration: number; // in seconds
    easing?: (t: number, b: number, c: number, d: number) => number;
}

const CountUp: Component<CountUpProps> = (props) => {
    const [current, setCurrent] = createSignal(props.start);

    const easeOutExpo = (t: number, b: number, c: number, d: number) =>
        c * (-Math.pow(2, -10 * t / d) + 1) + b;

    onMount(() => {
        const startTime = performance.now();
        const step = () => {
            const timeElapsed = performance.now() - startTime;
            const progress = Math.min(timeElapsed / (props.duration * 1000), 1);

            const easingFn = props.easing || easeOutExpo;
            const easedValue = easingFn(progress, props.start, props.end - props.start, 1);
            setCurrent(easedValue);

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };

        requestAnimationFrame(step);
    });

    onCleanup(() => {
        // This isn't strictly necessary, but good practice for potential long-running animations
        window.cancelAnimationFrame(requestAnimationFrame(() => {
        }));
    });

    return <span>{current().toFixed(0)}</span>; // Display as integer
};

function App() {
  const [count, setCount] = createSignal(0)

    onMount(async () => {
        const response = await fetch('https://abacus.jasoncameron.dev/hit/jasoncameron/portfolio');
        const data = await response.json();
        setCount(data.value);

    });

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo" alt="Vite logo" />
        </a>
        <a href="https://solidjs.com" target="_blank">
          <img src={solidLogo} class="logo solid" alt="Solid logo" />
        </a>
      </div>
      <h1>Vite + Solid</h1>
      <div class="card">
        <span>Count is {<CountUp end={count()} start={0} duration={40}/>}</span>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p class="read-the-docs">
        Click on the Vite and Solid logos to learn more
      </p>
    </>
  )
}

export default App
