import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

import Button from "./Button";
import img_3 from "../images/img_3.jpeg";

import {
	loadPostAxios,
	deleteHappyAxios,
	createCommentAxios,
	updateCommentAxios,
	deleteCommentAxios,
} from "../modules/redux/haedal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const Detail = ({ loggedIn, userInfo }) => {
	const dispatch = useDispatch(null);
	const param = useParams();
	const navigate = useNavigate();
	const [comment, setComment] = useState();
	const [post, setPost] = useState();

	//todo: 메인-디테일 연결(postid&post)
	const thispost = useSelector((state) => state.haedal.post);
	const scoreEmoji = ["😡", "☹️", "☺️", "😆", "😍"];
	const scoreCharacter = ["최악", "나쁨", "보통", "좋음", "최상"];
	const [data, setData] = useState();
	const commenetRef = useRef();
	const editCommentRef = useRef();

	useEffect(() => {
		dispatch(loadPostAxios(param.postId));
	}, []);

	useEffect(() => {
		if (thispost.length > 0) {
			const new_comments = thispost[0].comments.map((v) => {
				const _v = { ...v, edit: false };
				return _v;
			});
			thispost[0].comments = new_comments;
			thispost[0].comments.sort(function (a,b){ // 댓글 ID 내림차순으로 재정렬
				return b.commentId-a.commentId
			})
			setData(thispost[0]);
		}
		if (
			(data !== undefined && data,
			data?.comments.length < thispost[0]?.comments.length)
		) {
			dispatch(loadPostAxios(param.postId));
		}
	}, [thispost]);
	

	//todo: 게시물 삭제*****
	const deletePost = dispatch(deleteHappyAxios(param.postId));

	if (data === undefined) return <p>로딩 중...</p>;
	return (
		<div className="content">
			<section>
				<div className="set_inner">
					<ImageArea>
						<div style={{ backgroundImage: `url(${data.img})` }}></div>
					</ImageArea>
					<ContentArea>
						<div className="info_area">
							<p>
								<span className="nickname">{data.nickname}</span>
								<span className="score">
									<em>행복지수</em>
									<strong>
										{scoreCharacter[data.happypoint - 1]}
										<i>{scoreEmoji[data.happypoint - 1]}</i>
									</strong>
								</span>
							</p>
						</div>
						<div className="content_area">
							<p>{thispost[0].content}</p>
						</div>
					</ContentArea>
					{loggedIn && data?.userId === userInfo?.userId && (
						<div
							className="btn_area"
							style={{ textAlign: "right", marginTop: "60px" }}
						>
							<Button onClick={() => deletePost}>삭제</Button>
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
						<strong>{data.nickname}</strong>님과 자유롭게 소통해주세요!
					</SectionTitle>
					<CommentArea>
						{loggedIn && (
							<div className="comment_write">
								<InputArea className="input_area textarea comment">
									<InputBox className="input_box">
										<div>
											<textarea
												type="text"
												ref={commenetRef}
												value={comment}
												onChange={(e) => setComment(commenetRef.current?.value)}
												placeholder="자유롭게 의견을 작성해주세요."
											></textarea>
										</div>
									</InputBox>
									<div className="btn_box">
										<Button
											st="primary"
											onClick={(e) => {
												if (comment.trim().length > 0) {
													dispatch(createCommentAxios(param.postId, comment));
													setComment("");
												}
											}}
										>
											작성하기
										</Button>
									</div>
								</InputArea>
							</div>
						)}
						{data.comments.length > 0 ? (
							<>
								{data.comments.map((v, i) => {
									return (
										<div className="comment_view" key={i}>
											<ul>
												<li>
													<span>{v.nickname}</span>
													{v.edit ? (
														<textarea ref={editCommentRef}>{v.comment}</textarea>
													) : (
														<p>{v.comment}</p>
													)}
													{(v.userId === userInfo?.userId && !v.edit) && (
														<div style={{ marginTop: "20px" }}>
															<Button height="xs" padding="s" onClick={()=>dispatch(deleteCommentAxios(v.commentId))}>
																삭제
															</Button>
															<Button
																st="primary"
																height="xs"
																padding="s"
																onClick={()=>{
																	const _comments = data.comments.map(item=>{
																		if(item.commentId === v.commentId){
																			item.edit = true;
																			return item
																		}
																		item.edit = false;
																		return item;
																	})
																	const _data = {...data};
																	_data.comments = _comments;
																	setData(_data);
																}}
															>
																수정
															</Button>
														</div>
													)}
													{(v.userId === userInfo?.userId && v.edit) && (
														<div style={{ marginTop: "20px" }}>
															<Button height="xs" padding="s" onClick={()=>{
																const _comments = data.comments.map(item=>{
																	item.edit = false;
																	return item;
																})
																const _data = {...data};
																_data.comments = _comments;
																setData(_data);
																editCommentRef.current = {value: ''}
															}}>
																취소
															</Button>
															<Button
																st="primary"
																height="xs"
																padding="s"
																onClick={()=>{
																	dispatch(updateCommentAxios(v.commentId, editCommentRef.current.value))
																	const _comments = data.comments.map(item=>{
																		item.edit = false;
																		return item;
																	})
																	const _data = {...data};
																	_data.comments = _comments;
																	setData(_data);
																	editCommentRef.current = {value: ''}
																}}>
																등록
															</Button>
														</div>
													)}
												</li>
											</ul>
										</div>
									);
								})}
							</>
						) : (
							<p>등록된 댓글이 없습니다.</p>
						)}
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
