import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Button from "../components/Button";

const Header = () => {
	const logout = () => {
		// 로그아웃 이벤트
	};
	return (
		<HeaderWrap>
			<Inner className="set_inner">
				<Logo>
					<Link to="/">해달</Link>
				</Logo>
				<ButtonArea>
					<Link className="link" to="/signin">
						로그인
					</Link>
					<Link className="link" to="/signup">
						회원가입
					</Link>
					<Link className="link" to="/mypage">
						User
					</Link>
					<Button st="text" onClick={logout}>
						로그아웃
					</Button>
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
