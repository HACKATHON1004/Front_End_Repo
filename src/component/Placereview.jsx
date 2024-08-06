import React, { useState, useEffect, useRef } from 'react';
import styles from '../cssModule/Placereview.module.css';
import searchIcon from "../images/search.svg";
import axios from 'axios';

const Placereview = () => {
  const [places, setPlaces] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('distance'); // 기본:거리순
  const searchInputRef = useRef(null);

  
  useEffect(() => {
    axios.post('/api/searchPlaces', { searchTerm, sortOrder })
      .then(response => {
        setPlaces(response.data);
      })
      .catch(error => console.error('데이터 가져오기 오류:', error));
  }, [searchTerm, sortOrder]); // searchTerm 또는 sortOrder가 변경될 때마다 데이터 가져오기


  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  
  const handleIconClick = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  
  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.placeWrapper}>
          <div className={styles.placeReview}>장소 리뷰</div>
          <div className={styles.placeSearch}>
            <div className={styles.searchInputWrapper}>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                className={styles.searchInput}
                placeholder="장소를 검색하세요"
                ref={searchInputRef}
              />
              <span className={styles.searchIcon} onClick={handleIconClick}>
                <img src={searchIcon} alt="Search" />
              </span>
            </div>
          </div>
          <div className={styles.buttonWrapper}>
            <button className={styles.close} onClick={() => handleSortChange('distance')}>
              근거리순
            </button>
            <button className={styles.review} onClick={() => handleSortChange('review')}>
              리뷰 순
            </button>
          </div>
        </div>
        <div className={styles.placeList}>
          {places.length > 0 ? (
            places.map((place, index) => (
              <div key={index} className={styles.placeItem}>
                <img src={place.image} alt={place.name} className={styles.placeImage} />
                <div className={styles.placeDetails}>
                  <div className={styles.placeName}>{place.name}</div>
                  <div className={styles.placeRating}>⭐ {place.rating}</div>
                  <div className={styles.placeReviews}>{place.reviews} 방문자리뷰</div>
                </div>
              </div>
            ))
          ) : (
            <p>검색된 장소가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Placereview;