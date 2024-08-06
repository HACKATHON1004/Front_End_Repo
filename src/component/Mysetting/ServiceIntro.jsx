import React, { useState, useRef, useEffect } from 'react';
import styles from '../../cssModule/Serviceintro.module.css'
import Back from '../Button/Back';

function ServiceIntro(){

    return(
        <div className={styles.container}>
              <div className={styles.BackButton}>
                <Back/>
            </div>
            <div className={styles.Form}>
                <div className={styles.ServiceIntroWapper}>
                    <div className={styles.ServiceIntroduction}>서비스 소개</div>
                </div>
                <div className={styles.SourcesWapper}>
                    <div className={styles.Sources}>출처</div>
                </div>
            </div>
            
        </div>
    );
};
export default ServiceIntro