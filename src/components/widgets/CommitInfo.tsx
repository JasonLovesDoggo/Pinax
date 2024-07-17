import { createSignal, For, onMount, Suspense } from "solid-js";
import { TimeSince } from "../../utils/time";

/*
  NOTE TO ANY FUTURE REVIEWERS:
  katib is a personal project of mine that I use to track my commits.
  If you wish to use it for your own projects, you can find the source code and update the username in it to your own.
  https://github.com/JasonLovesDoggo/Katib
* */

interface MostRecentCommit {
  repo: string;
  additions: number;
  deletions: number;
  commitUrl: string;
  committedDate: Date; // In TS, use Date for timestamps
  oid: string;
  messageHeadline: string;
  messageBody: string;
  languages: Language[];
  parentCommits: ParentCommit[]; // Use consistent naming conventions
}

interface ParentCommit {
  // Interface for simpler data structures
  additions: number;
  deletions: number;
  commitUrl: string;
  committedDate: Date;
  messageHeadline: string;
}

interface Language {
  size: number;
  name: string;
  color: string;
}

function convertApiResponseToCommit(response: any): MostRecentCommit | null {
  // Type guard: Check if necessary properties exist
  if (
    !response.repo ||
    !response.additions ||
    !response.commitUrl ||
    !response.committedDate
  ) {
    console.error("Invalid API response format.");
    return null; // Or throw an error if you prefer
  }

  return {
    repo: response.repo,
    additions: response.additions,
    deletions: response.deletions,
    commitUrl: response.commitUrl,
    committedDate: new Date(response.committedDate), // Convert string to Date
    oid: response.oid,
    messageHeadline: response.messageHeadline,
    messageBody: response.messageBody,
    languages: response.languages.map((lang: any) => ({
      size: lang.size,
      name: lang.name,
      color: lang.color,
    })),
    parentCommits: response.parentCommits.map((pc: any) => ({
      additions: pc.additions,
      deletions: pc.deletions,
      commitUrl: pc.commitUrl,
      committedDate: new Date(pc.committedDate),
      messageHeadline: pc.messageHeadline,
    })),
  };
}

const CommitInfoView = (props: { data: any }) => {
  const data = convertApiResponseToCommit(props.data);
  if (!data) return null; // Handle invalid data

  return (
    <div>
      <h2>Most Recent Commit</h2>
      <p>
        Repository: <a href={data.commitUrl}>{data.repo}</a>
      </p>
      <p>Commit ID: {data.oid}</p>
      <p>Date: {TimeSince(data.committedDate)}ago</p>
      <p>Message: {data.messageHeadline}</p>
      <p>Details: {data.messageBody}</p>
      <p>Additions: {data.additions}</p>
      <p>Deletions: {data.deletions}</p>
      <h3>Languages:</h3>
      <ul>
        <For each={data.languages}>
          {(lang) => (
            <li>
              {lang.name} - {lang.size} bytes
            </li>
          )}
        </For>
      </ul>
      <h3>Parent Commits:</h3>
      <ul>
        <For each={data.parentCommits}>
          {(pc) => (
            <li>
              <a href={pc.commitUrl}>{pc.messageHeadline}</a> - {pc.additions}{" "}
              additions, {pc.deletions} deletions
            </li>
          )}
        </For>
      </ul>
    </div>
  );
};

const CommitInfo = () => {
  const [commit, setCommit] = createSignal(null);
  onMount(async () => {
    const response = await fetch(
      "https://katib.jasoncameron.dev/commits/latest",
    );
    const data = await response.json();
    // @ts-ignore
    setCommit(data);
  });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {commit() && <CommitInfoView data={commit()} />}
    </Suspense>
  );
};

export default CommitInfo;
