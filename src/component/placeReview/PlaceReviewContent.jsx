import styles from '../../cssModule/placeReviewContent.module.css'
import img1 from '../../images/findCat.svg'
import img2 from '../../images/location.svg'
import img3 from '../../images/search.svg';
import img4 from '../../images/pencil.svg'
import img5 from '../../images/close.svg'
import CmtModalStar from '../CmtModalStar'
import Back from '../Button/Back';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import cookie from 'js-cookie'
import Modal from '../Modal'; // Ensure you import Modal component

export default function PlaceReviewContent() {
    const param = useParams();
    const placeId = param.id;
    const inputRef = useRef();
    
    const [reviewData, setReviewData] = useState({});
    const [reviews, setReviews] = useState([]);
    const [username, setUsername] = useState('');
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate(); // Add navigate

    const handleClear = () => {
        inputRef.current.value = '';
    };

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_SERVER_URL}/place/${placeId}`)
            .then(res=>{
                setReviewData(res.data);
            });

        axios.get(`${import.meta.env.VITE_SERVER_URL}/review/place/${placeId}`)
            .then(res=>{
                setReviews(res.data);
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
    }, [placeId]);
    
    return (
        reviewData && <>
            <Back />
            <div className={styles.pageWrapper}>
                <div className={styles.title2}>
                    <div>
                        <img src={img4} />
                    </div>
                    <div>
                        <span>장소 리뷰</span>
                    </div>
                </div>
                <div className={styles.bodyWrapper}>
                    <div className={styles.title}>
                        <img src={img1}/>
                    </div>
                    <div className={styles.container}>
                        <div className={styles.header}>
                            <span className={styles.title}>{reviewData.placeName}</span>
                            <img src={img2} />
                            <span className={styles.location}>{reviewData.address}</span>
                        </div>
                        <div className={styles.reviewInfo}>
                            <span className={styles.rating}>&#9733; {reviewData.starAvg && reviewData.starAvg.toFixed(2)}</span> {/* 별표 유니코드 사용 */}
                            <span className={styles.reviewCount}>방문자리뷰 {reviews.length}</span>
                        </div>
                        <CmtModalStar msg="리뷰를 남겨보세요." username={username} postId={placeId} />
                    </div>
                    <div className={styles.reviewList}>
                        {reviews.map((item, index) => (
                            <div key={index} className={styles.reviewItem}>
                                <div className={styles.userInfo}>
                                    <div className={styles.userIcon}>👤</div>
                                    <div className={styles.userWrapper}>
                                        <div>
                                          <span className={styles.userId}>{item.username.slice(0, 3)}***</span>
                                          <div>
                                              {[...Array(item.starRating)].map((_, i) => (
                                                  <span key={i}>&#9733;</span> // 별표 유니코드
                                              ))}
                                          </div>
                                        </div>
                                        <div>{item.createDate.split("T").join(" ")}</div>
                                    </div>
                                </div>
                                <div className={styles.userReviewWrapper}>
                                    <p className={styles.userReview}>{item.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {showModal && (
                    <Modal
                        message="리뷰가 등록되었습니다."
                        onClose={() => navigate(0)} // Ensure navigate(0) reloads the page
                    />
                )}
            </div>
        </>
    )
}
