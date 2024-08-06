import React, { useState, useEffect, useRef } from 'react';
import styles from '../cssModule/TwoPlacereview.module.css'; 
import searchIcon from "../images/search.svg"; 
import StarCmtModal from "../component/Post/StarCmtModal.jsx";
import axios from 'axios';

const TwoPlacereview = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [reviews, setReviews] = useState([]);
    const [placeInfo, setPlaceInfo] = useState({
        name: '물빛수영장',
        details: '서울 성북구 길음7로 20',
        rating: '4.14',
        reviewCount: '552'
    });

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleIconClick = () => {
        axios.post('/api/searchReviews', { searchTerm })
            .then(response => {
                setReviews(Array.isArray(response.data) ? response.data : []);
            })
            .catch(error => {
                console.error("리뷰를 검색하는 중 오류가 발생했습니다!", error);
                setReviews([]); 
            });
    };

    const fetchReviews = () => {
        axios.get('/api/reviews')
            .then(response => {
                setReviews(Array.isArray(response.data) ? response.data : []);
            })
            .catch(error => {
                console.error("리뷰를 가져오는 중 오류가 발생했습니다!", error);
                setReviews([]); 
            });
    };

    useEffect(() => {
        fetchReviews(); // 컴포넌트 마운트 시 리뷰 목록을 가져옵니다.
    }, []);

    // 댓글 저장 후 리뷰 목록 업데이트를 위한 콜백 함수
    const handleCommentSaved = () => {
        fetchReviews(); // 최신 댓글 목록을 가져옵니다.
    };

    return (
        <div className={styles.container}>
            <div className={styles.placeReview}>장소 리뷰</div>
            <div className={styles.searchInputWrapper}>
           
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className={styles.searchInput}
                    placeholder="장소를 검색하세요"
                />
                <span className={styles.searchIcon} onClick={handleIconClick}>
                    <img src={searchIcon} alt="Search" />
                </span>
            </div>
            
            <div className={styles.placeInfo}>
                <div className={styles.placeName}>{placeInfo.name}</div>
                <div className={styles.placeDetails}>{placeInfo.details}</div>
                
            </div>
            <div className={styles.ratingWrapper}>
                    <div className={styles.StarreviewWapper}>
                    <span className={styles.Star}>★</span>
                    <span className={styles.rating}>{placeInfo.rating}</span>
                    </div>
                    <span className={styles.reviewCount}>방문자리뷰 {placeInfo.reviewCount}</span>
                </div>
            <div className={styles.reviewWapper}>
            <StarCmtModal onCommentSaved={handleCommentSaved} />
            </div>
           
            
            <div className={styles.reviewSection}>
                {reviews.length > 0 ? (
                    reviews.map((review, index) => (
                        <div key={index} className={styles.review}>
                            <img src={review.profileImage} alt="Profile" className={styles.profileImage} />
                            <p className={styles.reviewText}>{review.text}</p>
                            <p className={styles.reviewAuthor}>{review.author}</p>
                        </div>
                    ))
                ) : (
                    <p className={styles.noReviews}>리뷰가 없습니다.</p>
                )}
            </div>

            <button className={styles.moreButton}>더보기</button>
        </div>
    );
};

export default TwoPlacereview;