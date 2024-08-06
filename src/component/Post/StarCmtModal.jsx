import { useState, useRef, useEffect } from 'react';
import styles from '../../cssModule/StarpostContent.module.css';
import profile from '../../images/1.svg';
import axios from 'axios';

export default function StarCmtModal() {
  const [isCommentBoxVisible, setCommentBoxVisible] = useState(false);
  const [isBox, setIsBox] = useState(false);
  const [rating, setRating] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]); // 댓글 목록 상태 추가
  const commentRef = useRef();

  // 클릭 외부 감지 핸들러
  function handleClickOutside(e) {
    if (commentRef.current && !commentRef.current.contains(e.target)) {
      setCommentBoxVisible(false);
      setIsBox(false);
      setTimeout(() => {
        setCommentBoxVisible(false);
      }, 800);
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCommentBoxToggle = () => {
    setIsBox(!isBox);
    
    if (!isCommentBoxVisible) {
      setTimeout(() => {
        setCommentBoxVisible(prevState => !prevState);
      }, 800);
    } else {
      setCommentBoxVisible(prevState => !prevState);
    }
  };

  const handleStarClick = (index) => {
    setRating(index + 1); // 1부터 시작하는 별 개수로 설정
  };

  const handleTextChange = (e) => {
    setCommentText(e.target.value);
    setCharCount(e.target.value.length);
  };

  // 댓글 전송 처리
  const handleSubmit = () => {
    if (commentText.trim() === '') {
      alert('댓글을 작성해 주세요.');
      return;
    }

    // 댓글 데이터 전송
    axios.post('/api/saveComment', {
      rating,
      text: commentText,
    })
    .then(response => {
      // 성공적으로 저장된 후 댓글 목록 업데이트
      setComments(prevComments => [response.data, ...prevComments]);
      setCommentText('');
      setRating(0);
      setCharCount(0);
      setCommentBoxVisible(false);
      setIsBox(false);
    })
    .catch(error => {
      console.error("댓글을 저장하는 중 오류가 발생했습니다!", error);
    });
  };

  return (
    <div ref={commentRef} className={styles.commentWrapper}>
      {isCommentBoxVisible ? (
        <div className={styles.commentBox}>
          <div className={styles['comment-header']}>
            <div className={styles.profileWrapper}>
              <img src={profile} alt="Profile" className={styles['profile-image']} />
              <span>민머시기</span>
            </div>
            <span className={styles['char-count']}>{charCount}/6000</span>
          </div>
          <textarea
            className={styles['comment-textarea']}
            placeholder="리뷰를 남겨보세요."
            value={commentText}
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
            <button className={styles['cancel-button']} onClick={handleCommentBoxToggle}>취소</button>
            <button className={styles['submit-button']} onClick={handleSubmit}>등록</button>
          </div>
        </div>
      ) : (
        <div onClick={handleCommentBoxToggle} className={`${styles.comment} ${isBox ? styles.active : ''}`}>
          <span>리뷰를 남겨보세요.</span>
        </div>
      )}
    </div>
  );
}