import React, { useState, useRef } from 'react';
import styles from '../../cssModule/myp.module.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal';

export default function IsCoach() {
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
    if (value === true) {
      navigate('/coachObject');
    } else if (value === false) {
      navigate('/Myobject');
    }
  };

  const handleIdCheck = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/userinfo/nickname/${nickRef.current.value}`);
      const data = await response.data;
      console.log(data);
      if (data === false) { 
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
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/userinfo`, {
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
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        }
      });

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
            <div className={styles.Parent}>본인은 코치입니다.</div>
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
        </div>
      </div>
      {showModal && (
        <Modal message="등록이 완료되었습니다!" onClose={handleCloseModal} />
      )}
    </>
  );
}
