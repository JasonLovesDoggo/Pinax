import {createSignal, onMount} from "solid-js";
import CountUp from "@components/CountUp";
import {A} from "@common/base";

type ViewCountProps = {
  duration: number;
};

const ViewCount = (props: ViewCountProps) => {
  const [count, setCount] = createSignal(0);
  onMount(async () => {
    const response = await fetch(
      "https://abacus.jasoncameron.dev/hit/jasoncameron/portfolio",
    );
    const data = await response.json();
    setCount(data.value);
  });

  return (
    <div>
      <A href="https://abacus.jasoncameron.dev">
        <p>
          View count:{" "}
          <b>{<CountUp start={0} end={count()} duration={props.duration} />}</b>
        </p>
      </A>
    </div>
  );
};

export default ViewCount;
