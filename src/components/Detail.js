import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Button from "./Button";
import img_3 from "../images/img_3.jpeg";

import { createHappy, loadContent } from "../modules/redux/haedal";
import { createComment } from "../modules/redux/comment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

//useEffect(() => {컴포넌트가 화면에 그려질때 실행할 함수}, [의존성 배열])
//(*의존성배열 : 배열에 넣은 값이 변했을 때 첫번째 인자 다시 실행)
const Detail = ({loggedIn}) => {
	const inputComment = React.useRef(null);
	const dispatch = useDispatch(null);
	const param = useParams();
	const navigate = useNavigate();
	//console.log(param)
	//todo: 메인-디테일 연결(postid)
	const contentDetail = useSelector((state) => state.haedal.post);

	const [thispost, setThispost] = useState([]);
	//console.log(thispost)

	useEffect(() => {
		setThispost(contentDetail);
	}, [contentDetail]);

	useEffect(() => {
		dispatch(loadContent(param.postId));
		//console.log("아무거나")
	}, []);
	console.log(loadContent(param.postId));
	//todo: 메인-디테일 연결(happypoint)
	const scoreEmoji = ["😡", "☹️", "☺️", "😆", "😍"];
	const scoreCharacter = ["최악", "나쁨", "보통", "좋음", "최상"];

	//{scoreCharacter[v.happypoint-1]}

	//todo: 댓글
	const commentBox = () => {
		dispatch(
			createComment({
				id: "일단 닉네임",
				comment: inputComment.current.value,
			})
		);
	};
	const commentData = useSelector((state) => state.comment.list);
	// dispatch(loadContent(param.postId))

	return (
		<div className="content">
			<section>
				<div className="set_inner">
					<ImageArea>
						<div style={{ backgroundImage: `url(${img_3})` }}></div>
					</ImageArea>
					<ContentArea>
						<div className="info_area">
							<p>
								<span className="nickname">nickname</span>
								<p className="score">
									<em>행복지수</em>
									<strong>
										{thispost.length > 0
											? scoreCharacter[thispost[0].happypoint - 1]
											: ""}
										<i>
											{thispost.length > 0
												? scoreEmoji[thispost[0].happypoint - 1]
												: ""}
										</i>
									</strong>
								</p>
							</p>
						</div>
						<div class="content_area">
							<p> {thispost.length > 0 ? thispost[0].content : ""}</p>
						</div>
					</ContentArea>
					{loggedIn &&  ( // 데이터 연결 후 작성자 일치하는지 확인하는 조건 추가
						<div
							className="btn_area"
							style={{ textAlign: "right", marginTop: "60px" }}
						>
							<Button>삭제</Button>
							<Link to={`/edit/${param.postId}`} className="btn primary">수정</Link>
						</div>
					)}
				</div>
			</section>
			<section>
				<div className="set_inner">
					<SectionTitle>
						<strong>nickname</strong>님과 자유롭게 소통해주세요!
					</SectionTitle>
					<CommentArea>
						<div className="comment_write">
							<InputArea className="input_area textarea comment">
								<InputBox className="input_box">
									<div>
										<textarea
											type="text"
											placeholder="자유롭게 의견을 작성해주세요."
										></textarea>
									</div>
								</InputBox>
								<div className="btn_box">
									<Button st="primary" onClick={commentBox}>
										작성하기{" "}
									</Button>
								</div>
							</InputArea>
						</div>
						{commentData.map((v, i) => {
							return (
								<div className="comment_view" key={i}>
									<ul>
										<li>
											<span>{v.id}</span>
											<p>{v.comment}</p>
											<div style={{ marginTop: "20px" }}>
												<Button height="xs" padding="s">
													삭제
												</Button>
												<Button st="primary" height="xs" padding="s">
													수정
												</Button>
											</div>
										</li>
									</ul>
								</div>
							);
						})}
					</CommentArea>
					<div className="btn_area">
						<Button width="m">취소</Button>
						<Button width="m" st="primary">
							등록하기
						</Button>
					</div>
				</div>
			</section>
		</div>
	);
};

const ImageArea = styled.div`
	div {
		height: 0;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		padding-bottom: 50%;
		border-radius: 10px;
		overflow: hidden;
	}
`;
const ContentArea = styled.div`
	.info_area {
		font-size: 1.8rem;
		padding: 20px 0 15px;
		.nickname {
			display: inline-block;
			vertical-align: middle;
		}
		.score {
			position: relative;
			display: inline-block;
			vertical-align: middle;
			padding-left: 20px;
			margin-left: 20px;
			margin-top: 0.2em;
			&:before {
				position: absolute;
				left: 0;
				top: 50%;
				height: 16px;
				width: 1px;
				background-color: #ccc;
				content: "";
				margin-top: -8px;
			}
			em {
				font-style: normal;
			}
			strong {
				margin-left: 8px;
				i {
					display: inline-block;
					vertical-align: middle;
					font-size: 2.4rem;
					font-style: normal;
					margin-top: -0.25em;
				}
			}
		}
	}
	.content_area {
		padding: 0 0 20px;
		p {
			line-height: 1.8;
		}
	}
`;
const SectionTitle = styled.h3`
	font-size: 2.4rem;
	padding-bottom: 20px;
	margin-bottom: 50px;
	border-bottom: 1px solid #000;
`;
const CommentArea = styled.div`
	.input_area {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		&.textarea {
			.input_box {
				flex: 1;
				div {
					padding: 12px 0;
					border: 1px solid #333;
					textarea {
						border: none;
						padding: 0 12px;
						min-height: 50px;
					}
					&.focus {
						background-color: rgba(240, 240, 240, 0.5);
					}
				}
			}
		}
		button {
			height: 76px;
		}
	}
	.comment_view {
		margin: 25px 0 15px;
		li {
			& + li {
				border-top: 1px solid #ccc;
				padding-top: 20px;
				margin-top: 20px;
			}

			span {
				display: block;
				font-size: 1.4rem;
				margin-bottom: 5px;
				font-weight: 500;
				opacity: 0.4;
			}
		}
	}
	.comment_write {
		margin: 15px 0;
	}
`;
const InputArea = styled.div``;

const ButtonBox = styled.div``;
const InputBox = styled.div``;

export default Detail;
