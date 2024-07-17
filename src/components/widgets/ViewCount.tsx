import { createSignal, onMount } from "solid-js";
import CountUp from "@components/utils/CountUp";
import { A } from "@common/base";
import { settings } from "../../config";

type ViewCountProps = {
  duration: number;
};

const ViewCount = (props: ViewCountProps) => {
  const [count, setCount] = createSignal(100000);
  onMount(async () => {
    const response = await fetch(
      `https://abacus.jasoncameron.dev/hit/${settings.abacus_path}`,
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
