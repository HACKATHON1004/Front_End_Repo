import Back from "../Button/Back";
import styles from '../../cssModule/recruitPlacePost.module.css'
import PostList from "../Post/PostList";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

export default function RecruitPlacePost() {
    const dateRef = useRef();
    const today = new Date().toISOString().slice(0,10);
    const navigate = useNavigate();
    const [date, setDate] = useState('');
    function handleLink(src) {
        navigate(src);
    }

    function handleSearch() {
        setDate(dateRef.current.value);
    }
    
    return (
        <>
            <Back/>
            <div className={styles.pageWrapper}>
                <div className={styles.container}>
                    <div className={styles.title}>
                        <span>장소 모집</span>
                    </div>
                    <div className={styles.buttons}>
                        <button className={styles.viewButton}>
                        장소 모집 둘러보기
                        <span className={styles.icon}>🔍</span>
                        </button>
                        <button onClick={()=>handleLink("Post")} className={styles.writeButton}>
                        장소 모집 글쓰기
                        <span className={styles.icon}>✏️</span>
                        </button>
                    </div>
                    <div className={styles.dateSelector}>
                        <label className={styles.dateLabel}>날짜</label>
                        <div className={styles.selectors}>
                            <input ref={dateRef} min={today} type='date' id='date' name='date'/>
                        </div>
                    </div>
                    <div className={styles.tableWrapper}>
                        <label className={styles.tableHeader}>장소 모집</label>
                        <PostList field="인원" eventTime={date}/>
                    </div>
                    <div className={styles.btnWrapper}>
                        <button onClick={handleSearch} className={styles.searchBtn}>찾아보기</button>
                    </div>
                </div>
            </div>
        </>
    )
}