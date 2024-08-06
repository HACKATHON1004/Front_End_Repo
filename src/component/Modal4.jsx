import styles from "../cssModule/modal.module.css"

export default function Modal4({ message, onClose, onConfirm }) {
    return (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div>{message}</div>
            <div className={styles.btnWrapper}>
              <button 
                className={styles.modalButton} 
                onClick={() => {
                  onConfirm();
                }}
              >
                예
              </button>
              <button className={styles.modalButton} onClick={onClose}>아니오</button>
            </div>
          </div>
        </div>
      );
}