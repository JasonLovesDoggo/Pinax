import { createSignal, onMount } from "solid-js";
import { A } from "@common/base";
import { settings } from "../../config";

const WakaTime = () => {
  const [count, setCount] = createSignal("loading...");
  onMount(async () => {
    const response = await fetch(
      `https://wakatime.com/share/@${settings.wakatime.username}/${settings.wakatime.export_id}.json`,
    );
    const data = await response.json();
    setCount(
      data.data.grand_total.human_readable_total_including_other_language,
    );
  });

  return (
    <div>
      <A href={`https://wakatime.com/@${settings.wakatime.username}`}>
        <p>
          Tracked time coding: <b>{count()}</b>
        </p>
      </A>
    </div>
  );
};
export default WakaTime;
