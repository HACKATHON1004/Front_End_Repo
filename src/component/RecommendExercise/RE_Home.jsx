import Back from "../Button/Back";
import styles from '../../cssModule/RE_Home.module.css'
import img1 from '../../images/yoga.svg'
import img2 from '../../images/rehabilitate.svg'
import img3 from '../../images/1.svg'
import { useNavigate } from "react-router-dom";

export default function RE_Home() {

    const navigate = useNavigate();

        const messages = [
          {
            id: 1,
            name: "민머시기",
            time: "2024-08-01",
            text: "안녕하세요. 무릎 관절이 안좋아져서 한동안 운동을 쉬다가 이번에 다시 운동을 해보고자 합니다.",
          },
          {
            id: 2,
            name: "민머시기",
            time: "2024-07-03",
            text: "안녕하세요. 무릎 관절이 안좋아져서 한동안 운동을 쉬다가 이번에 다시 운동을 해보고자 합니다.",
          },
          {
            id: 3,
            name: "민머시기",
            time: "2024-07-03",
            text: "안녕하세요. 무릎 관절이 안좋아져서 한동안 운동을 쉬다가 이번에 다시 운동을 해보고자 합니다.",
          },
        ];

    return (
        <>
            <Back/>
            <div className={styles.pageWrapper}>
                <div className={styles.recommendWrapper}>
                    <div className={styles.header}>
                        <div>이런 운동을 추천해요!</div>
                        <div>더보기</div>
                    </div>
                    <div className={styles.imageWrapper}>
                        <div className={styles.image}>
                            <img src={img1}/>
                            <div>쉽게 할 수 있는 스트레칭</div>
                        </div>
                        <div className={styles.image}>
                            <img src={img2}/>
                            <div>재활 운동</div>
                        </div>
                    </div>
                </div>
                <div onClick={navi} className={styles.coachWrapper}>
                    <div className={styles.header}>
                        <div>코치에게 물어보기</div>
                        <div>더보기</div>
                    </div>
                    <div className={styles.inquireWrapper}>
                        {messages.map((message) => (
                            <div key={message.id} className={styles.message}>
                                <div className={styles.profileWrapper}>
                                    <img src={img3} />
                                    <div className={styles.profile}>
                                        <div>{message.name}</div>
                                        <div>{message.time}</div>
                                    </div>  
                                </div>
                                <div className={styles.contentWrapper}>
                                    <div>{message.text}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}