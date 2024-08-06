import React, { useState, useEffect } from 'react';
import Back from '../Button/Back';
import styles from '../../cssModule/calendar.module.css';
import left from '../../images/left.svg';
import right from '../../images/right.svg';
import cookie from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [dataPlan, setDataPlan] = useState([]);
    const [planDates, setPlanDates] = useState([]);
    const [dataDate, setDataDate] = useState([]);
    const navigate = useNavigate();
    console.log(dataPlan);

    useEffect(() => {
        // Fetch dataDate
        axios.get(`${import.meta.env.VITE_SERVER_URL}/calendar`, {
            headers: { 
                Authorization: cookie.get("token")
            }
        })
        .then((res) => {
            const dates = res.data.map(item => item.slice(0, 10));
            setDataDate(dates);
        })
        .catch(error => {
            console.error("Error fetching calendar data", error);
        });
    }, []);

    useEffect(() => {
        const parsedDates = dataDate.map(date => new Date(date));
        setPlanDates(parsedDates);
    }, [dataDate]);

    function isHilighted(day) {
        return planDates.some(planDate => 
            planDate.getFullYear() === currentDate.getFullYear() &&
            planDate.getMonth() === currentDate.getMonth() &&
            planDate.getDate() === day
        );
    }

    function fetchPlans(day) {
        // Fetch planData
        // axios.get(`${import.meta.env.VITE_SERVER_URL}/calendar/eventTime/${}`)
        const parsedDay = day>=10 ? day : '0'+day;
        const month = (currentDate.getMonth()+1)>=10 ? currentDate.getMonth()+1 : "0"+(currentDate.getMonth()+1);
        const date = currentDate.getFullYear().toString()+"-"+month+"-"+parsedDay;
        console.log(date);
        
        axios.get(`${import.meta.env.VITE_SERVER_URL}/calendar/eventTime/${date}`,{
            headers: {
                Authorization: cookie.get("token")
            }
        })
            .then((res)=>{
                setDataPlan(res.data);
            })

        // const dataPlan = [
        //     {
        //         startTime: "10:00",
        //         endTime: "12:00",
        //         planName: "000 정기모임"
        //     },
        //     {
        //         startTime: "13:00",
        //         endTime: "15:00",
        //         planName: "@@@ 정기모임"
        //     },
        //     {
        //         startTime: "17:00",
        //         endTime: "19:00",
        //         planName: "000 회식"
        //     }
        // ];

        // setDataPlan(dataPlan);
    }

    const daysInMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
    ).getDate();

    const firstDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
    ).getDay();

    const days = [];

    // 이전 달의 일자를 채움
    const prevMonthDays = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        0
    ).getDate();

    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
        days.push(
            <div className={styles.day + ' ' + styles.otherMonth} key={`prev-${i}`}>
                {prevMonthDays - i}
            </div>
        );
    }

    // 현재 달의 일자를 채움
    for (let i = 1; i <= daysInMonth; i++) {
        const classes = isHilighted(i) ? styles.currentDay : styles.day;
        days.push(
            <div to="/" onClick={()=>fetchPlans(i)} className={classes} key={i}>
                {i}
            </div>
        );
    }

    // 다음 달의 일자를 채움
    const totalDays = days.length;
    for (let i = 1; i <= 42 - totalDays; i++) {
        days.push(
            <div className={styles.day + ' ' + styles.otherMonth} key={`next-${i}`}>
                {i}
            </div>
        );
    }

    return (
        <>
            <Back />
            <div className={styles.pageWrapper}>
                <div className={styles.calendar}>
                    <div className={styles.up}>
                        <img src={left} onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))} />
                        <span>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
                        <img src={right} onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))} />
                    </div>
                    <div className={styles.days}>
                        <div className={styles.dayName}>일</div>
                        <div className={styles.dayName}>월</div>
                        <div className={styles.dayName}>화</div>
                        <div className={styles.dayName}>수</div>
                        <div className={styles.dayName}>목</div>
                        <div className={styles.dayName}>금</div>
                        <div className={styles.dayName}>토</div>
                        {days}
                    </div>
                </div>
                <div className={styles.planList}>
                    {dataPlan.map((data, index) => (
                        <div onClick={()=>navigate(`/calendar/plan/${data.id}`)} key={index} className={styles.plan}>
                            <div>
                                <span>{data.eventTime.slice(11)} </span>
                            </div>
                            <div>
                                <span>{data.title}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
