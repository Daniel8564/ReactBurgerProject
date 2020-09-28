import React from 'react';
import styles from './NavigationItem.module.css';
import { NavLink } from 'react-router-dom';

const navigationItem = (props) => (
    <ul >
        <li className={styles.NavigationItem}>
            <NavLink 
                    to={props.link}
                    exact={props.exact}
            // className={props.active ? styles.active : null}
                    activeClassName={styles.active}> {props.children} 
            </NavLink>
        </li>
    </ul>
);

export default navigationItem;