import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { createHappy, loadPostAxios, updateHappyAxios, createPost } from "../modules/redux/haedal";
import { useNavigate, Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";

import Button from "./Button";

const Write = ({page}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch(null);
	const param = useParams();
	const post_data = useSelector(state=>state.haedal.post);
	const [filename, setFilename] = useState();
	//todo: 행복지수 찍기
	const scoreInput = useRef();
	const fileInput = useRef();
	const contentInput = useRef();
	const scores = ['최악', '나쁨', '보통', '좋음', '최상'];
	const [score, setScore] = useState();
	const [content, setContent] = useState();
	const [clicked, setClicked] = useState();
	const inputs = [score, filename, clicked];
	const refs = [scoreInput, fileInput, contentInput];
 const [formdata, setFormdata] = useState();

	//todo: 이미지 업로드
	const uploadImg = async (e) => {
		e.preventDefault();
		if (e.target.files) {
			const uploadFile = e.target.files[0];
			const formData = new FormData();
			formData.append("happypoint", 1);
			formData.append("img", uploadFile);
			formData.append("content", 'content');
			setFormdata(formData);
			console.log(formData, score, uploadFile, content)
			setFilename(e.target.files[0].name)
		}
	};
	
	const checkValidation = () => {
		setClicked(true);
		for(let i=0; i<inputs.length; i++){
			if(inputs[i] === '' || inputs[i] === undefined){
				refs[i].current.focus();
				break;
			}
			if(i === inputs.length-1){
				if(page === 'edit') dispatch(updateHappyAxios(param.postId));
				else dispatch(createPost(formdata));
				setClicked(false);
				break;
			}
		}
	};

	useEffect(()=>{
		if(page === 'edit'){
			dispatch(loadPostAxios(param.postId));
		}
	},[])
	useEffect(()=>{
		if(page === 'edit' && post_data.length > 0){
			const post = post_data[0];
			setScore(post.happypoint);
			setContent(post.content);
			setFilename(post.img);
		}
	},[post_data])

	return (
		<div className="content">
			<section>
				<div className="set_inner">
					<SectionTitle>오늘의 이야기를 들려주세요!</SectionTitle>
					<Form onSubmit={(e) => e.preventDefault()}>
						<InputArea className="input_area radio score">
							<InputLabel>HAPPINESS SCORE</InputLabel>
							<InputBox className="input_box">
								{
									scores.map((v,i)=>{
										return (
											<label key={i}>
												<input
													type="radio"
													name="score"
													ref={ i === 0 ? scoreInput : null}
													checked={score === i+1 ? true : false}
													onChange={() => {
														setScore(i+1);
													}}
												/>
												<span>{v}</span>
											</label>
										)
									})
								}
							</InputBox>
							{ (clicked && (score === '' || score === undefined)) && <p className="txt_err">오늘의 컨디션을 선택해주세요!</p> }
						</InputArea>
						<InputArea className="input_area file">
							<InputLabel>PHOTO</InputLabel>
							<InputBox>
								<label>
									<input type="file" onChange={uploadImg} ref={fileInput}/>
									<Attachment>
										<p>{filename}</p>
										<Button st="primary">이미지 업로드</Button>
									</Attachment>
								</label>
							</InputBox>
							{ (clicked && (filename === '' || filename === undefined)) && <p className="txt_err">오늘의 사진을 첨부해주세요!</p> }
						</InputArea>
						<InputArea className="input_area textarea">
							<InputLabel>STORY</InputLabel>
							<InputBox className="input_box">
								<div>
									<textarea
										type="text"
										placeholder="오늘의 이야기를 작성해주세요."
										ref={contentInput}
										value={content ? content : ''}
										onChange={(e)=>setContent(e.target.value)}
									></textarea>
								</div>
								{ (clicked && (content === '' || content === undefined)) && <p className="txt_err">오늘의 이야기를 작성해주세요!</p> }
							</InputBox>
						</InputArea>
					</Form>
					<div className="btn_area">
						{
							page === 'edit'
							? <><Button width="m" onClick={()=>navigate(-1)}>취소</Button><Button width="m" st="primary" onClick={checkValidation}>수정하기</Button></>
							: <><Button width="m" onClick={()=>navigate('/')}>취소</Button><Button width="m" st="primary" onClick={checkValidation}>등록하기</Button></>
						}
						{/*  수정모드일 경우 수정하기로 텍스트 변경 */}
					</div>
				</div>
			</section>
		</div>
	);
};

const Form = styled.form``;
const SectionTitle = styled.h3`
	font-size: 2.4rem;
	padding-bottom: 20px;
	margin-bottom: 50px;
	border-bottom: 1px solid #000;
`;
const InputArea = styled.div`
	margin-top: 80px;
	&.radio.score {
		.input_box {
			display: flex;
			gap: 25px;
			label {
				position: relative;
				display: inline-block;
				cursor: pointer;
				input:checked {
					& + span {
						background: #000;
						color: #f0f0f0;
					}
				}
				span {
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
	&.file{
		label{
			position: relative;
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
	}
`;
const InputLabel = styled.p`
	position: relative;
	display: inline-block;
	font-size: 1.4rem;
	font-weight: 700;
	letter-spacing: 0.1em;
	color: #000;
	margin-bottom: 20px;
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