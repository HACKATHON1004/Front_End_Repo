import { useEffect, useState, useRef } from "react";
import Back from "../Button/Back";
import styles from '../../cssModule/inquirePost.module.css'
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Modal from "../Modal";
import cookie from 'js-cookie'
import axios from "axios";

export default function AnswerPost() {
    const [param] = useSearchParams();
    const textRef = useRef();
    const inquireId = param.get("id");
    const modifyAnswerId = param.get("modifyId");
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const navigate = useNavigate();
    
    useEffect(()=>{
        const fetchPreviousForm = async () => {
            if(modifyAnswerId) {
                try {
                    const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/coach/${modifyPostId}`);
                    const previousForm = await res.data;
                    setModifyForm(previousForm);
                    textRef.current.value = previousForm.content;
                }
                catch(error) {
                    console.error('Error fetching modify form:', error);
                }
            }
        }

        fetchPreviousForm();
    }, []);

    function handleSubmit() {
        if(!textRef.current.value) {
            setShowModal(true);
            return;
        }
        if(modifyAnswerId) {
            axios.patch(`${import.meta.env.VITE_SERVER_URL}/cpcomment/${modifyAnswerId}`, {
                content: textRef.current.value
            },{
                headers: {
                    Authorization: cookie.get("token")
                }
            })
            .then(()=>{
                setShowModal2(true);
            })
        }
        else{
            axios.post(`${import.meta.env.VITE_SERVER_URL}/cpcomment/${inquireId}`, {
                content: textRef.current.value
            },{
                headers: {
                    Authorization: cookie.get("token")
                }
            })
                .then(()=>{
                    setShowModal2(true);
                })
        }
    }
    
    return (
        <>
            <Back/>
            <div className={styles.pageWrapper}>
                <div className={styles.contentWrapper}>
                    <textarea ref={textRef} placeholder="회원에게 답변해주세요."/>
                </div>
                <div className={styles.btnWrapper}>
                    <button onClick={()=>{navigate(-1)}} className={styles.delBtn}>취소</button>
                    <button onClick={handleSubmit} className={styles.postBtn}>등록</button>
                </div>
                {showModal&&
                <Modal 
                message="빈 입력창이 있습니다."
                onClose={()=>{setShowModal(false);}}/>
                }
                {showModal2&&
                <Modal
                message={modifyAnswerId?"답변이 수정되었습니다.":"회원에게 답변이 전달되었습니다."}
                onClose={()=>{setShowModal(false); navigate(-1)}}/>
                }
            </div>
        </>
    )
}