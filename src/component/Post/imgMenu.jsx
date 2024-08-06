import styles from '../../cssModule/postWrite.module.css'
import { useEffect, useState, useRef } from 'react';

export default function ImgMenu({showMenu:s, menuRef2}) {
    const [showMenu, setShowMenu] = useState(s);    
    const menuRef = useRef(); //열린 메뉴 Ref
    const isFirstRun = useRef(true);

    useEffect(()=>{
        setShowMenu(!showMenu);
    }, [s]);

    useEffect(()=>{
        setShowMenu(false);
    }, [])

    function openMenu() {
        setShowMenu(!showMenu);
    }

    function handleClickOutside(e) {
        if (menuRef.current && !menuRef.current.contains(e.target)
        &&menuRef2.current && !menuRef2.current.contains(e.target)) {
            setShowMenu(false);
        }
      }
    
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    
    return (
        <>
            <div onClick={() => document.getElementById('photoUpload').click()} className={styles.menuWrapper}>
                {/* {showMenu&&
                <div ref={menuRef} className={styles.menu}>
                    <div className={styles.menuItem}>사진 보관함</div>
                    <div className={styles.menuItem}>사진 찍기</div>
                    <div className={styles.menuItem}>파일 선택</div>
                </div>} */}
            </div>
        </>
    )
}