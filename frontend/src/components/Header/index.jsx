import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import styles from './Header.module.scss';
import {checkRToken} from "../../redux/slices/userSlice";

export const Header = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [isMobileNavOpen, setIsMobileNavOpen] = React.useState(false);
    const handleMobileNavToggle = () => setIsMobileNavOpen(!isMobileNavOpen);

    useEffect(() => {
        if (user.isLogin) {
            dispatch(checkRToken());
        }
    }, []);

    return (
        <header className={`d-flex align-items-center`}>
            <div className="container d-flex align-items-center justify-content-between">
                <div className={`${styles.logo}`}>
                    <h1><Link to={"/"}><span>TO-DO list</span></Link></h1>
                </div>
                <nav className={`${styles.navbar} ${isMobileNavOpen ? styles.navbarMobile : ''}`}>
                    <ul>
                        <li><Link to={"/"} className={`nav-link ${styles.active}`}>Home</Link></li>
                        <li>
                            <div className={`input-group rounded ${styles.navbarSearch}`}>
                                <input type="search" id="search" className="form-control" placeholder="Search"
                                       aria-label="Search" aria-describedby="search-addon"/>
                            </div>
                        </li>
                        {user.isLogin ?
                            <li><Link to={"/"}>{user.email}</Link></li>
                            :
                            <>
                                <li><Link to={"/login"}>Login</Link></li>
                                <li><Link to={"/register"}>Register</Link></li>
                            </>
                        }
                    </ul>
                    <i className={`bi ${!isMobileNavOpen ? 'bi-list' : 'bi-x'} ${styles.navbarMobileToggle}`}
                       onClick={handleMobileNavToggle}
                       style={{color: isMobileNavOpen ? 'white' : 'black'}}></i>
                </nav>
            </div>
        </header>
    )
}