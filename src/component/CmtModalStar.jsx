import { useState, useRef, useEffect } from 'react';
import styles from '../cssModule/StarpostContent.module.css';
import profile from '../images/1.svg';
import Modal from './Modal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import cookie from 'js-cookie'

export default function CmtModal({msg, username, postId}) {
  const [isCommentBoxVisible, setCommentBoxVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [isBox, setIsBox] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const commentRef = useRef();
  const textRef = useRef();
  const navigate = useNavigate();
  console.log(postId);

  function handleClickOutside(e) {
    if (commentRef.current && !commentRef.current.contains(e.target)) {
        setCommentBoxVisible(false);
        setIsBox(false);
        setTimeout(() => {
            setCommentBoxVisible(false);
            setCharCount(0);
        }, 800)
    }
  }

  const handleStarClick = (index) => {
    setRating(index + 1); // 1부터 시작하는 별 개수로 설정
  };

  function handlePost() {
    if(!textRef.current.value||rating===0) {
      setShowModal(true);
      return;
    }
    
    axios.post(`${import.meta.env.VITE_SERVER_URL}/review/${postId}`,{
      content: textRef.current.value,
      starRating: parseInt(rating)
    }, {
      headers: {
        Authorization: cookie.get("token")
      }
    })
       .then(()=>{
        navigate(0);
       }) 
}

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCommentBoxToggle = () => {
    setIsBox(!isBox);
    setCharCount(0);
    
    if(!isCommentBoxVisible){
        setTimeout(() => {
            setCommentBoxVisible(prevState => !prevState);
        }, 800)
    }
    else{
        setCommentBoxVisible(prevState => !prevState);
    }
  };

  const handleTextChange = (e) => {
    setCharCount(e.target.value.length);
  };

  return (
    <div ref={commentRef} className={styles.commentWrapper}>
      {isCommentBoxVisible ? (
        <div className={styles.commentBox}>
          <div className={styles['comment-header']}>
            <div className={styles.profileWrapper}>
              <img src={profile} alt="Profile" className={styles['profile-image']} />
              <span>{username}</span>
            </div>
            <span className={styles['char-count']}>{charCount}/6000</span>
          </div>
          <textarea
            ref={textRef}
            className={styles['comment-textarea']}
            placeholder={msg}
            onChange={handleTextChange}
          />
          <div className={styles['comment-actions']}>
            <div className={styles.starWrapper}>
              {Array.from({ length: 5 }).map((_, index) => (
                <button
                  key={index}
                  className={`${styles.starButton} ${index < rating ? styles.active : ''}`}
                  onClick={() => handleStarClick(index)}
                >
                  ★
                </button>
              ))}
            </div>
            <div className={styles['two_button']}>
                <button className={styles['cancel-button']} onClick={handleCommentBoxToggle}>취소</button>
                <button onClick={handlePost} className={styles['submit-button']}>등록</button>
            </div>
          </div>
        </div>
      ) : (
        <div onClick={handleCommentBoxToggle} className={`${styles.comment} ${isBox ? styles.active : ''}`}>
          <span>{msg}</span>
        </div>
      )}
      {showModal && (
        <Modal
          message="댓글을 입력해주세요."
          onClose={()=>setShowModal(false)}
        />
      )}
    </div>

  );
}