import Back from "../Button/Back";
import styles from '../../cssModule/inquirePostContent.module.css'
import profileImage from '../../images/1.svg'
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import cookie from 'js-cookie'
import axios from "axios";
import Modal3 from "../Modal3";
import Modal from "../Modal";
import write from '../../images/write.svg'

export default function InquirePostContent() {
    const param = useParams();
    const inquireId = param.id;
    const [comment, setComment] = useState({});
    const [commentId, setCommentId] = useState(false);
    const isCoach = cookie.get("isCoach");
    const [coachCmt, setCoachCmt] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const menuRef2 = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef2.current && !menuRef2.current.contains(event.target)) {
                setShowModal(false);
            }
        }

        if (showModal) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showModal]);

    function modifyComment() {
        navigate(`/inquire/post?id=${inquireId}`)
    }

    useEffect(()=>{ ///엔드포인트 넣어야댐
        axios.get(`${import.meta.env.VITE_SERVER_URL}/cpcomment/coachPost/${inquireId}`, {
            headers: {
                Authorization: cookie.get("token")
            }
        })
            .then(res=>{
                setCoachCmt(res.data);
            })
    }, [])

    function deleteComment() {
        axios.delete(`${import.meta.env.VITE_SERVER_URL}/coach/${inquireId}`, {
            headers: {
                Authorization: cookie.get("token")
            }
        })
            .then(()=>{
                setShowModal2(true);
            })
    }

    function handleCloseModal() {
        setShowModal(false);
    }

    function handleDelete(type) {
        if(type==="del") 
            setShowModal3(true);
        else if(type=="mod")
            setShowModal2(true);
        else {
            setShowModal(true);
            setCommentId(type);
        }
    }
    
    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_SERVER_URL}/coach/${inquireId}`,{
            headers: {
                Authorization: cookie.get("token")
            }
        })
            .then((res=>{
                setComment(res.data);
            }))
    }, [])
    
    return (
        <>
            <Back/>
            <div className={styles.pageWrapper}>
                <div className={styles.inquireWrapper}>
                    <div className={styles.headerWrapper}>
                        <img 
                        style={{width:"29px", height:"29px"}}
                        src={profileImage} 
                        alt="User Profile" 
                        className={styles.profileImage} 
                        />
                        <div className={styles.userInfo}>
                            <span className={styles.username}>{comment.username}</span>
                            <span className={styles.createDate}></span>
                        </div>
                        <div>
                            <div className={styles.menuWrapper}>
                                <div onClick={()=>handleDelete(inquireId)} className={styles.menuBar}>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>    
                            </div> 
                        </div>
                    </div>
                    <div className={styles.contentWrapper}>
                        <div className={styles.content}>{comment.content}</div>
                    </div>        
                </div>
                <div className={styles.btnWrapper}>
                    {isCoach&&isCoach==="true"&&comment.isAnswer===false?(<button onClick={()=>navigate(`/inquire/answer?id=${inquireId}`)} className={styles.postBtn}>
                        <img src={write} style={{marginRight:"2px"}} alt="Pencil Icon" width="24" height="24"/>
                        <span>답변하기</span>
                    </button>):(<></>)}
                </div>
                {showModal && (
                    <Modal3
                        onClose={handleCloseModal}
                        onModify={modifyComment}
                        onDelete={deleteComment}
                        showMenu={showModal}
                        menuRef2={menuRef2}
                    />
                )}
                {showModal2 && (
                    <Modal
                        message="질문이 삭제되었습니다."
                        onClose={()=>navigate('/inquire')}
                    />
                )}
                {coachCmt.length > 0?(<div className={styles.inquireWrapper}>
                    <div className={styles.headerWrapper}>
                        <img 
                        style={{width:"29px", height:"29px"}}
                        src={profileImage} 
                        alt="User Profile" 
                        className={styles.profileImage} 
                        />
                        <div className={styles.userInfo}>
                            <span className={styles.username}>{coachCmt[0].name} 코치</span>
                            <span className={styles.createDate}></span>
                        </div>
                        <div>
                            <div className={styles.menuWrapper}>
                                <div onClick={()=>handleDelete(inquireId)} className={styles.menuBar}>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>    
                            </div> 
                        </div>
                    </div>
                    <div className={styles.contentWrapper}>
                        <div className={styles.content}>{coachCmt[0].content}</div>
                    </div>
                </div>):<></>}
            </div>
        </>
    )
}