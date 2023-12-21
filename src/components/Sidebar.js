import { Link } from "react-router-dom";
import './css/Sidebar.css'


function Sidebar(){
    return(
        <>
            <ul className="list-unstyled">
                <li>
                    <Link to="products">get all products</Link>
                </li>
                <li>
                    <Link to="categoriesTable">get all categories</Link>
                </li>
            </ul>
        </>
    )
}

export default Sidebar;