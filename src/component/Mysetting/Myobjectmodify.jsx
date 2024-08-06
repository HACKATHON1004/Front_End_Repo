import React, { useState, useEffect, useRef } from 'react';
import styles from '../../cssModule/mypmodify.module.css';
import axios from 'axios';  
import Back from '../Button/Back';
import Cookies from 'js-cookie'; 
import { useNavigate } from 'react-router-dom'; 
import Modal from '../Modal';

function App() {
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [nicknameMessage, setNicknameMessage] = useState('');
  const nickRef = useRef();
  const [nicknameErrorMessage, setNicknameErrorMessage] = useState('');
  const [disability, setDisability] = useState('');
  const [disabilityType, setDisabilityType] = useState('');
  const [limbDisability, setLimbDisability] = useState('');
  const [favoriteSport, setFavoriteSport] = useState({
    muscle: false,
    cardio: false,
    stretching: false,
    water: false,
    ball: false,
  });
  const [intensity, setIntensity] = useState('');
  const [nickname, setNickname] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [isGuardian, setIsGuardian] = useState(false); 
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate(); 
  const isCoach = Cookies.get("isCoach");

  useEffect(() => {
    
    const fetchUserInfo = async () => {
      try {
        const token = Cookies.get('token');
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/userinfo/username`, {
          headers: {
            Authorization: `${token}`,
          },
        });

        const userInfo = response.data;
        setNickname(userInfo.nickname);
        setAge(userInfo.age);
        setGender(userInfo.sex);
        setDisability(userInfo.disabilityCF);
        setDisabilityType(userInfo.disabilityK);
        setLimbDisability(userInfo.disabilityKK);
        setFavoriteSport({
          muscle: userInfo.muscle,
          cardio: userInfo.cardio,
          stretching: userInfo.stretching,
          water: userInfo.water,
          ball: userInfo.ball,
        });
        setIntensity(userInfo.exerciseIntensity);
        setIsGuardian(userInfo.isGuardian);
      } catch (error) {
        console.error('사용자 정보 가져오기 실패:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleNicknameCheck = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/userinfo/nickname/${nickRef.current.value}`);
      const data = await response.data;
      console.log(data);
      if (data===false) {
        setNicknameMessage('이미 사용중인 닉네임입니다.');
        setIsNicknameChecked(false);
      } else {
        setNicknameMessage('사용 가능한 닉네임입니다.');
        setIsNicknameChecked(true);
      }
    } catch (error) {
      setNicknameMessage('오류가 발생했습니다. 다시 시도해주세요.');
      setIsNicknameChecked(false);
    }
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFavoriteSport((prevSports) => ({
      ...prevSports,
      [name]: checked,
    }));
  };

  const handleAgeChange = (event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      setAge(value);
    }
  };

  const handleSubmit = async () => {
    setNicknameErrorMessage('');
    setNicknameMessage('');

    if (!isNicknameChecked) {
      setNicknameErrorMessage('닉네임 중복확인을 해주세요.');
      return;
    }

    try {
      const token = Cookies.get('token');
      const response = await axios.patch(`${import.meta.env.VITE_SERVER_URL}/userinfo`, {
        nickname,
        age,
        sex: gender,
        disabilityCF: disability,
        disabilityK: disabilityType,
        disabilityKK: limbDisability,
        muscle: favoriteSport.muscle,
        cardio: favoriteSport.cardio,
        stretching: favoriteSport.stretching,
        water: favoriteSport.water,
        ball: favoriteSport.ball,
        exerciseIntensity: intensity,
        isGuardian: isGuardian,
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        }
      });

      if (response.status === 200) {
        console.log('수정 성공');
        setShowModal(true);
      } else {
        console.log('수정 실패');
      }
    } catch (error) {
      console.error('서버 요청 실패:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/home');
  };

  return (
    <>
    <Back /> 
    <div className={styles.Modifycontainer}>
      <div className={styles.Form}>
        <div className={styles.NWapper}>
          <div className={styles.Nmodify}>닉네임</div>
          <div className={styles.Ninput}>
            <input
              ref={nickRef}
              type="text"
              value={nickname}
              onChange={(e) => {setNickname(e.target.value); setIsNicknameChecked(false)}}
              className={styles.NinputField}
            />
            <div className={styles.NBwapper}>
              <div className={isNicknameChecked?styles.Nsuccess2:styles.Nsuccess}>{nicknameMessage!==''?nicknameMessage:nicknameErrorMessage}</div>
              <button className={styles.NButton} onClick={handleNicknameCheck}>중복확인</button>
            </div>
          </div>
        </div>

        <div className={styles.AWapper}>
          <div className={styles.Amodify}>나이</div>
          <div className={styles.Ainput}>
            <input
              type="text"
              value={age}
              onChange={handleAgeChange}
              className={styles.AinputField}
            />
          </div>
        </div>

        <div className={styles.GWapper}>
          <div className={styles.Gender}>성별</div>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className={styles.Gselect}
          >
            <option value="">성별 선택</option>
            <option value="남성">남성</option>
            <option value="여성">여성</option>
          </select>
        </div>

        <div className={styles.DWapper}>
          <div className={styles.Dis}>장애 분류</div>
          <div className={styles.DisWapper}>
            <select
              value={disability}
              onChange={(e) => {
                setDisability(e.target.value);
                setDisabilityType('');
                setLimbDisability('');
              }}
              className={styles.Dselect}
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
                  className={styles.Dselect}
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
                className={styles.Dselect}
              >
                <option value="">{disabilityType === '상지 장애' ? '상지 종류' : '하지 종류'}</option>
                <option value="절단">절단</option>
                <option value="기능">기능</option>
                <option value="관절">관절</option>
              </select>
            )}
          </div>
        </div>

        <div className={styles.FSWapper}>
          <div className={styles.FSport}>좋아하는 운동 종류를 선택해주세요</div>
          <div className={styles.FSportselect}>
            <label>
              <input
                type="checkbox"
                name="muscle"
                checked={favoriteSport.muscle}
                onChange={handleCheckboxChange}
              />
              근력
            </label>
            <label>
              <input
                type="checkbox"
                name="cardio"
                checked={favoriteSport.cardio}
                onChange={handleCheckboxChange}
              />
              유산소
            </label>
            <label>
              <input
                type="checkbox"
                name="stretching"
                checked={favoriteSport.stretching}
                onChange={handleCheckboxChange}
              />
              유연성
            </label>
            <label>
              <input
                type="checkbox"
                name="water"
                checked={favoriteSport.water}
                onChange={handleCheckboxChange}
              />
              수상운동
            </label>
            <label>
              <input
                type="checkbox"
                name="ball"
                checked={favoriteSport.ball}
                onChange={handleCheckboxChange}
              />
              구기
            </label>
          </div>
        </div>

        <div className={styles.WSWapper}>
          <div className={styles.WSport}>원하는 운동 강도를 선택해주세요</div>
          <select
            value={intensity}
            onChange={(e) => setIntensity(e.target.value)}
            className={styles.WSportselect}
          >
            <option value="">운동 강도</option>
            <option value="저강도">저강도</option>
            <option value="고강도">고강도</option>
          </select>
        </div>

        <div className={styles.PWapper}>
          <div className={styles.Parent}>보호자 여부를 선택해주세요</div>
          <select
            value={isGuardian}
            onChange={(e) => setIsGuardian(e.target.value)}
            className={styles.guardianselect}
          >
            <option value="">선택</option>
            <option value="true">O</option>
            <option value="false">X</option>
          </select>
        </div>

        <div className={styles.modifyWapper}>
          <button className={styles.modifyButton} onClick={handleSubmit}>수정하기</button>
        </div>
        {showModal && (
          <Modal message="수정이 완료되었습니다!" onClose={handleCloseModal} />
        )}
      </div>
    </div>
    </>
  );
}

export default App;