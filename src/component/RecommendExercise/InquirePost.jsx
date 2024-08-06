import { useSearchParams, useNavigate } from 'react-router-dom';
import styles from '../../cssModule/inquirePost.module.css'
import Back from '../Button/Back';
import { useRef, useState, useEffect } from 'react';
import img from '../../images/img.svg'
import ImgMenu from '../Post/imgMenu';
import Modal from '../Modal';
import cookie from 'js-cookie'
import axios from 'axios';

export default function InquirePost() {
    const [searchParam] = useSearchParams();
    const modifyPostId = searchParam.get("id");
    const menuRef2 = useRef(); //앨범 버튼 Ref
    const textRef = useRef();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [modifyForm, setModifyForm] = useState({});

    useEffect(()=>{
        const fetchPreviousForm = async () => {
            if(modifyPostId) {
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

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    }; //사진 미리보기

    function handleSubmit() {
        if(!textRef.current.value) {
            setShowModal(true);
            return;
        }
        if(modifyPostId) {
            axios.patch(`${import.meta.env.VITE_SERVER_URL}/coach/${modifyPostId}`, {
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
            axios.post(`${import.meta.env.VITE_SERVER_URL}/coach`, {
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
                    <input
                        type="file"
                        id="photoUpload"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleImageUpload}
                    />
                <div className={styles.contentWrapper}>
                    <textarea ref={textRef} placeholder="질문할 내용을 입력하세요."/>
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
                message={modifyPostId?"질문이 수정되었습니다.":"코치에게 질문이 전달되었습니다."}
                onClose={()=>{setShowModal(false); navigate(-1)}}/>
                }
            </div>
        </>
    )
}