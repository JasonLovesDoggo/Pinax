import './App.css'
import ViewCount from "@components/ViewCount";
import CommitInfo from "@components/CommitInfo";

function App() {

  return (
    <>
      <div>
        <h1>Portfolio</h1>
        <CommitInfo/>
          <ViewCount duration={1.1}/>
      </div>
    </>
  )
}

export default App
