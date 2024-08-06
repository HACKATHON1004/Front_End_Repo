import axios from "axios"
import imgLogin from "../images/1.svg"
import imgId from "../images/2.svg"
import imgPw from "../images/3.svg"
import naverLogin from "../images/5.svg"
import googleLogin from "../images/4.svg"
import Modal from "./Modal"
import styles from "../cssModule/login.module.css"
import { useEffect, useRef, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import cookie from "js-cookie";

export default function Login(){
  const idRef = useRef();
  const pwRef = useRef();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const formData = new FormData();
  const [param] = useSearchParams();
    
    useEffect(()=>{
        const token = param.get("code");
        console.log(token);
        cookie.set("token", token);

        if(token){
          navigate('home');
        }
    }, [])

    useEffect(()=>{
      const token = localStorage.getItem("token");
      console.log(localStorage.getItem("token"));
      if(token!=="null"&&token){
        cookie.set("token", token);
        navigate('home');
      }
    }, [])

  const naverUrl = import.meta.env.VITE_NAVER_LOGIN_URL || process.env.REACT_APP_NAVER_LOGIN_URL;
  const googleUrl = import.meta.env.VITE_GOOGLE_LOGIN_URL || process.env.REACT_APP_GOOGLE_LOGIN_URL;

  const handleToggle = () => {
    setIsActive(!isActive); // 상태를 토글합니다.
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  function handleNaverLogin(){
    console.log("naver login");

    window.location.href = naverUrl;
    //네이버로그인 처리
  }

  function handleGoogleLogin(){
    //구글로그인 처리
    
    window.location.href = googleUrl;
    
  }

  function handleLogin(){
    formData.append('username', idRef.current.value);
    formData.append('password', pwRef.current.value);
    
    axios.post((`${import.meta.env.VITE_SERVER_URL}/user/login`),formData,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(async res=>{
        console.log(res.status);
        if(res.status===200) {
          console.log(res.headers.get('Authorization'));
          console.log(res.data.email);
          console.log(res.data);
          navigate('/home');
          if(isActive){
            localStorage.setItem("token", res.headers.get('Authorization'));
            cookie.set("token", localStorage.getItem("token"));
          }
          cookie.set("token", res.headers.get('Authorization'));
        } else {
          setShowModal(true);
        }
      })
      .catch(err=>{
        setShowModal(true);
      })
  }
  
  return (
    <div className={styles.loginPageWrapper}>
      <div className={styles.imgWrapper}>
        <img src={imgLogin} className={styles.imgLogin} alt="Login" />
      </div>
      <div className={styles.loginText}>
        <div>Login</div>
      </div>
      <div className={styles.inputContainer}>
        <img src={imgId} alt="ID Icon" />
        <div>ID</div>
        <input type="text" id="id" ref={idRef} placeholder="ID를 입력하세요" />
      </div>
      <div className={styles.inputContainer}>
        <img src={imgPw} alt="Password Icon" />
        <div>PW</div>
        <input type="password" id="password" ref={pwRef} placeholder="비밀번호를 입력하세요" />
      </div>
      <div className={styles.optionsContainer}>
        <div className={styles.links}>
          <span onClick={()=>navigate('/findId')}>아이디 찾기</span>
        </div>
        <div className={styles.toggleContainer}>
          <div className={styles.toggleText}>자동 로그인</div>
          <div className={`${styles.toggle} ${isActive ? styles.active : ''}`} id="toggle" onClick={handleToggle}></div>
        </div>
      </div>
      <div>
        <button className={styles.loginBtn} onClick={handleLogin}>로그인</button>
      </div>
      <div>
        <button onClick={()=>{navigate("/signUp")}} className={styles.loginBtn}>회원가입</button>
      </div>
      <div className={styles.easyLogin}>
        <div className={styles.line}></div>
        <span className={styles.easyLoginText}>간편 로그인</span>
        <div className={styles.line}></div>
      </div>
      <div style={{ marginBottom: "6px" }}>
        <img onClick={handleNaverLogin} src={naverLogin} className={styles.imgSocial} alt="Naver Login" />
      </div>
      <div>
        <img onClick={handleGoogleLogin} src={googleLogin} className={styles.imgSocial} alt="Google Login" />
      </div>
      {showModal && (
        <Modal
          message="아이디나 비밀번호가 올바르지 않습니다."
          onClose={handleCloseModal}
        />
      )}
    </div>  
  )
}