import React from "react";
import styled from "styled-components";

import Button from "./Button";

const Write = () => {
	return (
		<div className="content">
			<section>
				<div className="set_inner">
					<SectionTitle>오늘의 행복 이야기를 들려주세요!</SectionTitle>
					<Form onSubmit={(e) => e.preventDefault()}>
						<InputArea className="input_area radio score">
							<InputLabel>HAPPINESS SCORE</InputLabel>
							<InputBox className="input_box">
								<label>
									<input type="radio" name="score" />
									<span>최악</span>
								</label>
								<label>
									<input type="radio" name="score" />
									<span>나쁨</span>
								</label>
								<label>
									<input type="radio" name="score" />
									<span>보통</span>
								</label>
								<label>
									<input type="radio" name="score" />
									<span>좋음</span>
								</label>
								<label>
									<input type="radio" name="score" />
									<span>최상</span>
								</label>
							</InputBox>
						</InputArea>
						<InputArea className="input_area">
							<InputLabel>PHOTO</InputLabel>
							<InputBox>
								<label>
									<input type="file" />
									<Attachment>
										<p>파일명.jpg</p>
										<Button st="primary">이미지 업로드</Button>
									</Attachment>
								</label>
							</InputBox>
						</InputArea>
						<InputArea className="input_area textarea">
							<InputLabel>STORY</InputLabel>
							<InputBox className="input_box">
								<div>
									<textarea
										type="text"
										placeholder="오늘의 행복한 이야기를 작성해주세요."
									></textarea>
								</div>
							</InputBox>
						</InputArea>
					</Form>
					<div className="btn_area">
          <Button width="m">취소</Button>
          <Button width="m" st="primary">등록하기</Button> {/*  수정모드일 경우 수정하기로 텍스트 변경 */}
          </div>
				</div>
			</section>
		</div>
	);
};

const Form = styled.form`
`;
const SectionTitle = styled.h3`
	font-size: 2.4rem;
	padding-bottom: 20px;
	margin-bottom: 50px;
	border-bottom: 1px solid #000;
`;
const InputArea = styled.div`
margin-top: 80px;
&.radio.score{
	.input_box{
		display: flex;
		gap: 25px;
		label{
		display: inline-block;
		cursor: pointer;
		input:checked{
			& + span{
				background: #000;
				color: #f0f0f0;
			}
		}
		span{
			display: inline-block;
			padding: 0 25px;
			line-height: 42px;
			height: 44px;
			border-radius: 22px;
			border: 1px solid #000;
			font-weight: 500;
		}
	}
	}
	
}
&.textarea {
		.input_box {
			div {
				padding: 12px 0;
				border: 1px solid #333;
				textarea {
					border: none;
					padding: 0 12px;
				}
				&.focus {
					background-color: rgba(240, 240, 240, 0.5);
				}
			}
		}
	}
	input[type="file"]:disabled {
		+ div {
			cursor: default;
			& > p {
				background-color: #f0f0f0;
			}
		}
	}`;
const InputLabel = styled.p`
	position: relative;
	display: inline-block;
	font-size: 1.4rem;
	font-weight: 700;
	letter-spacing: 0.1em;
	color: #000;
	margin-bottom: 20px;
	margin-left: 4px;
	&:before{
		position: absolute;
		left: -4px;
		right: -4px;
		bottom: 0;
		height: .5em;
		content: '';
		background-color: #f2b43f;
		z-index: -1;
	}
`;
const InputBox = styled.div``;
const Attachment = styled.div`
	display: flex;
	cursor: pointer;
	p {
		flex-grow: 1;
		border: 1px solid #333;
		border-right: none;
		line-height: 42px;
		padding: 0 12px;
		color: #888;
		font-size: 1.5rem;
	}
	button {
		pointer-events: none;
	}
`;
export default Write;
