import React from "react";
import styled from "styled-components";
import { Link, useNavigate} from "react-router-dom";
import { useDispatch } from 'react-redux';

import Button from "../components/Button";
import {signOutAxios} from '../modules/redux/user';

const Header = ({ loggedIn, setLoggedIn, userInfo, setUserInfo}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const logout = () => {
		// 로그아웃 이벤트
		setLoggedIn(false);
		setUserInfo({});
		dispatch(signOutAxios());
		navigate('/');
	};
	const header_btns = loggedIn ? (
		<>
			<Link className="link" to="/mypage">
			<span className="fw_400">Happy Runner </span>{userInfo.nickname}
			</Link>
			<Button st="text" onClick={logout}>
			<Link to="/signin">
				로그아웃
			</Link></Button>
		</>
	) : (
		<>
			<Link className="link" to="/signin">
				로그인
			</Link>
			<Link className="link" to="/signup">
				회원가입
			</Link>
		</>
	);
	return (
		<HeaderWrap>
			<Inner className="set_inner">
				<Logo>
					<Link to="/">해달</Link>
				</Logo>
				<ButtonArea>
					{header_btns}
				</ButtonArea>
			</Inner>
		</HeaderWrap>
	);
};

const HeaderWrap = styled.header`
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	height: 60px;
	line-height: 60px;
	box-sizing: border-box;
	z-index: 2;
	background-color: #fff;
`;
const Inner = styled.div`
	display: flex;
	justify-content: space-between;
`;
const Logo = styled.h1`
	a {
		font-size: 2.8rem;
	}
`;

const ButtonArea = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	gap: 30px;
	a,
	button {
		position: relative;
		padding-bottom: 4px;
	}
	a:before,
	button:before {
		content: "";
		position: absolute;
		left: 0;
		bottom: 0;
		height: 1px;
		width: 0;
		background-color: #000;
		transition: ease-out 0.3s;
	}
	a:hover:before,
	button:hover:before {
		width: 100%;
	}
`;

export default Header;
