import React, {useState, useRef, useEffect} from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {createHappy} from "../modules/redux/haedal";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import Button from "./Button";


const Write = () => {

	const inputTxt = React.useRef(null);
	const inputImg = React.useRef(null)
	const dispatch = useDispatch(null);
	const formData = new FormData()
	const data = useSelector(state => state.haedal.list)
	useEffect(()=>{
	},[data])
	console.log(data)
	//todo: 이미지 업로드
	const uploadImg = async (e) => {
	e.preventDefault();
	
	if(e.target.files){
		const uploadFile = e.target.files[0]
		const fomeData = new FormData()
		formData.append('files',uploadFile)
	await axios({
	method: 'post',
      url: '/api/images',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
	}
}

//todo: 행복지수 찍기
	const [score, setScore]=useState()
	

//todo: 게시글내용입력
const createBox = () => {
	//console.log(inputTxt.current.value)
	dispatch(createHappy(
	{
		happypoint: score,
		content : inputTxt.current.value,
		img: '',
		nickname: ''
	}	
	));
};


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
									<input type="radio" name="score" onChange={(e)=>{
										setScore(1)
									}} />
									<span>최악</span>
								</label>
								<label>
									<input type="radio" name="score" onChange={(e)=>{
										setScore(2)
									}}/> 
									<span>나쁨</span>
								</label>
								<label>
									<input type="radio" name="score" onChange={(e)=>{
										setScore(3)
									}}/>
									<span>보통</span>
								</label>
								<label>
									<input type="radio" name="score" onChange={(e)=>{
										setScore(4)
									}} />
									<span>좋음</span>
								</label>
								<label>
									<input type="radio" name="score" onChange={(e)=>{
										setScore(5)
									}} />
									<span>최상</span>
								</label>
							</InputBox>
						</InputArea>
						<InputArea className="input_area">
							<InputLabel>PHOTO</InputLabel>
							<form>
							<InputBox>
								<label>
									<input type="file" onChange ={uploadImg} ref={inputImg} />
									<Attachment>
										<p>파일명.jpg</p>
										<Button st="primary">이미지 업로드</Button>
									</Attachment>
								</label>
							</InputBox>
							</form>
						</InputArea>
						<InputArea className="input_area textarea">
							<InputLabel>STORY</InputLabel>
							<InputBox className="input_box">
								<div>
									<textarea
										type="text"
										placeholder="오늘의 행복한 이야기를 작성해주세요."
										ref={inputTxt}
									></textarea>
								</div>
							</InputBox>
						</InputArea>
					</Form>
					<div className="btn_area">
          <Button width="m">
		  <Link to ="/" style={{textDecoration: "none", color: "inherit"}}>취소</Link></Button>
          <Button width="m" st="primary" onClick={createBox}  >
		 
                    등록하기</Button> {/*  수정모드일 경우 수정하기로 텍스트 변경 */}
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
