import {Link} from "react-router"
const Navbar = () => {
  return (
   <nav className="navbar">
    
    <Link to="/">
        <p className="text-2xl font-bold text-gradient">RESUMIND</p>
    </Link>

    <div className="flex w-full justify-between gap-4 md:w-auto md:justify-end">
        <Link to="/upload" className="primary-button flex-1 text-center py-2 text-sm md:flex-none md:px-6">
            Upload
        </Link>
        <Link to="/auth" className="primary-button flex-1 text-center py-2 text-sm md:flex-none md:px-6">
            Account
        </Link>
    </div>
</nav>
  )
}

export default Navbar