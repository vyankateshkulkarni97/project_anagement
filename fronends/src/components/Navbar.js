import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../style/Navbarleft.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faList, faPlus , faSignOutAlt  } from '@fortawesome/free-solid-svg-icons';


const Navbarleft = () => {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/')
    }
    return (

        <div className="left-nav">
            <ul className="Nav-ul">
                <li><Link to="/Home"><FontAwesomeIcon icon={faHome} /> </Link></li>
                <li><Link to="/allproject"><FontAwesomeIcon icon={faList} /> </Link></li>
                <li><Link to="/createproject"><FontAwesomeIcon icon={faPlus} /></Link></li>
                <li><Link onClick={logout} to="/"><FontAwesomeIcon icon={faSignOutAlt} /></Link></li>
            </ul>
        </div>
    )
}

export default Navbarleft