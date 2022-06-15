import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
	loadPostAxios,
	updatePostAxios,
	createPost,
} from "../modules/redux/haedal";
import { useNavigate, Navigate, useParams } from "react-router-dom";

import Button from "./Button";

const Write = ({ page, loggedIn }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch(null);
	const param = useParams();
	const post_data = useSelector((state) => state.haedal.post);
	const [filename, setFilename] = useState();
	const [file, setFile] = useState();
	//todo: 행복지수 찍기
	const scoreInput = useRef();
	const fileInput = useRef();
	const contentInput = useRef();
	const scores = ["최악", "나쁨", "보통", "좋음", "최상"];
	const [score, setScore] = useState();
	const [content, setContent] = useState();
	const [clicked, setClicked] = useState();
	const inputs = [score, filename, content];
	const refs = [scoreInput, fileInput, contentInput];
	const preview = useRef();

	//todo: 이미지 업로드
	const uploadImg = (e) => {
		e.preventDefault();
		if (e.target.files[0]) {
			setFile(e.target.files[0]);
			setFilename(e.target.files[0].name);
			const reader = new FileReader();
			reader.onload = function (event) {
				preview.current.setAttribute("src", event.target.result);
			};
			reader.readAsDataURL(e.target.files[0]);
		}
	};

	//todo: 게시글내용입력
	const checkValidation = () => {
		setClicked(true);
		for (let i = 0; i < inputs.length; i++) {
			if (inputs[i] === "" || inputs[i] === undefined) {
				refs[i].current.focus();
				return;
			}
			if (i === inputs.length - 1) {
				const formData = new FormData();
				formData.append("img", file);
				formData.append("happypoint", score);
				formData.append("content", content);
				if (page === "edit") {
					dispatch(updatePostAxios(param.postId, formData));
				} else {
					dispatch(createPost(formData));
				}
				setClicked(false);
				return;
			}
		}
	};

	useEffect(() => {
		if (page === "edit") {
			dispatch(loadPostAxios(param.postId));
		}
	}, []);
	useEffect(() => {
		if (page === "edit" && post_data.length > 0) {
			const post = post_data[0];
			setScore(post.happypoint);
			setContent(post.content);
			setFilename(post.imgFileName);
			preview.current.setAttribute("src", post.img);
		}
	}, [post_data]);

	if (!localStorage.getItem('token')) {
		window.alert("게시글 작성 및 편집은 로그인 후 이용 가능합니다.");
		return <Navigate to="/" replace />;
	}
	return (
		<div className="content">
			<section>
				<div className="set_inner">
					<SectionTitle>오늘의 이야기를 들려주세요!</SectionTitle>
					<Form onSubmit={(e) => e.preventDefault()}>
						<InputArea className="input_area radio score">
							<InputLabel>HAPPINESS SCORE</InputLabel>
							<InputBox className="input_box">
								{scores.map((v, i) => {
									return (
										<label key={i}>
											<input
												type="radio"
												name="score"
												ref={i === 0 ? scoreInput : null}
												checked={score === i + 1 ? true : false}
												onChange={() => {
													setScore(i + 1);
												}}
											/>
											<span>{v}</span>
										</label>
									);
								})}
							</InputBox>
							{clicked && (score === "" || score === undefined) && (
								<p className="txt_err">오늘의 컨디션을 선택해주세요!</p>
							)}
						</InputArea>
						<InputArea className="input_area file">
							<InputLabel>PHOTO</InputLabel>
							<InputBox>
								<label>
									<input type="file" onChange={uploadImg} ref={fileInput} />
									<Attachment>
										<p>{filename}</p>
										<Button st="primary">이미지 업로드</Button>
									</Attachment>
								</label>
							</InputBox>
							{clicked && (filename === "" || filename === undefined) && (
								<p className="txt_err">오늘의 사진을 첨부해주세요!</p>
							)}
							<InputLabel style={{marginTop: '30px'}}>PREVIEW</InputLabel>
							<PreviewArea className={preview.current?.value ? 'has_photo' : ''}>
								<img src="" ref={preview} />
							</PreviewArea>
						</InputArea>
						<InputArea className="input_area textarea">
							<InputLabel>STORY</InputLabel>
							<InputBox className="input_box">
								<div>
									<textarea
										type="text"
										placeholder="오늘의 이야기를 작성해주세요."
										ref={contentInput}
										value={content ? content : ""}
										onChange={(e) => setContent(e.target.value)}
									></textarea>
								</div>
								{clicked && (content === "" || content === undefined) && (
									<p className="txt_err">오늘의 이야기를 작성해주세요!</p>
								)}
							</InputBox>
						</InputArea>
					</Form>
					<div className="btn_area">
						{page === "edit" ? (
							<>
								<Button width="m" onClick={() => navigate(-1)}>
									취소
								</Button>
								<Button width="m" st="primary" onClick={checkValidation}>
									수정하기
								</Button>
							</>
						) : (
							<>
								<Button width="m" onClick={() => navigate("/")}>
									취소
								</Button>
								<Button width="m" st="primary" onClick={checkValidation}>
									등록하기
								</Button>
									
							</>
						)}
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
	&.file {
		label {
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
const PreviewArea = styled.div`
	position: relative;
	width: 70%;
	height: 0;
	padding-bottom: 35%;
	/* margin: 0 auto; */
	overflow: hidden;
	background-color: #f8f8f8;
	&:after{
		position: absolute;
		left: 0;
		right: 0;
		top: 50%;
		content: '오늘의 사진을 업로드해주세요.';
		font-size: 1.5rem;
		color: #888;
		text-align: center;
		z-index: 1;
	}
	img {
		position: absolute;
		left: 50%;
		top: 50%;
		width: 100%;
		min-height: 100%;
		min-width: 100%;
		transform: translate(-50%, -50%);
		z-index: 2;
	}
`;
export default Write;
