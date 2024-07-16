import "./App.css";
import ViewCount from "@components/ViewCount";
import CommitInfo from "@components/CommitInfo";
import WakaTime from "@components/WakaTime";

function App() {
  return (
    <>
      <div>
        <h1>Portfolio</h1>
        <p>My personal portfolio website</p>
        <WakaTime />
        <ViewCount duration={1.1} />
        <CommitInfo />
      </div>
    </>
  );
}

export default App;
