import React from 'react'

export default function Nav({loading,user,register,login,logout}) {

    function loggedInNav() {
        return (
            <>
            <button className="btn btn--primary btn__upgrade">
                <div className="flex justify-center align-center">
                    <span>Job Guarantee</span>
                </div>
            </button>
            <span>
                <span />
                <div className="el-popover__reference-wrapper">
                    <button className="nav__icon el-popover__reference" onClick={logout}>
                        <span>E</span>
                    </button>
                </div>
            </span>
            </>
        )
    }

    function loggedOutNav() {
        return (
            <>
            <span className="nav__link--home nav__link--home-mobile" onClick={login}>Login</span>
            <button type="primary" className="btn btn--primary nav__btn nav__link--home-mobile" onClick={register}>Register</button>
            </>
        )
    }

    function loadingNav() {
        return (
            <>
            <div className="btn btn__upgrade--skeleton skeleton"></div>
            <div className="nav__icon skeleton"></div>
            </>
        )
    }

  return (
    <nav className="dashboard__nav">
      <div className="dashboard__nav--content">
        <div className="flex align-center">
            <figure className="logo">
                <a href="" className="next-link-active">
                    <img src="https://frontendsimplified.com/_nuxt/img/Frontend%20Simplified%20Logo.853fbda.png" alt="" className="logo__img"></img>
                </a>
            </figure>
        </div>
        <div className="nav__links">
            {loading ? (
                loadingNav()
            ) : user ? (
                loggedInNav()
            ) : (
                loggedOutNav()
            )}
        </div>
      </div>
    </nav>
  )
}
