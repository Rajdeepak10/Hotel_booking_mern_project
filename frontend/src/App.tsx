import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Layout from './layouts/Layout'
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import { useAppContext } from "./contexts/AppContext";
import AddHotel from "./pages/AddHotel";

function App() {
  const {isLoggedIn}=useAppContext()
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><p>Home Page</p></Layout>}>
        </Route>
        <Route path="/search" element={<Layout><p>Search Page</p></Layout>}>
        </Route>
        <Route path="/register" element={
          <Layout><Register></Register></Layout>
        }></Route>
        <Route path="/sign-in" element={
          <Layout><SignIn></SignIn></Layout>
        }></Route>
        
        {isLoggedIn &&<Route path="/my-hotels" element={
          <Layout><AddHotel></AddHotel></Layout>
        }></Route>}
        
      </Routes>
      
    </Router>
  )
}

export default App
