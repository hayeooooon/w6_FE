import React, { useState } from "react";
import styled from "styled-components";

import Button from "./Button";

<<<<<<< HEAD

const Signup = ({ type, loggedIn, setLoggedIn, setUserInfo }) => {
	const dispatch = useDispatch();
	const location = useLocation();
	const [pathname, setPathname] = useState(type);
	const userInfoState = useSelector(state=>state.user.user);
	const [username, setUsername] = useState("");
	const [pw, setPw] = useState("");
	const [pwcheck, setPwcheck] = useState('')
	const [nickname, setNickname] = useState('')
	const [clicked, setClicked] = useState(false);

	useEffect(()=>{
		setPathname(location.pathname)
		console.log('pathname changed 1', location.pathname)
	},[location.pathname])
	console.log('pathname changed 2', location.pathname)
	

	const signUp = () => {
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
				dispatch(signUpAxios(data));
				setClicked(false);
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
=======
const Signup = ({type}) => {
  console.log(type)
>>>>>>> parent of fb51ee7 (Feat: signup 추가)
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
								<input type="text" placeholder="아이디를 입력해주세요." />
							</InputBox>
						</InputArea>
						{type === "signup" && (
							<InputArea className="input_area text">
								<InputLabel>NICKNAME</InputLabel>
								<InputBox className="input_box">
									<input type="text" placeholder="닉네임을 입력해주세요." />
								</InputBox>
							</InputArea>
						)}

						<InputArea className="input_area text">
							<InputLabel>PASSWORD</InputLabel>
							<InputBox className="input_box">
								<input type="text" placeholder="비밀번호를 입력해주세요." />
								{type === "signup" && (
									<input type="text" placeholder="비밀번호 확인" />
								)}
							</InputBox>
						</InputArea>
						<div className="btn_area">
							<Button width="m">취소</Button>
							{type === "signup" ? (
								<Button width="m" st="primary">
									가입하기
								</Button>
							) : (
								<Button width="m" st="primary">
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
