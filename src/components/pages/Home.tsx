import { Button } from "@suid/material";
import { useContext } from "solid-js";
import { OpenContext } from "../../Layout";
import {
  LanguageElementProps,
  LanguageWidget,
} from "@components/widgets/CommitInfo/Bar";

const languages: LanguageElementProps[] = [
  // Go, Python, HTML, CSS, JavaScript

  { name: "Go", color: "00ADD8", percentage: 30 },
  { name: "Python", color: "3572A5", percentage: 20 },
  { name: "HTML", color: "E34C26", percentage: 25 },
  { name: "CSS", color: "563D7C", percentage: 15 },
  { name: "JavaScript", color: "F1E05A", percentage: 10 },
];

const Home = () => {
  const { themerOpen, openThemer } = useContext(OpenContext);
  return (
    <div>
      <h1>Home</h1>
      <LanguageWidget languages={languages} />
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          openThemer(!themerOpen());
        }}
      >
        Primary
      </Button>
    </div>
  );
};

export default Home;

/*dist/index.html.br                  0.23 kB
dist/index.html.gz                  0.35 kB
dist/index.html                     0.54 kB │ gzip:  0.35 kB
dist/assets/index-BOxNzpca.js.br   54.16 kB
dist/assets/index-BOxNzpca.js.gz   62.05 kB
dist/assets/index-BOxNzpca.js     191.45 kB │ gzip: 62.11 kB
*/

/*
* dist/index.html.br                  0.23 kB
dist/index.html.gz                  0.35 kB
dist/index.html                     0.54 kB │ gzip:  0.35 kB
dist/assets/index-BOxNzpca.js.br   54.16 kB
dist/assets/index-BOxNzpca.js.gz   62.05 kB
dist/assets/index-BOxNzpca.js     191.45 kB │ gzip: 62.11 kB
✓ built in 1.43s
*/
