import axios from 'axios';  
import { useState } from 'react'
import styles from '../../cssModule/mys.module.css';
import { useNavigate } from 'react-router-dom'; 
import Modal4 from '../Modal4';
import Back from '../Button/Back';
import Cookies from 'js-cookie'; 
import Modal from '../Modal';


function App(){
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const isCoach = Cookies.get("isCoach");
    console.log(isCoach);
    const navigate = useNavigate(); 
    function handleCloseModal() {
        setShowModal(false);
    }
    function handleDelete() {
        setShowModal(true);
    }
    const Delete = async () => {
        try {
          const token = Cookies.get('token');
            const response = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/user`,
              {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `${token}`,
                }
              }
            );
          } catch (error) {
            console.error("데이터 전송 중 오류 발생", error);
          }
          Cookies.remove("token");
          setShowModal(false);
          setShowModal2(true);
    }

    function handleNotice() {
        navigate('/notice');  
    }

    function handleModifyUserInfo() {
        if(isCoach==="true")
            navigate('/modifyCoachInfo');
        else{
            navigate('/modifyUserInfo'); 
        }
    }

    function handlePasswordChange() {
        navigate('/passwordChange');  
    }

    function handleServiceIntro() {
        navigate('/serviceIntro');  
    }

    function logOut() {
        navigate('/');
        Cookies.remove("token"); 
        localStorage.removeItem("token"); 
        Cookies.remove("isCoach");
    }

    return(
        <div className={styles.container}>
            <Back />
            <div className={styles.Personal}>
                <div className={styles.Personalinformation}>개인 정보</div>
                <button onClick={handleModifyUserInfo} className={styles.Imformodifying}>개인정보 수정</button>
                <button onClick={handlePasswordChange} className={styles.PWmodify}>비밀번호 변경</button>
                <button onClick={handleDelete} className={styles.Withdrawal}>회원 탈퇴</button>
            </div>
            <div className={styles.Service}>
                <div className={styles.Serviceinformation}>서비스 정보</div>
                <button  onClick={handleNotice} className={styles.Notice}>공지 사항</button>
                <button onClick={handleServiceIntro} className={styles.Serviceintroduction}>서비스 소개</button>
            </div>
            <div className={styles.SignoutButton}>
              <button onClick={logOut}className={styles.Signout}>로그 아웃</button>
            </div>
            {showModal && (
                    <Modal4
                        message="정말 탈퇴 하시겠습니까?"
                        onClose={handleCloseModal}
                        onConfirm={Delete}
                    />
                )}
            {showModal2 && (
                    <Modal
                        message="탈퇴되었습니다."
                        onClose={()=>navigate('/')}
                    />
                )}

        </div>
    );

};
export default App