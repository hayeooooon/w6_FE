import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { signInAxios, signUpAxios } from "../modules/redux/user";

import Button from "./Button";
import { apis } from "../api";


const Signup = ({ type, loggedIn, setLoggedIn, setUserInfo }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userInfoState = useSelector(state=>state.user.user);
	const [username, setUsername] = useState("");
	const [pw, setPw] = useState("");
	const [pwcheck, setPwcheck] = useState('')
	const [nickname, setNickname] = useState('')
	const [clicked, setClicked] = useState(false);

	
	const signUp = async () => {
		setClicked(true);
		const inputs = [username, nickname, pw, pwcheck];
		for(let i=0; i<inputs.length; i++){
			if(inputs[i].trim().length <= 0){
				return false;
			}
			if(pw.trim() !== pwcheck.trim()){
				return false;
			}
			if( i >= inputs.length - 1 ){
				const data = {
					username: username,
					nickname: nickname,
					pw: pw,
					pwcheck: pwcheck,
				};
				// dispatch(signUpAxios(data));
				await apis.signUp(data).then(
					res => {
						console.log(res.data);
						setUsername('');
						setNickname('');
						setPw('');
						setPwcheck('');
						navigate('/signin');
					}
				).catch(
					err => {
						console.error(err);
					}
				)
				setClicked(false);
				break;
			}
		}
	};
	const signIn = () => {
		setClicked(true);
		const inputs = [username, pw];
		for(let i=0; i<inputs.length; i++){
			if(inputs[i].trim().length <= 0){
				return false;
			}
			if( i >= inputs.length - 1 ){
				const data = {
					username: username,
					pw: pw,
				};
				dispatch(signInAxios(data));
				setClicked(false);
			}
		}
	};
	useEffect(()=>{
		if(userInfoState.length > 0){
			console.log('got user info')
			setLoggedIn(true);
			setUserInfo(...userInfoState);
		}
	}, [userInfoState]);

	
	if(loggedIn) return (<Navigate to="/" replace />)
	return (
		<div className="content">
			<section>
				<div className="set_inner">
					<Form onSubmit={(e) => e.preventDefault()}>
						{type === "signup" ? (
							<SectionTitle>Happy Runner로 등록하세요!</SectionTitle>
						) : (
							<SectionTitle>Login</SectionTitle>
						)}
						<InputArea className="input_area text">
							<InputLabel>ID</InputLabel>
							<InputBox className="input_box">
								<input
									type="text"
									placeholder="아이디를 입력해주세요."
									value={username ? username : ''}
									onChange={(e) => setUsername(e.target.value)}
								/>
								{ (clicked && username.trim().length <= 0) && <p className="txt_err">아이디를 입력해주세요.</p>}
							</InputBox>
						</InputArea>
						{type === "signup" && (
							<InputArea className="input_area text">
								<InputLabel>NICKNAME</InputLabel>
								<InputBox className="input_box">
									<input
										type="text"
										placeholder="닉네임을 입력해주세요."
										value={nickname ? nickname : ''}
										onChange={(e) => (setNickname(e.target.value))}
									/>
									{ (clicked && nickname.trim().length <= 0) && <p className="txt_err">닉네임을 입력해주세요.</p>}
								</InputBox>
							</InputArea>
						)}

						<InputArea className="input_area text">
							<InputLabel>PASSWORD</InputLabel>
							<InputBox className="input_box">
								<input
									type="text"
									placeholder="비밀번호를 입력해주세요."
									value={pw ? pw : ''}
									onChange={(e) => setPw(e.target.value)}
								/>
								{ (clicked && pw.trim().length <= 0) && <p className="txt_err">비밀번호를 입력해주세요.</p>}
								{type === "signup" && (
									<>
									<input
										type="text"
										placeholder="비밀번호 확인"
										value={pwcheck ? pwcheck : ''}
										onChange={(e) => (setPwcheck(e.target.value))}
									/>
									{ (clicked && pwcheck.trim().length <= 0) && <p className="txt_err">비밀번호를 입력해주세요.</p>}
									{ ((clicked && pwcheck.trim().length > 0 && pw.trim() !== pwcheck.trim()) && <p className="txt_err">비밀번호가 일치하지 않습니다.</p>)}
									</>
								)}
							</InputBox>
						</InputArea>
						<div className="btn_area">
							<Button width="m" onClick={()=>{navigate('/')}}>취소</Button>
							{type === "signup" ? (
								<Button width="m" st="primary" onClick={signUp}>
									가입하기
								</Button>
							) : (
								<Button width="m" st="primary" onClick={signIn}>
									로그인
								</Button>
							)}
						</div>
					</Form>
				</div>
			</section>
		</div>
	);
};

const Form = styled.form`
	display: block;
	max-width: 550px;
	width: 100%;
	margin: 0 auto;
	.btn_area {
		margin-top: 60px;
	}
`;
const SectionTitle = styled.h3`
	font-size: 2.4rem;
	padding-bottom: 20px;
	margin-bottom: 50px;
	border-bottom: 1px solid #000;
`;
const InputArea = styled.div`
	margin-top: 40px;
`;
const InputLabel = styled.p`
	position: relative;
	display: inline-block;
	font-size: 1.4rem;
	font-weight: 700;
	letter-spacing: 0.1em;
	color: #000;
	margin-bottom: 15px;
	margin-left: 4px;
	&:before {
		position: absolute;
		left: -4px;
		right: -4px;
		bottom: 0;
		height: 0.5em;
		content: "";
		background-color: #f2b43f;
		z-index: -1;
	}
`;
const InputBox = styled.div`
	input + input {
		margin-top: 10px;
	}
`;

export default Signup;
