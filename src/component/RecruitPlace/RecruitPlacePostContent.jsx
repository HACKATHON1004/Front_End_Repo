import { useNavigate, useParams } from 'react-router-dom';
import styles from '../../cssModule/postContent.module.css'
import Back from '../Button/Back'
import Modal2 from '../Modal2';
import Modal3 from '../Modal3';
import CmtModal from '../Post/CmtModal';
import Comment from '../Post/Comment';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import cookie from 'js-cookie'
import Modal from '../Modal';

export default function RecruitPlacePostContent() {
    const param = useParams();
    const postId = param.id;
    const [username, setUsername] = useState('');
    const [postData, setPostData] = useState([]);
    const [showModal, setShowModal] = useState(false); //삭제
    const [showModal2, setShowModal2] = useState(false); //수정
    const [showModal3, setShowModal3] = useState(false); //댓글 수정 및 삭제
    const [showModal4, setShowModal4] = useState(false); //지원하기
    const [showModal5, setShowModal5] = useState(false); //취소하기
    const [showModal6, setShowModal6] = useState(false); //지원 확인
    const [showModal7, setShowModal7] = useState(false); //수정 확인
    const [showModal8, setShowModal8] = useState(false); //삭제 확인
    const [showModal9, setShowModal9] = useState(false);
    const [showModal10, setShowModal10] = useState(false);
    const [isApply, setIsApply] = useState(true);
    const [commentId, setCommentId] = useState(false);
    const [comments, setComments] = useState([]);
    const [cmtModify, setCmtModify] = useState(false);
    const navigate = useNavigate();
    const menuRef2 = useRef();

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_SERVER_URL}/calendar/recruitPost/${postId}`, {
            headers: {
                Authorization: cookie.get("token")
            }
        })
            .then(res=>{
                if(res.data===true){
                    setIsApply(false);
                }
            })

        axios.get(`${import.meta.env.VITE_SERVER_URL}/rpcomment/recruitPost/${postId}`)
            .then(res=>{
                setComments(res.data);
            })
            .catch(()=>{
                console.log("댓글 패치 에러");
            })
        
        axios.get(`${import.meta.env.VITE_SERVER_URL}/recruit/${postId}`)
            .then(res=>{
                setPostData(res.data);
            })
            .catch(err=>{
                console.error(err);
            });

        axios.get(`${import.meta.env.VITE_SERVER_URL}/user/username`,{
            headers:{
                Authorization: cookie.get("token")
            }
        })
            .then(res=>{
                setUsername(res.data.username);
            })
            .catch(()=>{
                console.log("그딴거 없음");
            })
    }, [])

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef2.current && !menuRef2.current.contains(event.target)) {
                setShowModal3(false);
            }
        }

        if (showModal3) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showModal3]);

    function handleApply() {
        axios.post(`${import.meta.env.VITE_SERVER_URL}/calendar`, {
            recruitPostId: postId
        }, {
            headers: {
                Authorization:cookie.get("token")
            }
        })
            .then(res=>{
                console.log(res.data);
            })
        setShowModal4(false);
        setShowModal6(true);
    }

    function handleModify() {
        navigate(`/recruitPlace/Post?id=${postId}`);
    }

    function handleDelete(type) {
        if(type==="del") 
            setShowModal(true);
        else if(type==="mod") {
            setShowModal2(true);
        }
        else if(type==="apply") {
            setShowModal4(true);
        }
        else if(type==="cancle")
            setShowModal5(true);
        else{
            setShowModal3(true);
            setCommentId(type);
        }
            
    }

    function handleCloseModal() {
        setShowModal(false);
        setShowModal2(false);
        setShowModal4(false);
        setShowModal3(false);
        setShowModal5(false);
        setShowModal6(false);
    }

    function handleDeletePost() {
        axios.delete(`${import.meta.env.VITE_SERVER_URL}/recruit/${postId}`,{
            headers: {
                Authorization: cookie.get("token")
            }
        });
        setShowModal2(false);
        setShowModal8(true);
    }

    function modifyComment() {
        setCmtModify(true);
        setShowModal3(false);
    }

    function deleteComment() {
        axios.delete(`${import.meta.env.VITE_SERVER_URL}/rpcomment/${commentId}`,{
            headers: {
                Authorization: cookie.get("token")
            }
        })
            .then(res=>{
                console.log(res.data);
            })
        setShowModal9(true);
    }

    function handleCancle() {
        axios.delete(`${import.meta.env.VITE_SERVER_URL}/calendar/${postId}`, {
            headers: {
                Authorization: cookie.get("token")
            }
        })
        setShowModal5(false);
        setShowModal10(true);
    }

    return (
        <>
            <Back/>
            <div className={styles.pageWrapper}>
                <div style={postData.username === username ? {} : { visibility: "hidden" }} className={styles.buttons}>
                    <button className={styles.buttonModDel} onClick={() => handleDelete("mod")}>수정</button>
                    <button className={styles.buttonModDel} onClick={() => handleDelete("del")}>삭제</button>
                </div>
                <div className={styles.titleWrapper}>
                    <div className={styles.titles}>
                        <div className={styles.title}>
                            <span>{postData.title}</span>
                        </div>
                        <div className={styles.title}>
                            {postData.currentRecruit}/{postData.totalRecruit?postData.totalRecruit:"∞"}
                        </div>
                    </div>
                    <div className={styles.title}>
                        모집자 전화번호 : {postData.phone}
                    </div>
                    <div className={styles.postInfo}>
                        <span>{postData.createDate&&postData.createDate.split("T").join(" ")}</span>
                        <span>조회 수 {postData.view}</span>
                        <span>댓글 {comments.length}</span>
                    </div>
                </div>
                <div className={styles.contentWrapper}>
                    <div className={styles.content}>
                    {postData.eventTime&&postData.eventTime.split("-").join(" ")} <br/> 
                    {postData.content}
                    </div>
                </div>
                <div className={styles.btnWrapper}>
                    {isApply?
                        <button onClick={()=>handleDelete("apply")} className={styles.applyBtn}>지원하기</button>
                        :
                        <button onClick={()=>handleDelete("cancle")} className={styles.cancleBtn}>지원 취소</button>
                    }
                </div>
                <CmtModal msg="댓글을 남겨보세요." username={username} type="free" postId={postId} />
                <div className={styles.commentSection}>
                    <div className={styles.commentCnt}>
                        <div className={styles.cnt}>댓글 {comments.length}개</div>
                    </div>
                    {comments.map(comment => (
                    <Comment
                        id={comment.id}
                        modify={cmtModify}
                        handleDelete={handleDelete}
                        key={comment.id}
                        username={comment.username}
                        text={comment.content}
                        timestamp={comment.createDate}
                        profilePic={'https://via.placeholder.com/50'}
                        onCancle={()=>setCmtModify(false)}
                    />
                    ))}
                </div>
                {showModal && (
                    <Modal2
                        message="삭제 하시겠습니까?"
                        onClose={()=>handleCloseModal("del")}
                        onCheck={handleDeletePost}
                    />
                )}
                {showModal2 && (
                    <Modal2
                        message="수정 하시겠습니까?"
                        onClose={()=>handleCloseModal("mod")}
                        onCheck={handleModify}
                    />
                )}
                {showModal3 && (
                    <Modal3
                        onClose={handleCloseModal}
                        onModify={modifyComment}
                        onDelete={deleteComment}
                        showMenu={showModal3}
                        menuRef2={menuRef2}
                    />
                )}
                {showModal4 && (
                    <Modal2
                        message="지원 하시겠습니까?"
                        onClose={handleCloseModal}
                        onCheck={handleApply}
                    />
                )}
                {showModal5 && (
                    <Modal2
                        message="취소 하시겠습니까?"
                        onClose={()=>handleCloseModal("del")}
                        onCheck={handleCancle}
                    />
                )}
                {showModal6 && (
                    <Modal
                        message="장소에 지원되었습니다."
                        onClose={()=>navigate('/calendar')}
                    />
                )}
                {showModal7 && (
                    <Modal
                        message="게시글이 수정되었습니다."
                        onClose={()=>handleCloseModal("del")}
                    />
                )}
                {showModal8 && (
                    <Modal
                        message="게시글이 삭제되었습니다."
                        onClose={()=>navigate('/recruitPlace')}
                    />
                )}
                {showModal9 && (
                    <Modal
                        message="댓글이 삭제되었습니다."
                        onClose={()=>{navigate(0)}}
                    />
                )}
                {showModal10 && (
                    <Modal
                        message="지원이 취소되었습니다."
                        onClose={()=>navigate(0)}
                    />
                )}
            </div>
        </>
    )
}
