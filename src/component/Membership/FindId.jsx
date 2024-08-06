import React, { useState } from 'react';
import '../../App.css';
import Back from '../Button/Back';
import Modal from '../Modal';
import { useNavigate } from 'react-router-dom';

export default function FindId() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [identify, setIdentify] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [returnChecked, setReturnChecked] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [idMessage, setIdMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatchMessage, setPasswordMatchMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const [isIdChecked, setIsIdChecked] = useState(false);

  const [errorMessages, setErrorMessages] = useState({
    name: "",
    email: "",
    identify: "",
    password: "",
    confirmPassword: "",
  });

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const returnCheckboxChange = () => {
    setReturnChecked(!returnChecked);
  };

  const handleIdCheck = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/${identify}`);
      const data = await response.json();
      console.log(data);
      if (!data) {
        setIdMessage("이미 사용중인 아이디입니다.");
        setIsIdChecked(false);
      } else {
        setIdMessage("사용 가능한 아이디입니다.");
        setIsIdChecked(true);
      }
    } catch (error) {
      setIdMessage("오류가 발생했습니다. 다시 시도해주세요.");
      setIsIdChecked(false);
    }
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    let message = "";

    if (password.length < minLength) {
      message = `비밀번호는 ${minLength}자 이상이어야 합니다.`;
    } else if (!hasSpecialChar) {
      message = "비밀번호는 특수문자를 포함해야 합니다.";
    }

    return message;
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const validationMessage = validatePassword(newPassword);
    setPasswordErrorMessage(validationMessage);
    checkPasswordMatch(newPassword, confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    checkPasswordMatch(password, newConfirmPassword);
  };

  const checkPasswordMatch = (password, confirmPassword) => {
    if (password === confirmPassword && password.length > 0) {
      setPasswordMatchMessage("비밀번호가 일치합니다.");
    } else if (password.length > 0 || confirmPassword.length > 0) {
      setPasswordMatchMessage("비밀번호가 일치하지 않습니다.");
    } else {
      setPasswordMatchMessage("");
    }
  };

  const complete = async () => {
    const errors = {
      name: "",
      email: "",
      identify: "",
      password: "",
      confirmPassword: "",
    };

    if (!name) {
      errors.name = "이름을 입력해주세요.";
    }
    if (!email) {
      errors.email = "이메일을 입력해주세요.";
    }

    if (Object.values(errors).some(error => error !== "")) {
      setErrorMessages(errors);
    } else {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            username: identify,
            password,
          }),
        });

        if (response.ok) {
          setShowModal(true);
        } else {
          const errorData = await response.json();
          console.error('Registration failed:', errorData);
          setIdMessage('회원가입에 실패했습니다. 다시 시도해주세요.');
        }
      } catch (error) {
        console.error('Error:', error);
        setIdMessage('회원가입에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  return (
    <div className="Container">
      <Back/>
      <div className="Form">
        <div className='Name'>
          <p className="NLabel">이름을 입력해주세요</p>
          <input
            className="Input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errorMessages.name && <p className="ErrorMessage">{errorMessages.name}</p>}
        </div>

       <div className='Email'>
        <p className="ELabel">이메일을 입력해주세요</p>
          <input
            className="Input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errorMessages.email && <p className="ErrorMessage">{errorMessages.email}</p>}
       </div>
        <div className='Membershipbutton'>
          <button className="Button" onClick={complete}>아이디 찾기</button>
        </div>
      </div>
      {showModal&&
        <Modal
        message={`회원님의 id는 "${userId}" 입니다.`}
        onClose={()=>{setShowModal(false); navigate('/');}}
        />
      }
      {showModal2&&
        <Modal
        message="정보가 일치하지 않습니다."
        onClose={()=>{setShowModal(false); navigate('/');}}
        />
      }
    </div>
  );
}