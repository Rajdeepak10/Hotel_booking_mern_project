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
import MyHotels from "./pages/MyHotels";
import EditHotel from './pages/EditHotel'
import Search from './pages/Search'
import Details from "./pages/DetailsPage"
function App() {
  const {isLoggedIn}=useAppContext()
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><p>Home Page</p></Layout>}>
        </Route>
        <Route path="/register" element={
          <Layout><Register></Register></Layout>
        }></Route>
        <Route path="/sign-in" element={
          <Layout><SignIn></SignIn></Layout>
        }></Route>
        <Route path="/search" element={
          <Layout><Search></Search></Layout>
        }></Route>
        <Route path="/detail/:hotelId" element={
          <Layout> <Details/>  </Layout>
        }></Route>



        {isLoggedIn &&<>
          <Route path="/add-hotel" element={
          <Layout><AddHotel></AddHotel></Layout>
        }></Route>
        <Route path="/my-hotels" element={
          <Layout><MyHotels></MyHotels></Layout>
        }></Route>
        <Route path="/edit-hotel/:hotelId" element={
          <Layout><EditHotel></EditHotel></Layout>
        }></Route>
        </>}


      </Routes>
      
    </Router>
  )
}

export default App
