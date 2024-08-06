import React, { useState, useEffect, useRef } from 'react';
import styles from '../../cssModule/myp.module.css';
import axios from 'axios';
import Back from '../Button/Back';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal';

function App() {
  const [nickname, setNickname] = useState('');
  const [idMessage, setIdMessage] = useState('');
  const nickRef = useRef();
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [disability, setDisability] = useState('');
  const [disabilityType, setDisabilityType] = useState('');
  const [limbDisability, setLimbDisability] = useState('');
  const [muscle, setMuscle] = useState(false);
  const [stretching, setStretching] = useState(false);
  const [ball, setBall] = useState(false);
  const [water, setWater] = useState(false);
  const [cardio, setCardio] = useState(false);
  const [intensity, setIntensity] = useState('');
  const [isGuardian, setIsGuardian] = useState(null);

  const [showModal, setShowModal] = useState(false); 
  const navigate = useNavigate();

  const handleSportsChange = (e) => {
    const { name, checked } = e.target;
    switch (name) {
      case 'muscle':
        setMuscle(checked);
        break;
      case 'stretching':
        setStretching(checked);
        break;
      case 'ball':
        setBall(checked);
        break;
      case 'water':
        setWater(checked);
        break;
      case 'cardio':
        setCardio(checked);
        break;
      default:
        break;
    }
  };

  const handleCheckboxChange = (value) => {
    setIsGuardian(value);
  };

  const handleIdCheck = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/userinfo/nickname/${nickRef.current.value}`);
      const data = await response.data;
         console.log(data);
      if (data===false) { 
        setIdMessage("이미 사용중인 닉네임입니다.");
        setIsIdChecked(false);
      } else {
        setIdMessage("사용 가능한 닉네임입니다.");
        setIsIdChecked(true);
      }
    } catch (error) {
      setIdMessage("오류가 발생했습니다. 다시 시도해주세요.");
      setIsIdChecked(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isIdChecked) {
      setIdMessage("닉네임 중복 확인을 해주세요.");
      return;
    }
    try {
      const token = Cookies.get('token');
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/userinfo`,
        {
          isGuardian,
          nickname,
          age,
          sex: gender,
          disabilityCF: disability,
          disabilityK: disabilityType,
          disabilityKK: limbDisability,
          muscle,
          stretching,
          ball,
          water,
          cardio,
          exerciseIntensity: intensity,
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


console.log(isGuardian)
console.log(nickname)
console.log( age)
console.log(gender)
console.log(disability)
console.log( disabilityType)
console.log( limbDisability)
console.log(muscle)
console.log(stretching)
console.log( ball)
console.log( water)
console.log(cardio)
console.log(intensity)

  const resetFormStates = () => {
    setNickname('');
    setAge('');
    setGender('');
    setDisability('');
    setDisabilityType('');
    setLimbDisability('');
    setMuscle(false);
    setStretching(false);
    setBall(false);
    setWater(false);
    setCardio(false);
    setIntensity('');
    setIdMessage('');
    setIsIdChecked(false);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.form}>
          <div className={styles.ParentWrapper}>
            <div className={styles.Parent}>본인은 보호자입니다.</div>
            <div className={styles.trueandfalse}>
              <div className={styles.viewWrapper}>
                <input
                  className={styles.Checkbox}
                  type="checkbox"
                  checked={isGuardian === true}
                  onChange={() => handleCheckboxChange(true)}
                />
                <div className={styles.Saw}>네</div>
              </div>
              <div className={styles.viewWrapper}>
                <input
                  className={styles.Checkbox}
                  type="checkbox"
                  checked={isGuardian === false}
                  onChange={() => handleCheckboxChange(false)}
                />
                <div className={styles.Saw}>아니요</div>
              </div>
            </div>
          </div>
          
          <div className={styles.Nickname}>
            <div className={styles.Nlabel}>닉네임을 입력해주세요</div>
            <input
              ref={nickRef}
              type="text"
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
                setIdMessage('');
                setIsIdChecked(false);
              }}
            />
            <div className={styles.NWrapper}>
              <div className={isIdChecked?styles.successId:styles.idMessage}>
                {idMessage && <p>{idMessage}</p>}
              </div>
              <div className={styles.ViewNWapper}>
                <button type="button" className={styles.confirmButton} onClick={handleIdCheck}>중복확인</button>
              </div>
            </div>
          </div>

          <div className={styles.Alabel}>나이를 입력해주세요</div>
          <input
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <div className={styles.Glabel}>성별을 선택해주세요</div>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">성별</option>
            <option value="남성">남성</option>
            <option value="여성">여성</option>
          </select>

          <div className={styles.Dlabel}>장애 분류</div>
          <div className={styles.disableWrapper}>
            <select
              value={disability}
              onChange={(e) => {
                setDisability(e.target.value);
                setDisabilityType('');
                setLimbDisability('');
              }}
            >
              <option value="">장애 분류</option>
              <option value="정신적 장애">정신적 장애</option>
              <option value="신체적 장애">신체적 장애</option>
            </select>

            {disability === '신체적 장애' && (
              <>
                <select
                  value={disabilityType}
                  onChange={(e) => {
                    setDisabilityType(e.target.value);
                    setLimbDisability('');
                  }}
                >
                  <option value="">장애 종류</option>
                  <option value="상지 장애">상지 장애</option>
                  <option value="하지 장애">하지 장애</option>
                  <option value="척추 장애">척추 장애</option>
                  <option value="심장 장애">심장 장애</option>
                  <option value="변형 장애">변형 장애</option>
                  <option value="청각 장애">청각 장애</option>
                  <option value="시각 장애">시각 장애</option>
                </select>
              </>
            )}

            {(disabilityType === '상지 장애' || disabilityType === '하지 장애') && (
              <select
                value={limbDisability}
                onChange={(e) => setLimbDisability(e.target.value)}
              >
                <option value="">{disabilityType === '상지 장애' ? '상지 종류' : '하지 종류'}</option>
                <option value="절단">절단</option>
                <option value="기능">기능</option>
                <option value="관절">관절</option>
              </select>
            )}
          </div>

          <div className={styles.Llabel}>좋아하는 운동 종류를 선택해주세요</div>
          <div className={styles.pentagon}>
            <div className={styles.checkGroup}>
              <label>
                <input
                  type="checkbox"
                  name="muscle"
                  checked={muscle}
                  onChange={handleSportsChange}
                />
                <span>근력</span>
              </label>
              <label>
                <input
                  type="checkbox"
                  name="stretching"
                  checked={stretching}
                  onChange={handleSportsChange}
                />
                <span>유연성</span>
              </label>
              <label>
                <input
                  type="checkbox"
                  name="ball"
                  checked={ball}
                  onChange={handleSportsChange}
                />
                <span>구기</span>
              </label>
              <label>
                <input
                  type="checkbox"
                  name="water"
                  checked={water}
                  onChange={handleSportsChange}
                />
                <span>수상운동</span>
              </label>
              <label>
                <input
                  type="checkbox"
                  name="cardio"
                  checked={cardio}
                  onChange={handleSportsChange}
                />
                <span>유산소</span>
              </label>
            </div>
          </div>

          <div className={styles.Wlabel}>원하는 운동 강도를 선택해주세요</div>
          <select
            value={intensity}
            onChange={(e) => setIntensity(e.target.value)}
          >
            <option value="">운동 강도</option>
            <option value="고강도">고강도</option>
            <option value="저강도">저강도</option>
          </select>

          <button onClick={handleSubmit} className={styles.button}>등록 완료</button>
        </div>
      </div>
      {showModal && (
        <Modal message="등록이 완료되었습니다!" onClose={handleCloseModal} />
      )}
    </>
  );
}
export default App;