import React from 'react';
import styles from './Model.module.css'
import Aux from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

const model = (props) => (
  <Aux>
    <Backdrop show={props.show} clicked={props.modelClosed}/>
    <div className={styles.Modal}
          style={{
            transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: props.show ? '1' : '0'
          }} >
        {props.children}
    </div>
  </Aux>
);

export default model;