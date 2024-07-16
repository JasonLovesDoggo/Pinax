/* @refresh reload */
import {render} from "solid-js/web";
import {Route, Router} from "@solidjs/router";
import NotFound from "@components/pages/Errors";
import Home from "@components/pages/Home";
import Layout from "./Layout";

render(
  () => (
    // @ts-ignore
    <Router root={Layout}>
      <Route path="/" component={Home} />
      <Route path="/hello-world" component={() => <h1>Hello World!</h1>} />
      <Route path="*404" component={NotFound} />
    </Router>
  ),
  document.getElementById("app")!,
);
