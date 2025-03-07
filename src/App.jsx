import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageHeader from "./pages/PageHeader";
import Dashboard from "./pages/Dashboard";

function App() {
   return (
      <Router>
         <div>
            <PageHeader />
            <Routes>
               <Route path="/" element={<Dashboard />} />
            </Routes>
         </div>
      </Router>
   );
}

export default App;
