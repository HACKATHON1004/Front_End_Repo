import { useEffect, useState, useRef } from 'react';
import styles from '../../cssModule/post.module.css';
import is from '../../images/1.svg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function PostList({ field, eventTime, type }) {
  const [posts, setPosts] = useState([]);
  const isFirstRender = useRef(true);
  const navigate = useNavigate();
  console.log(eventTime);
  console.log(posts);

  useEffect(() => {
    const today = new Date(); // 오늘 날짜 객체 생성

    const filterOldPosts = (data) => {
      return data.filter((post) => {
        const date = post.eventTime.split("-").join(" ");
        const postDate = new Date(date);
        console.log("fetched id: ", post.id);
        console.log(postDate);
        console.log(today);
        console.log("만든시간:", post.createDate);
        return postDate >= today; // 오늘보다 이후의 날짜인지 확인
      });
    };

    if (!type) {
      if (isFirstRender.current) {
        axios.get(`${import.meta.env.VITE_SERVER_URL}/recruit`)
          .then(res => {
            const filteredPosts = filterOldPosts(res.data);
            filteredPosts.reverse(); // 배열을 역순으로 변환
            setPosts(filteredPosts);
            isFirstRender.current = false;
          })
          .catch(err => {
            console.error(err);
          });
      } else {
        axios.get(`${import.meta.env.VITE_SERVER_URL}/recruit/eventTime/${eventTime}`)
          .then(res => {
            const filteredPosts = filterOldPosts(res.data);
            filteredPosts.reverse(); // 배열을 역순으로 변환
            setPosts(filteredPosts);
          })
          .catch(err => {
            console.error(err);
          });
      }
    } else {
      axios.get(`${import.meta.env.VITE_SERVER_URL}/free`)
        .then(res => {
          const reversedPosts = res.data.reverse(); // 배열을 역순으로 변환
          setPosts(reversedPosts);
        })
        .catch(err => {
          console.error(err);
        });
    }
  }, [eventTime, type]);

  return (
    <>
      <div className={styles.tableHead}>
        <div>제목</div>
        <div>글쓴이</div>
        <div>날짜</div>
        <div>조회</div>
        <div>{field}</div>
      </div>
      {posts.map((item, index) => {
        console.log(item.id);
        return (
          <div onClick={() => navigate(`post/${item.id}`)} key={item.id} className={styles.tableBody}>
            <div className={styles.tableHead} key={index}>
              <div>{item.title}</div>
              <div className={styles.author}>
                <div><img style={{ height: "29px", width: "29px" }} src={is} /></div>
                <div style={{ width: "36px" }}>{item.username}</div>
              </div>
              <div>{item.createDate.slice(2, 10)}</div>
              <div>{item.view}</div>
              <div>{field === "추천" ? item.totalRecommend : item.totalRecruit? item.currentRecruit + "/" + item.totalRecruit :item.currentRecruit +"/" + "∞"}</div>
            </div>
          </div>
        );
      })}
    </>
  );
}
