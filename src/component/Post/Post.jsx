import styles from '../../cssModule/post.module.css'
import Back from '../Button/Back';
import PostList from '../Post/PostList.jsx'
import write from '../../images/write.svg'
import { useNavigate } from 'react-router-dom';

export default function Post(){
    const navigate = useNavigate();
    return (
        <>
            <Back/>
            <div className={styles.postWrapper}>
                <div className={styles.postTitle}>자유 게시판</div>
                <div className={styles.tableWrapper}>
                  <PostList field="추천" type="free"/>
                </div>
                <div className={styles.btnWrapper}>
                  <button onClick={()=>navigate('post')} className={styles.postBtn}>
                    <img src={write} style={{marginRight:"2px"}} alt="Pencil Icon" width="24" height="24"/>
                    <span>글쓰기</span>
                  </button>
                </div>
            </div>
        </>
    )
}