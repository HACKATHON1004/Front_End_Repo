import React, { useState } from 'react';
import styles from '../../cssModule/myp.module.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal';

function App() {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [coachingPeriod, setCoachingPeriod] = useState('');
  const [coachingCertificate, setCoachingCertificate] = useState('');
  const [personal, setPersonal] = useState('');
  const [other, setOther] = useState('');
  const [coaching, setCoaching] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const complete = async (e) => {
    e.preventDefault();

    const errors = {};

    if (!age) {
      errors.age = "나이를 입력해주세요";
    } else if (!/^\d+$/.test(age)) {
      errors.age = "나이는 숫자로 입력해주세요";
    }

    if (!gender) {
      errors.gender = "성별을 선택해주세요";
    }
    if (!coachingPeriod) {
      errors.coachingPeriod = "헬스 트레이너로 활동한 기간을 입력해주세요";
    }
    if (!coachingCertificate) {
      errors.coachingCertificate = "일반 퍼스널 트레이닝 자격증을 입력해주세요";
    }
    if (!coaching) {
      errors.coaching = "장애인스포츠 지도사 자격증을 입력해주세요";
    }
    if (!personal) {
      errors.personal = "CPR 퍼스널 트레이닝 자격증을 입력해주세요";
    }
    if (!other) {
      errors.other = "기타 헬스 관련 자격증을 입력해주세요";
    }

    if (Object.values(errors).some(error => error !== "")) {
      setErrors(errors);
      return;
    }

    try {
      const token = Cookies.get('token');
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/coachinfo`,
        {
          age,
          sex: gender,
          career: coachingPeriod,
          normalLicense: coachingCertificate,
          sportsLicense: coaching,
          cprLicense: personal,
          etcLicense: other
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          }
        }
      );

      if (response.status === 200) {
        console.log("데이터 전송 성공");
        setShowModal(true);
        resetFormStates();
      } else {
        console.error("데이터 전송 실패");
        setShowModal(true);
      }
    } catch (error) {
      console.error("데이터 전송 중 오류 발생", error);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/home');
  };

  const resetFormStates = () => {
    setAge('');
    setGender('');
    setCoachingPeriod('');
    setCoachingCertificate('');
    setPersonal('');
    setOther('');
    setCoaching('');
    setErrors({});
  };

  return (
    <>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={complete}>
          <div className={styles.exAlabel}>나이를 입력해주세요</div>
          <input
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            pattern="\d*"
            title="나이는 숫자로 입력해주세요"
          />
          {errors.age && <div className={styles.error}>{errors.age}</div>}

          <div className={styles.Coach}>헬스 트레이너로 활동한 기간을 입력해주세요</div>
          <input
            type="text"
            value={coachingPeriod}
            onChange={(e) => setCoachingPeriod(e.target.value)}
          />
          {errors.coachingPeriod && <div className={styles.error}>{errors.coachingPeriod}</div>}

          <div className={styles.exGlabel}>성별을 선택해주세요</div>
    
            <div className={styles.exGWapper}>
            <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        
                    >
                        <option value="">성별</option>
                        <option value="남성">남성</option>
                        <option value="여성">여성</option>
                    </select>
                    {/* {errors.gender && <div className={styles.error}>{errors.gender}</div>} */}
            </div>

          <div className={styles.coachingCertificate}>취득한 일반 퍼스널 트레이닝 자격증을 입력해주세요.</div>
          <div className={styles.excoachingCertificate}>(ex NSCA, ASCM, ISSA, ACSM 등등)</div>
          <div className={styles.coachingCertificateWapper}>
            <textarea
              value={coachingCertificate}
              onChange={(e) => setCoachingCertificate(e.target.value)}
              placeholder="내용을 입력해주세요." 
              required
            ></textarea>
          </div>
          {errors.coachingCertificate && <div className={styles.error}>{errors.coachingCertificate}</div>}

          <div className={styles.leadershipCertificate}>취득한 장애인스포츠 지도사 자격증을 입력해주세요.</div>
          <div className={styles.exleadershipCertificate}>(ex 1급, 2급 등등)</div>
          <div className={styles.leadershipCertificateWapper}>
            <textarea
              value={coaching}
              onChange={(e) => setCoaching(e.target.value)}
              placeholder="내용을 입력해주세요." 
              required
            ></textarea>
          </div>
          {errors.coaching && <div className={styles.error}>{errors.coaching}</div>}

          <div className={styles.PersonalTrainingCertificate}>취득한 CPR 퍼스널 트레이닝 자격증을 입력해주세요.</div>
          <div className={styles.exPersonalTrainingCertificate}>(ex BLS, KALS, ACLS 등등)</div>
          <div className={styles.PersonalTrainingCertificateWapper}>
            <textarea
              value={personal}
              onChange={(e) => setPersonal(e.target.value)}
              placeholder="내용을 입력해주세요." 
              required
            ></textarea>
          </div>
          {errors.personal && <div className={styles.error}>{errors.personal}</div>}

          <div className={styles.OtherHealth}>기타 헬스 관련 자격증을 입력해주세요.</div>
          <div className={styles.OtherHealthWapper}>
            <textarea
              value={other}
              onChange={(e) => setOther(e.target.value)}
              placeholder="내용을 입력해주세요." 
              required
            ></textarea>
          </div>
          {errors.other && <div className={styles.error}>{errors.other}</div>}

          <button onClick={complete} className={styles.Cbutton}>등록 완료</button>
        </form>
      </div>
      {showModal && (
        <Modal message="코치 등록이 완료되었습니다!" onClose={handleCloseModal} />
      )}
    </>
  );
}

export default App;