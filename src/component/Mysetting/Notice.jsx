import React, { useState } from 'react';
import styles from '../../cssModule/Notice.module.css'; 
import axios from 'axios';
import Noticesvg from '../../images/notice.svg'
import Servicesvg from "../../images/service.svg";
import Back from '../Button/Back'; 
const Notice = () => {
  const [notices] = useState([
    { date: '2024년 7월 1일', content: '쉐어 운동 공간 모집글이 업로드되었습니다.' },
    { date: '2024년 6월 17일', content: '새로운 운동 종목이 추가되었습니다.' },
    { date: '2024년 5월 11일', content: '캘린더 세부기능이 추가되었습니다.' },
    { date: '2024년 5월 7일', content: '쉐어 운동 공간 내에 현재 비치된 운동기구를 소개합니다.' },
  ]);

  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('');
  const [inquiryContent, setInquiryContent] = useState('');

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    // 문의 데이터를 백엔드로 전송
    axios.post('https://real-east.shop/', { email, inquiryType, inquiryContent })
      .then(response => {
        console.log('문의가 제출되었습니다:', response.data);
        // 폼 리셋
        setEmail('');
        setInquiryType('');
        setInquiryContent('');
      })
      .catch(error => console.error('문의 제출 중 오류 발생:', error));
  };

  return (
    <div className={styles.container}>
      <Back/>
      <div className={styles.noticeSection}>
        <div className={styles.NoticeWapper}>
          <div className={styles.imgWapper}>
            <img src={Noticesvg} className={styles.imgNotice} alt="Noticesvg"></img>
            <div className={styles.NsectionTitle}>공지사항</div>
          </div>
          <div className={styles.Noticebox}>
            {notices.map((notice, index) => (
              <div key={index} className={styles.noticeItem}>
                <div className={styles.noticeDate}>{notice.date}</div>
                <div className={styles.noticeContent}>[공지사항] {notice.content}</div>
              </div>
            ))}
          </div>
         
        </div>
      </div>
      <div className={styles.inquirySection}>
        <div className={styles.SeriveWapper}>
          <div className={styles.img1Wapper}>
            <img src={Servicesvg} className={styles.imgService} alt="Servicesvg"></img>
            <div className={styles.SsectionTitle}>서비스 문의</div>
          </div>
          <div className={styles.formGroup}>
            <div className={styles.Elabel}>이메일</div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="답변 받으실 이메일을 입력해 주세요."
              required
            />
          </div>
          <div className={styles.formGroup}>
            <div className={styles.Nlabel}>문의 유형</div>
            <div>
              <select
                className={styles.Nselect}
                value={inquiryType}
                onChange={(e) => setInquiryType(e.target.value)}
                required
              >
                <option value="">유형을 선택해 주세요.</option>
                <option value="회원정보문의">회원정보문의</option>
                <option value="서비스 불편사항">서비스 불편사항</option>
                <option value="기타문의">기타문의</option>
              </select>
            </div>
          </div>
          <div className={styles.formGroup}>
            <div className={styles.Slabel}>내용</div>
            <textarea
              value={inquiryContent}
              onChange={(e) => setInquiryContent(e.target.value)}
              placeholder="문의 내용을 입력해 주세요. 
확인 후 빠르게 답변 드리겠습니다."
              required
            ></textarea>
          </div>
        </div>
      </div>
      <div className={styles.submitWapper}>
        <button onClick={handleInquirySubmit} type="submit" className={styles.submitButton}>제출</button>
      </div>
    </div>
  );
};

export default Notice;