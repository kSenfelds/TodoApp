import {Link, NavLink} from "react-router-dom";
import "../Styles/Components/NavBar.scss";
import { NAV_LINKS } from "../constants/nav-links";

export const NavBar = () => {
    return (
        <nav className="nav-bar">
            <ul >
                {NAV_LINKS.map ((link) => (
                    <li key={link.path}>
                        <NavLink to ={link.path}>{link.title}</NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    )
}