import "./App.css";
import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";

// components
import Modal from "./components/Modal";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import Write from "./components/Write";
import Detail from "./components/Detail";
import Mypage from "./components/Mypage";
import Signup from "./components/Signup";

function App() {
	/**
	 * [페이지별 컴포넌트]
	 * 메인: Main.js
	 * 게시글 등록/수정: Write.js
	 * 상세 페이지: Detail.js
	 * 마이페이지: Mypage.js
	 * 로그인/회원가입 Signup.js
	 */
	const [isLoading, setIsLoading] = useState(true);
	const [loggedIn, setLoggedIn] = useState(false);
	const [userInfo, setUserInfo] = useState({});
	const [toggleModal, setToggleModal] = useState(false);
	const [dataToDelete, setDataToDelete] = useState(null);

	const getUserInfo = async () => {
		const nickname = await sessionStorage.getItem('nickname');
		const userId = await sessionStorage.getItem('userId')/1;
		const expiry = await sessionStorage.getItem('expiry');
		if( Date.now() > expiry){
			window.sessionStorage.clear();
			setUserInfo({});
			setLoggedIn(false);
			return;
		}
		if(nickname && userId){
			setUserInfo({nickname: nickname, userId: userId});
			setLoggedIn(true);
		}
	}
	useEffect(()=>{
		getUserInfo();
	},[])
	
	return (
		<Wrap className={`App ${isLoading ? 'is_loading' : ''}`}>
			<Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} userInfo={userInfo} setUserInfo={setUserInfo}></Header>
			<Container className="container">
				<Routes>
					<Route path="/" element={<Main loggedIn={loggedIn} setLoggedIn={setLoggedIn} userInfo={userInfo} setUserInfo={setUserInfo} />}></Route>
					<Route path="/write" element={<Write page={'write'} loggedIn={loggedIn} />}></Route> {/* 게시글 등록 */}
					<Route path="/edit/:postId" element={<Write page={'edit'} loggedIn={loggedIn}/>}></Route>
					{/* 게시글 수정 */}
					<Route path="/detail/:postId" element={<Detail loggedIn={loggedIn} userInfo={userInfo} setToggleModal={setToggleModal} setDataToDelete={setDataToDelete}/>}></Route>
					<Route path="/mypage" element={<Mypage loggedIn={loggedIn}/>}></Route>
					<Route path="/signup" element={<Signup type="signup" loggedIn={loggedIn} setLoggedIn={setLoggedIn} setUserInfo={setUserInfo}/>}></Route> {/* 회원가입 */}
					<Route path="/signin" element={<Signup type="signin" loggedIn={loggedIn} setLoggedIn={setLoggedIn} setUserInfo={setUserInfo}/>}></Route> {/* 로그인 */}
				</Routes>
			</Container>
			<Footer></Footer>
			<Modal toggle={toggleModal} item={dataToDelete} clearToggle={setToggleModal} clearItem={setDataToDelete}></Modal>
		</Wrap>
	);
}

const Wrap = styled.div`
	max-width: 1920px;
	margin: 0 auto;
  padding-top: 60px;
`;
const Container = styled.div`
	position: relative;
  min-height: calc(100vh - 120px);
  z-index: 1;
`;


export default App;
