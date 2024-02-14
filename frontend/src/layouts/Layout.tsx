import Footer from "../components/Footer"
import Header from "../components/Header"
import Hero from "../components/Hero"
// in typesscript it is used to defines an interface names as Props which specifies that a component expects certains props.
// this props expect a value of type React.reactNode that represent ant valid react node including jsx element strings numbers arrat
interface Props{
    children: React.ReactNode
}
// used to render child element within a component
const Layout = ({children}:Props) => {
  return (
    <div className="flex flex-col min-h-screen">
        <Header/>
        <Hero/>
        <div className="container mx-auto py-10 flex-1">
            {
                children
            }
        </div>
        <Footer/>
    </div>
  )
}

export default Layout