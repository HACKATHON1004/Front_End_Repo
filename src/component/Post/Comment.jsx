import { useEffect, useRef, useState } from 'react'
import styles from '../../cssModule/comment.module.css'
import axios from 'axios';
import cookie from 'js-cookie'
import { useNavigate } from 'react-router-dom';

export default function Comment({ modify, username, id, text, timestamp, profilePic, handleDelete, onCancle, onModify }) {
    const textRef = useRef();
    console.log(modify);
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    function handleModify() {
        axios.patch(`${import.meta.env.VITE_SERVER_URL}/rpcomment/${id}`, {
            content: textRef.current.value
        }, {
            headers: {
                Authorization: cookie.get("token")
            }
        })
            .then(()=>{
                navigate(0);
            })
    }

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_SERVER_URL}/rpcomment/${id}`, {
            headers: {
                Authorization: cookie.get("token")
            }
        })
            .then(res=>{
                setContent(res.data.content);
            })
    })

    return (
        <div key={id} className={styles.comment}>
            <img src={profilePic} alt="User profile picture" />
            <div className={styles.commentContent}>
                <div className={styles.username}>{username}</div>
                {modify===false?<div className={styles.text}>{text}</div>:<div><input ref={textRef} className={styles.text}></input><button onClick={onCancle}>X</button><button onClick={handleModify}>O</button></div>}
                <div className={styles.timestamp}>{timestamp.split("T").join(" ")}</div>
            </div>
            {
                modify===true?<></>:<div className={styles.menuWrapper}>
                <div onClick={()=>handleDelete(id)} className={styles.menuBar}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            }
        </div>
    )
}