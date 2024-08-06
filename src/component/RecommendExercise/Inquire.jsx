import React, { useEffect, useState } from 'react';
import styles from '../../cssModule/inquire.module.css'
import Back from '../Button/Back';
import write from '../../images/write.svg'
import cookie from 'js-cookie'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import profileImage from '../../images/1.svg'

export default function Inquire() {
    const [comments, setData] = useState([]);
    const navigate = useNavigate();
    const [isCoach, setIsCoach] = useState(false);

    useEffect(()=>{
      if(cookie.get("isCoach")==="true"){
        axios.get(`${import.meta.env.VITE_SERVER_URL}/coach`)
          .then(res=>{
            setData(res.data);
          })
      }
      else {
        axios.get(`${import.meta.env.VITE_SERVER_URL}/coach/username`,{
          headers: {
              Authorization: cookie.get("token")
          }
      })
          .then(res=>{
              setData(res.data);
          })
      }     
        setIsCoach(cookie.get("isCoach"));
        console.log(isCoach);
    }, [])

    const truncateContent = (content, limit) => {
      if (content.length > limit) {
          return content.substring(0, limit) + '...';
      }
      return content;
    };
  
    return (
    <>
      <Back />
      <div className={styles.pageWrapper}>
        <div>
          코치에게 질문하기
        </div>
        <div className={styles.btnWrapper}>
            {isCoach&&isCoach==="true"?(<></>):(<button onClick={()=>navigate('post')} className={styles.postBtn}>
                <img src={write} style={{marginRight:"2px"}} alt="Pencil Icon" width="24" height="24"/>
                <span>질문하기</span>
            </button>)}
        </div>
        {comments.map(comment => (
          <div key={comment.id} onClick={()=>navigate(`post/${comment.id}`)} className={styles.comment}>
            <div className={styles.header}>
              <div className={styles.headerWrapper}>
                <img 
                  src={profileImage} 
                  alt="User Profile" 
                  className={styles.profileImage} 
                />
                <div className={styles.userInfo}>
                  <span className={styles.username}>{comment.username}</span>
                  <span className={styles.timestamp}>{comment.createDate}</span>
                </div>
              </div>  
              <div className={comment.isAnswer?styles.replySuc:styles.replyButton}>{comment.isAnswer?"답변완료":"답변대기"}</div>
            </div>
            <div className={styles.content}>
              <span>{truncateContent(comment.content, 50)}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
