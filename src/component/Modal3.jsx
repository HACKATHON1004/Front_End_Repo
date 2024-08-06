import styles from '../cssModule/modal3.module.css';
import { useEffect, useRef } from 'react';

export default function Modal3({ onModify, onDelete, onClose, showMenu, menuRef2 }) {
    const modalRef = useRef();

    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    if (!showMenu) return null;

    return (
        <div ref={modalRef} className={styles.modal}>
            <div className={styles.modalContent} ref={menuRef2}>
                <div className={styles.btnWrapper}>
                    <button className={styles.modalButton} onClick={onModify}>수정하기</button>
                </div>
                <div className={styles.btnWrapper}>
                    <button className={styles.modalButton} onClick={onDelete}>삭제하기</button>
                </div>
            </div>
        </div>
    );
}
