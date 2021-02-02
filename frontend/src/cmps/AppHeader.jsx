import { useState } from 'react'
import { Link } from 'react-router-dom'

export function AppHeader() {

    const [navbar, setNavbar] = useState(false)
    const changeBackground = () =>
        window.scrollY >= 75 ? setNavbar(true) : setNavbar(false)
    window.addEventListener('scroll', changeBackground)

    return <header className={navbar ? "app-header active" : "app-header"}>
        <section className="main-layout flex j-between a-center">
            <div className="logo"><Link to="/">Mr. Tasker</Link></div>
            <nav>
                <Link to="/">Link 1</Link>
                <Link to="/">Link 2</Link>
                <Link to="/">Link 3</Link>
            </nav>
        </section>
    </header>
}