import React from "react";
import { urlsTR, urlsEN } from "./utils/urls";

const Homepage = React.lazy(() => import("./components/pages/HomePage"));
const Projects = React.lazy(() =>
  import("./components/pages/Projects")
);
const Contact = React.lazy(() =>
  import("./components/pages/Contact")
);
const NotFound = React.lazy(() =>
  import("./components/pages/NotFound")
);

export interface IRouteConfig {
  url: string;
  component: any;
  key: string;
}

// Both languages are registered side by side so switching language is a
// client-side navigation to an already-known route, not a reload.
export const routes: IRouteConfig[] = [
  { key: "homepage", url: urlsTR.Homepage, component: Homepage },
  { key: "tr-projects", url: urlsTR.Projects, component: Projects },
  { key: "en-projects", url: urlsEN.Projects, component: Projects },
  { key: "tr-contact", url: urlsTR.Contact, component: Contact },
  { key: "en-contact", url: urlsEN.Contact, component: Contact },
  { key: "not-found", url: "*", component: NotFound },
];
