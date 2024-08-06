import styles from "../cssModule/modal.module.css"

export default function Modal2({message, onClose, onCheck}) {
    return (
        // <div id="modal" class="modal">
        //     <div class="modal-content">
        //         <p>{message}</p>
        //         <button className="modal-button" onClick={onClose}>확인</button>
        //     </div>
        // </div>

        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div>{message}</div>
            <div className={styles.btnWrapper}>
              <button className={styles.modalButton} onClick={onCheck?onCheck:onClose}>예</button>
              <button className={styles.modalButton} onClick={onClose}>아니오</button>
            </div>
          </div>
        </div>
      );
}