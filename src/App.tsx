import {createSignal, onMount} from 'solid-js'
import solidLogo from './assets/solid.svg'
import viteLogo from '/vite.svg'
import './App.css'
// @ts-ignore
import CountUp from "./components/CountUp";

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
        <span>Count is {<CountUp end={count()} start={0} duration={20}/>}</span>
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
