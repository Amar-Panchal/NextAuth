import Link from 'next/link'
import React from 'react'

function Navbar() {
    return (
        <>
        <div className="navbar d-flex justify-content-between">
            <div className="container">
            <Link className="navbar-link" href="/UserApi">Api Data</Link>
            <Link className="navbar-link" href="/">Profile</Link>
            </div>
        </div>
        </>
    )
}

export default Navbar
