import React from "react";
import "./App.css";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";

// components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import Write from "./components/Write";
import Detail from "./components/Detail";
import Mypage from "./components/Mypage";
import Signup from "./components/Signup";
import Button from "./components/Button";

function App() {
	/**
	 * [페이지별 컴포넌트]
	 * 메인: Main.js
	 * 게시글 등록/수정: Write.js
	 * 상세 페이지: Detail.js
	 * 마이페이지: Mypage.js
	 * 로그인/회원가입 Signup.js
	 */
	return (
		<Wrap className="App">
			<Header></Header>
			<Container className="container">
				<Routes>
					<Route path="/" element={<Main />}></Route>
					<Route path="/write" element={<Write />}></Route> {/* 게시글 등록 */}
					<Route path="/edit/:postId" element={<Write />}></Route>
					{/* 게시글 수정 */}
					<Route path="/detail/:postId" element={<Detail />}></Route>
					<Route path="/mypage" element={<Mypage />}></Route>
					<Route path="/signup" element={<Signup type="signup" />}></Route> {/* 회원가입 */}
					<Route path="/signin" element={<Signup type="signin" />}></Route> {/* 로그인 */}
				</Routes>
			</Container>
			<Footer></Footer>
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
