import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Button from "./Button";
import img_3 from "../images/img_3.jpeg";

import { loadPostAxios, deleteHappyAxios } from "../modules/redux/haedal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const Detail = ({ loggedIn, userInfo }) => {
	const dispatch = useDispatch(null);
	const param = useParams();
	const navigate = useNavigate();
	const [post, setPost] = useState();

	//todo: 메인-디테일 연결(postid&post)
	const thispost = useSelector((state) => state.haedal.post);
	const scoreEmoji = ["😡", "☹️", "☺️", "😆", "😍"];
	const scoreCharacter = ["최악", "나쁨", "보통", "좋음", "최상"];

	useEffect(() => {
		dispatch(loadPostAxios(param.postId));
	}, []);
	

	//todo: 게시물 삭제*****
	const deletePost = dispatch(deleteHappyAxios(param.postId));
	

	return (
		<div className="content">
			<section>
				<div className="set_inner">
					<ImageArea>
						<div style={{ backgroundImage: `url(${thispost[0]?.img})` }}></div>
					</ImageArea>
					<ContentArea>
						<div className="info_area">
							<p>
								<span className="nickname">{thispost[0]?.nickname}</span>
								<span className="score">
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
								</span>
							</p>
						</div>
						<div className="content_area">
							<p> {thispost.length > 0 ? thispost[0].content : ""}</p>
						</div>
					</ContentArea>
					{loggedIn &&
						thispost[0]?.userId === userInfo?.userId / 1 && ( // 데이터 연결 후 작성자 일치하는지 확인하는 조건 추가
							<div
								className="btn_area"
								style={{ textAlign: "right", marginTop: "60px" }}
							>
								<Button onClick ={deletePost}>삭제</Button>
								<Link to={`/edit/${param.postId}`} className="btn primary">
									수정
								</Link>
							</div>
						)}
				</div>
			</section>
			<section>
				<div className="set_inner">
					<SectionTitle>
						<strong>{thispost[0]?.nickname}</strong>님과 자유롭게 소통해주세요!
					</SectionTitle>
					<CommentArea>
						{loggedIn && (
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
										<Button st="primary">작성하기</Button>
									</div>
								</InputArea>
							</div>
						)}
						{
							thispost[0]?.comments.length > 0
							? (
								<>
						{thispost[0].comments.map((v, i) => {
							return (
								<div className="comment_view" key={i}>
									<ul>
										<li>
											<span>{v.nickname}</span>
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
						</>
							)
							:
							<p>등록된 댓글이 없습니다.</p>
						}
					</CommentArea>
					<div className="btn_area">
						<Button width="m" onClick={() => navigate("/")}>
							목록으로
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
					margin-left: 4px;
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
