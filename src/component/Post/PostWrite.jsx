import Back from "../Button/Back";
import styles from "../../cssModule/postWrite.module.css"
import img from "../../images/img.svg"
import { useState, useEffect } from "react";
import { useRef } from "react";
import ImgMenu from "../../component/Post/imgMenu";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import cookie from "js-cookie"
import Modal from "../Modal";

export default function PostWrite() {
    const [searchParam] = useSearchParams();
    const modifyPostId = searchParam.get("id");
    const [showMenu, setShowMenu] = useState(false);
    const menuRef2 = useRef(); //앨범 버튼 Ref
    const titleRef = useRef();
    const textRef = useRef();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [modifyForm, setModifyForm] = useState({});

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

    useEffect(()=>{
        const fetchPreviousForm = async () => {
            if(modifyPostId) {
                try {
                    const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/free/${modifyPostId}`);
                    const previousForm = await res.data;
                    setModifyForm(previousForm);
                    titleRef.current.value = previousForm.title;
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
        if(!titleRef.current.value||!textRef.current.value) {
            setShowModal(true);
            return;
        }
        if(modifyPostId) {
            axios.patch(`${import.meta.env.VITE_SERVER_URL}/free/${modifyPostId}`, {
                title: titleRef.current.value,
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
            axios.post(`${import.meta.env.VITE_SERVER_URL}/free`, {
                title: titleRef.current.value,
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
                <div className={styles.header}>
                    <div className={styles.titleWrapper}>
                        <input ref={titleRef} type="text" placeholder="제목을 입력해 주세요." className={styles.title} />
                    </div>
                </div>
                <ImgMenu />
                    <input
                        type="file"
                        id="photoUpload"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleImageUpload}
                    />
                <div className={styles.contentWrapper}>
                    <textarea ref={textRef} placeholder="내용을 입력하세요."/>
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
                message="게시글이 등록되었습니다."
                onClose={()=>{setShowModal(false); navigate(-1)}}/>
                }
            </div>
        </>
    )
}