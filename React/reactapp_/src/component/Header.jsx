import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <div className="header">
            {/* <h2>Header</h2> */}
            {/* a태그의 href 대신 Link태그의 to 사용 */}
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/comp1">MyComp1</Link>
                </li>
                <li>
                    <Link to="/comp2">MyComp2</Link>
                </li>
            </ul>
        </div>
    );
}
