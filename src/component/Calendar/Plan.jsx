import Back from "../Button/Back";
import styles from "../../cssModule/plan.module.css"
import exImg from '../../images/exImg.svg'
import Modal2 from "../Modal2";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import cookie from 'js-cookie'
import Modal from "../Modal";

export default function Plan() {
    const param = useParams();
    const eventId = param.id;
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [current, setCurrent] = useState('');
    const [total, setTotal] = useState('');
    const memoRef = useRef();
    const [eventData, setEventData] = useState({});
    const navigate = useNavigate();
    const [phone, setPhone] = useState('');
    console.log(phone);
    console.log(eventData);

    function handleDelete() {
        setShowModal(true);
    }

    function handleCloseModal() {
        setShowModal(false);
    }

    function handlePlanDelete() {
        axios.delete(`${import.meta.env.VITE_SERVER_URL}/calendar/${eventData.id}`, {
            headers: {
                Authorization: cookie.get("token")
            }
        })
            .then(()=>{     
                setShowModal(false);
                setShowModal2(true);
            })
    }

    useEffect(() => {
        // 마운트 시 실행되는 코드
        axios.get(`${import.meta.env.VITE_SERVER_URL}/calendar/${eventId}`,{
            headers: {
                Authorization: cookie.get("token")
            }
        })
            .then(res=>{
                memoRef.current.value=res.data.content;
                axios.get(`${import.meta.env.VITE_SERVER_URL}/recruit/${res.data.recruitPostId}`, {
                    headers: {
                        Authorization: cookie.get("token")
                    }
                })
                    .then(res=>{
                        setPhone(res.data.phone);
                        setCurrent(res.data.currentRecruit);
                        setTotal(res.data.totalRecruit);
                    })
                setEventData(res.data);
            })
    
        return () => {
          // 종료 직전에 실행되는 코드
          console.log('컴포넌트가 종료됩니다.');
        };
    }, []);

    useEffect(() => {
        const handleMemoChange = () => {
            const memoValue = memoRef.current.value;
            axios.patch(`${import.meta.env.VITE_SERVER_URL}/calendar/${eventId}`, {
                content: memoRef.current.value
            }, {
                headers: {
                    Authorization: cookie.get("token")
                }
            })
            .then(response => {
                console.log("Memo saved:", response.data);
            })
            .catch(error => {
                console.error("Error saving memo:", error);
            });
        };

        const textarea = memoRef.current;
        textarea.addEventListener('input', handleMemoChange);

        return () => {
            textarea.removeEventListener('input', handleMemoChange);
        };
    }, [eventId]);

    return (
        <>
            <Back/>
            <div className={styles.pageWrapper}>
                <div className={styles.date}>{eventData.eventTime&&eventData.eventTime.slice(0,10)}</div>
                <div className={styles.planName}>{eventData.title}</div>
                <div className={styles.detailHeader}>이벤트 세부사항</div>
                <div className={styles.detailWrapper}>
                    <img src={exImg}/>
                    <div className={styles.address}>{eventData.location}</div>
                    <div className={styles.tableWrapper}>
                        <div>
                            <span>시간</span>
                            <span>{eventData.eventTime&&eventData.eventTime.slice(11)} </span>
                        </div>
                        <div>
                            <span>주최자 연락처</span>
                            <span>{phone}</span>
                        </div>
                        <div>
                            <span>인원 수</span>
                            <span>{current}/{total?total:"∞"}</span>
                        </div>
                    </div>
                </div>
                <div className={styles.memoWrapper}>
                    <div className={styles.labelWrapper}>
                        <span>메모</span>
                    </div>
                    <div className={styles.memo}>
                        <textarea ref={memoRef}/>
                    </div>
                </div>
                <div className={styles.btnWrapper}>
                    <button onClick={handleDelete}>이벤트 삭제</button>
                </div>
                {showModal && (
                    <Modal2
                        message="삭제 하시겠습니까?"
                        onClose={handleCloseModal}
                        onCheck={handlePlanDelete}
                    />
                )}
                {showModal2 && (
                    <Modal
                        message="이벤트가 삭제되었습니다."
                        onClose={()=>navigate(-1)}
                    />
                )}
            </div>
        </>
    )
}
