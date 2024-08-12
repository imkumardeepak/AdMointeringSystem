import { Route, Routes } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import AllApps from "./pages/AllApps";
import Analytics from "./pages/Analytics";
import Authentication from "./pages/Authentication";
import Build from "./pages/Build";
import Settings from "./pages/Settings";
import Stroage from "./pages/Stroage";
import AdDisplay from "./pages/AdDisplay";
import AdControlPanel from "./pages/AdControlPanel";
import Screen1 from "./pages/Screen1";

const App = () => {
  return (
    <RootLayout>
      <Routes>
        <Route path="/" element={<AllApps />} />
        <Route path="/authentication" element={<Authentication />} />
        <Route path="/stroage" element={<Stroage />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/build/:bID" element={<Build />} />
        <Route path="/analytics/:aID" element={<Analytics />} />
        <Route path="/display" element={<AdDisplay />} />
        <Route path="/adddisplay" element={<AdControlPanel />} />
        <Route path="/screen1" element={<Screen1 />} />
      </Routes>
    </RootLayout>
  );
};

export default App;
