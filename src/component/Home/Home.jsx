import styles from '../../cssModule/home.module.css'
import userCard from '../../images/user.svg'
import Back from '../Button/Back.jsx'
import axios from "axios"
import img1 from '../../images/exercise.svg'
import img2 from '../../images/cal.svg'
import img3 from '../../images/people.svg'
import img4 from '../../images/setting.svg'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import cookies from 'js-cookie'

export default function Home() {
    // const isGuardian = axios.get("");
    const isGuardian = false;
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({});

    useEffect(()=>{
        axios.post(`${import.meta.env.VITE_SERVER_URL}/user/isCoach`,null,{
            headers: {
                Authorization: cookies.get("token")
            }
        })
            .then((res)=>{
                if(res.data===true){
                    cookies.set("isCoach", res.data);
                    axios.get(`${import.meta.env.VITE_SERVER_URL}/coachinfo/username`,{
                        headers: {
                            Authorization: cookies.get("token")
                        }
                    })
                        .then(res=>{
                            setUserInfo(res.data);
                        })
                }
                else {
                    axios.post(`${import.meta.env.VITE_SERVER_URL}/user/isFirstLogin`,null,{
                        headers: {
                            Authorization: cookies.get("token")
                        }
                    })
                        .then(res=>{
                            if(res.data===true){
                                navigate('/isCoach');
                            }
                            else {
                                axios.get(`${import.meta.env.VITE_SERVER_URL}/userinfo/username`,{
                                    headers: {
                                        Authorization: cookies.get("token")
                                    }
                                })
                                    .then(res=>{
                                        setUserInfo(res.data);
                                    })
                            }
                        })
                }
            })
    }, [])

    function handleLink(linkName) {
        navigate(`/${linkName}`);
    }

    return (
    <>
        <div className={styles.pageWrapper}>
            <div className={styles.header}>
                <span>{userInfo&&userInfo.isGuardian?userInfo.nickname:userInfo.name} </span>
                {userInfo&&userInfo.career?<span>코치</span>:(userInfo.isGuardian?<span>보호자</span>:<>{userInfo.nickname}</>)}
                <span>님 환영합니다!</span>
            </div>
            <div className={styles.infoWrapper}>
                <div className={styles.imgWrapper}>
                    <img src={userCard}/>
                </div>
                {userInfo&&userInfo.career?
                (
                    <div className={styles.tableWrapper2}>
                    <div>
                        <span>나이</span>
                        <span>{userInfo.age}</span>
                    </div>
                    <div>
                        <span>성별</span>
                        <span>{userInfo.sex==="남성"?"남성":"여성"}</span>
                    </div>
                    <div>
                        <span>PT 자격증</span>
                        <span>{userInfo.normalLicense}</span>
                    </div>
                    <div>
                        <span>지도사 자격증</span>
                        <span>{userInfo.sportsLicense}</span>
                    </div>
                    <div>
                        <span>CPR 자격증</span>
                        <span>{userInfo.cprLicense}</span>
                    </div>
                </div>
                ):
                (<div className={styles.tableWrapper}>
                    <div>
                        <span>ID</span>
                        <span>{userInfo.username}</span>
                    </div>
                    <div>
                        <span>나이</span>
                        <span>{userInfo.age}세</span>
                    </div>
                    <div>
                        <span>성별</span>
                        <span>{userInfo.sex==="남성"?"남성":"여성"}</span>
                    </div>
                    <div>
                        <span>장애분류</span>
                        <span>{userInfo.disabilityCF}</span>
                    </div>
                    <div>
                        <span>선호하는 운동 강도</span>
                        <span>{userInfo.exerciseIntensity}</span>
                    </div>
                </div>)}
            </div>
            <div className={styles.menuWrapper}>
                <div onClick={()=>handleLink("findMapHome")}>
                    <img src={img1}/>
                    <span>맞춤 운동</span>
                </div>
                <div onClick={()=>handleLink("calendar")}>
                    <img src={img2}/>
                    <span>캘린더</span>
                </div>
                <div onClick={()=>handleLink("communityHome")}>
                    <img src={img3}/>
                    <span>커뮤니티</span>
                </div>
                <div onClick={()=>handleLink("Mysettings")}>
                    <img src={img4}/>
                    <span>설정</span>
                </div>
            </div>
        </div>
    </>
    )
}