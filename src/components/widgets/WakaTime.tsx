import { createSignal, onMount } from "solid-js";
import { A } from "@common/base";

const WakaTime = () => {
  const [count, setCount] = createSignal("loading...");
  onMount(async () => {
    const response = await fetch(
      "https://wakatime.com/share/@JasonLovesDoggo/f2e375a2-7920-488d-b43b-3f8c7da12ccf.json",
    );
    const data = await response.json();
    setCount(
      data.data.grand_total.human_readable_total_including_other_language,
    );
  });

  return (
    <div>
      <A href="https://wakatime.com/@JasonLovesDoggo">
        <p>
          Tracked time coding: <b>{count()}</b>
        </p>
      </A>
    </div>
  );
};
export default WakaTime;
