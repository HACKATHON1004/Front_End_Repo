import './App.css';
import Calendar from './component/Calendar/Calendar.jsx';
import Myobject from './component/Myobject/Myobject.jsx'
import Plan from './component/Calendar/Plan.jsx';
import Login from './component/Login.jsx';
import Mempage from './component/Membership/Mempage.jsx';
import Post from './component/Post/Post.jsx'
import PostWrite from './component/Post/PostWrite.jsx'
import PostContent from './component/Post/PostContent.jsx'
import RecruitPlacePost from './component/RecruitPlace/RecruitPlacePost.jsx';
import RecruitPlacePostWrite from './component/RecruitPlace/RecruitPlacePostWrite.jsx';
import RecruitPlaceHome from './component/RecruitPlace/RecruitPlaceHome.jsx';
import RecruitPlacePostContent from './component/RecruitPlace/RecruitPlacePostContent.jsx';
import FindPlace from './component/findPlace/findPlace.jsx';
import FP_Home from './component/findPlace/FP_Home.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './component/Home/Home.jsx';
import PlaceReview from './component/placeReview/PlaceReview.jsx';
import RE_Home from './component/RecommendExercise/RE_Home.jsx';
import PlaceReviewContent from './component/placeReview/PlaceReviewContent.jsx';
import Mysetting from './component/Mysetting/Mysetting.jsx';
import Myobjectmodify from './component/Mysetting/Myobjectmodify.jsx';
import ProtectedRoute from './ProtectedRoute'; // 새로 만든 ProtectedRoute 컴포넌트를 import
import Notice from './component/Mysetting/Notice.jsx'
import Passwordmodify from './component/Mysetting/Passwordmodify.jsx';
import ServiceIntro from './component/Mysetting/ServiceIntro.jsx';
import Inquire from './component/RecommendExercise/Inquire.jsx';
import InquirePost from './component/RecommendExercise/InquirePost.jsx';
import InquirePostContent from './component/RecommendExercise/InquirePostContent.jsx';
import FindId from './component/Membership/FindId.jsx';
import FindPw from './component/Membership/FindPw.jsx';
import IsCoach from './component/Myobject/IsCoach.jsx';
import CoachObject from './component/Myobject/CoachObject.jsx';
import AnswerPost from './component/RecommendExercise/AnswerPost.jsx';
import CoachObjectModify from './component/Mysetting/CoachObjectModify.jsx';

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/signUp' element={<Mempage/>}/>
          <Route path='/findId' element={<FindId/>}/>
          <Route path='/findPw' element={<FindPw/>}/>
          <Route path='/home' element={<ProtectedRoute element={<Home/>}/>}/>
          <Route path='/plan' element={<ProtectedRoute element={<Plan/>}/>}/>
          <Route path='/findMap' element={<ProtectedRoute element={<FindPlace/>}/>}/>
          <Route path='/inputUserInfo' element={<ProtectedRoute element={<Myobject/>}/>}/>
          <Route path='/findMapHome' element={<ProtectedRoute element={<FP_Home/>}/>}/>
          <Route path='/calendar' element={<ProtectedRoute element={<Calendar/>}/>}/>
          <Route path='/communityHome' element={<ProtectedRoute element={<RecruitPlaceHome/>}/>}/>
          <Route path='/recruitPlace' element={<ProtectedRoute element={<RecruitPlacePost/>}/>}/>
          <Route path='/postContent' element={<ProtectedRoute element={<PostContent/>}/>}/>
          <Route path='/freePost' element={<ProtectedRoute element={<Post/>}/>}/>
          <Route path='/recruitPlace_postContent' element={<ProtectedRoute element={<RecruitPlacePostContent/>}/>}/>
          <Route path='/recruitPlace/Post' element={<ProtectedRoute element={<RecruitPlacePostWrite/>}/>}/>
          <Route path='/recruitPlace/post/:id' element={<ProtectedRoute element={<RecruitPlacePostContent/>}/>}/>
          <Route path='/placeReview' element={<ProtectedRoute element={<PlaceReview/>}/>}/>
          <Route path='/RecommendExercise' element={<ProtectedRoute element={<RE_Home/>}/>}/>
          <Route path='/placeReview/:id' element={<ProtectedRoute element={<PlaceReviewContent/>}/>}/>
          <Route path='/freePost/post' element={<ProtectedRoute element={<PostWrite/>}/>}/>
          <Route path='/freePost/post/:id' element={<ProtectedRoute element={<PostContent/>}/>}/>
          <Route path='/calendar/plan/:id' element={<ProtectedRoute element={<Plan/>}/>}/>
          <Route path='/Myobject' element={<ProtectedRoute element={<Myobject/>}/>}/>
          <Route path='/Mysettings' element={<ProtectedRoute element={<Mysetting/>}/>}/>
          <Route path='/modifyUserInfo' element={<ProtectedRoute element={<Myobjectmodify/>}/>}/>
          <Route path='/notice' element={<ProtectedRoute element={<Notice/>}/>}/>
          <Route path='/passwordChange' element={<ProtectedRoute element={<Passwordmodify/>}/>}/>
          <Route path='/serviceIntro' element={<ProtectedRoute element={<ServiceIntro/>}/>}/> 
          <Route path='/inquire' element={<ProtectedRoute element={<Inquire/>}/>}/>
          <Route path='/inquire/post' element={<ProtectedRoute element={<InquirePost/>}/>}/>
          <Route path='/inquire/post/:id' element={<ProtectedRoute element={<InquirePostContent/>}/>}/>
          <Route path='/isCoach' element={<ProtectedRoute element={<IsCoach/>}/>}/>
          <Route path='/coachObject' element={<ProtectedRoute element={<CoachObject/>}/>}/>
          <Route path='/inquire/answer' element={<ProtectedRoute element={<AnswerPost/>}/>}/>
          <Route path='/modifyCoachInfo' element={<ProtectedRoute element={<CoachObjectModify/>}/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
