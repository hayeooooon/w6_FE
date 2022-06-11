import React, { useState } from "react";
import styled from "styled-components";

import Button from "./Button";

const Signup = ({type}) => {
  console.log(type)
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
