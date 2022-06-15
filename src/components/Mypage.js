import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import img_1 from "../images/img_1.jpeg";
import img_2 from "../images/img_2.jpeg";
import img_3 from "../images/img_3.jpeg";
import img_4 from "../images/img_4.jpeg";
import { loadMypageAxios } from "../modules/redux/user";

const Mypage = ({loggedIn}) => {
	const [postId] = useState(0); // 임시 data
	const dispatch = useDispatch();
	const datas = useSelector((state) => state.user.mypage);
	const [mypage, setMypage] = useState(null);
	const scores = [
		{ emoji: "😡", text: "최악" },
		{ emoji: "☹️", text: "나쁨" },
		{ emoji: "☺️", text: "보통" },
		{ emoji: "😆", text: "좋음" },
		{ emoji: "😍", text: "최상" },
	];

	useEffect(() => {
		dispatch(loadMypageAxios());
	}, []);
	useEffect(() => {
		setMypage(datas.length > 0 ? datas[0] : null);
	}, [datas]);

	if (!localStorage.getItem('token')) {
		window.alert('마이페이지는 로그인 후 이용 가능합니다.');
		return <Navigate to="/" replace/>
	}
	return (
		<div className="content">
			<div className="set_inner">
				<section>
					<MypageWrap>
						<SectionTitle>
							<strong>{mypage?.nickname}</strong>님, 환영합니다!
						</SectionTitle>
						<div className="ranking_info">
							<SectionSubTitle>
								<span>{mypage?.nickname} 님의 현재 랭킹</span>
							</SectionSubTitle>
							<p className="ranking">
								총 <span>{mypage?.totalUser}</span>명의 러너 중{" "}
								<span>{mypage?.myRank}</span>위 입니다.
							</p>
						</div>
					</MypageWrap>
				</section>
				<section>
					<div className="posts_area">
						<SectionSubTitle>
							<span>{mypage?.nickname} 님이 작성한 게시글</span>
						</SectionSubTitle>
						<PostsWrap>
							<PostsGroup>
								{mypage?.posts.map((v, i) => {
									return (
										<PostItem key={i}>
											<Link to={`/detail/${v.postId}`} className="inner">
												<span
													className="img_box"
													style={{ backgroundImage: `url(${v.imgUrl})` }}
												></span>
												<div>
													<div className="score_area">
														<span>
															행복지수{" "}
															<strong>
																{Object.values(scores[v.happypoint - 1])[1]}
															</strong>
														</span>
														<br />
														<strong>
															{Object.values(scores[v.happypoint - 1])[0]}
														</strong>
													</div>
													<div className="text_area">
														{/* <span>
															Happy Runner <strong>{mypage.nickname}</strong>
														</span> */}
														<p>{v.content}</p>
													</div>
												</div>
												<em>VIEW MORE</em>
											</Link>
										</PostItem>
									);
								})}
							</PostsGroup>
						</PostsWrap>
					</div>
				</section>
			</div>
		</div>
	);
};

