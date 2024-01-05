import { DefaultLayoutV2 } from "@/layouts/DefaultLayoutV2";
import { NotFound } from "@/pages/404";
import HomepageV2 from "./pages/HomepageV2";
import { Route, Routes } from "react-router-dom";
import Tokenpage from "./pages/Tokenpage";
import { Portfilio } from "./pages/Portfilio";
import routerLinks from "./utils/routerLink";

function App() {
  return (
    <Routes>
      <Route element={<DefaultLayoutV2 />}>
        {/* {routes.map((routes, index) => {
          const { path, component: Component } = routes;
          return (
            <Route
              key={index}
              path={path}
              element={
                <Suspense>
                  <Component />
                </Suspense>
              }
            />
          );
        })} */}
        <Route path="/" element={<HomepageV2 />} />
        <Route
          path={`${routerLinks("Tokenpage")}/:id`}
          element={<Tokenpage />}
        />
        <Route path={routerLinks("Portfolio")} element={<Portfilio />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/access-denied" element={<>Access denied</>} />
    </Routes>
  );
}

export default App;