const MypageWrap = styled.div`
	.ranking_info {
		padding-top: 60px;
		.ranking {
			font-size: 4rem;
			font-weight: 300;
			span {
				font-weight: 500;
			}
		}
	}
`;
const SectionTitle = styled.h3`
	font-size: 2.4rem;
	padding-bottom: 20px;
	margin-bottom: 50px;
	border-bottom: 1px solid #000;
	font-weight: 300;
`;
const SectionSubTitle = styled.p`
	position: relative;
	font-size: 2rem;
	font-weight: 700;
	margin-bottom: 20px;
	span {
		position: relative;
		display: inline-block;
		&:before {
			content: "";
			display: block;
			position: absolute;
			left: -4px;
			right: -4px;
			bottom: 0;
			height: 0.5em;
			background-color: #f2b43f;
			z-index: -1;
		}
	}
`;
const PostsWrap = styled.div`
	padding-top: 20px;
`;
const PostsGroup = styled.ul`
	display: flex;
	flex-wrap: wrap;
	margin: -20px;
`;
const PostItem = styled.li`
	position: relative;
	flex-basis: 33.3333%;
	padding: 20px;
	box-sizing: border-box;
	.inner {
		display: block;
		position: relative;
		border-radius: 10px;
		overflow: hidden;

		&:hover {
			.img_box {
				transform: scale(1.05);
				&:before {
					background-color: rgba(0, 0, 0, 0.6);
				}
			}
		}

		.img_box {
			position: relative;
			display: block;
			background-size: cover;
			background-position: center;
			background-repeat: no-repeat;
			height: 0;
			padding-bottom: 140%;
			transition: ease-out 0.4s;

			&:before {
				position: absolute;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;
				content: "";
				background-color: rgba(0, 0, 0, 0.4);
				z-index: 1;
				transition: ease-out 0.4s;
			}
		}
		& > div {
			display: flex;
			align-items: flex-start;
			justify-content: space-between;
			flex-direction: column;
			position: absolute;
			right: 0;
			left: 0;
			bottom: 0;
			top: 0;
			padding: 40px;
			z-index: 2;
			div {
				text-align: center;
				&.score_area {
					span {
						display: inline-block;
						font-size: 1.4rem;
						margin-bottom: 4px;
						color: #fff;
						line-height: 2rem;
						padding: 0 7px;
						border: 1px solid #fff;
						border-radius: 5px;
						strong {
							font-size: 1.4rem;
						}
					}
					strong {
						display: inline-block;
						font-size: 5rem;
					}
				}
				&.text_area {
					text-align: left;
					span {
						display: block;
						font-size: 1.3rem;
						color: #fff;
						letter-spacing: normal;
						margin-bottom: 15px;
					}
					strong {
						color: #f2b43f;
						border-bottom: 1px solid #f2b43f;
						margin-left: 2px;
					}
				}
			}
		}
	}
	p {
		font-size: 2rem;
		font-weight: 500;
		line-height: 1.7;
		color: #fff;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		max-height: 3.4em;
		line-height: 1.7;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	em {
		opacity: 0;
		position: absolute;
		left: 0;
		right: 0;
		top: 50%;
		font-size: 1.6rem;
		font-weight: 700;
		transform: translateY(-50%);
		text-align: center;
		color: #fff;
		font-style: normal;
		z-index: 2;
		margin-top: 20px;
		transition: ease-out 260ms;
		&:after {
			display: inline-block;
			width: 7px;
			height: 7px;
			border-top: 1px solid #fff;
			border-right: 1px solid #fff;
			transform: rotate(45deg);
			content: "";
			vertical-align: middle;
			margin-left: 6px;
			margin-top: -2px;
		}
	}
	&:hover {
		em {
			opacity: 1;
			margin-top: 0;
		}
	}
`;
const RegisterButton = styled.button`
	position: fixed;
	right: 60px;
	bottom: 80px;
	width: 50px;
	height: 50px;
	border-radius: 50%;
	background-color: #f2b43f;
	cursor: pointer;
	&:before {
		left: 50%;
		top: -40px;
		position: absolute;
		line-height: 26px;
		font-weight: 700;
		content: "새 글 작성하기";
		background: #000;
		border-radius: 5px;
		white-space: nowrap;
		transform: translateX(-50%);
		padding: 0 10px;
		color: #f2b43f;
		opacity: 0;
		transition: ease 260ms;
		pointer-events: none;
	}
	&:after {
		position: absolute;
		top: -14px;
		left: 50%;
		width: 0;
		height: 0;
		border: 6px solid transparent;
		border-top: 6px solid #000;
		border-left: 6px solid transparent;
		border-right: 6px solid transparent;
		border-bottom: 6px solid transparent;
		transform: translateX(-50%);
		content: "";
		margin: 0 auto;
		transition: ease 260ms;
		opacity: 0;
		pointer-events: none;
	}
	&:hover {
		&:before {
			top: -50px;
			opacity: 1;
		}
		&:after {
			top: -24px;
			opacity: 1;
		}
	}
	span {
		font-size: 0;
		&:before,
		&:after {
			position: absolute;
			left: 15px;
			right: 15px;
			top: 50%;
			height: 2px;
			margin: 0 auto;
			background-color: #000;
			margin-top: -1px;
			content: "";
		}
		&:before {
			transform: rotate(90deg);
		}
	}
`;
export default Mypage;
