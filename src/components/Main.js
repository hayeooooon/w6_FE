import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { apis } from "../api/index";

import img_1 from "../images/img_1.jpeg";
import img_2 from "../images/img_2.jpeg";
import img_3 from "../images/img_3.jpeg";
import img_4 from "../images/img_4.jpeg";
import { loadPostsListAxios } from "../modules/redux/haedal";
import { getUserInfoAxios } from "../modules/redux/user";

const Main = ({ loggedIn, setLoggedIn, userInfo, setUserInfo }) => {
	// const dispatch = useDispatch();
	// dispatch(getUserInfoAxios()); 메인 comp에서 로그인 정보 확인 요청을 또 해야하나..?
	console.log("userInfo", userInfo);
	return (
		<div className="content">
			<TopArea>
				<div className="set_inner">
					<h2>해피 달리기, 해달</h2>
					<p>
						일상을 더욱 다채롭고 행복하게 만드는 일, <span>해달</span>에서 함께
						할 수 있어요!
						<br />
						<span>감사하고 행복한 순간들</span>을 공유하고 함께 공감해보세요!
					</p>
				</div>
			</TopArea>
			<RankingArea></RankingArea>
			<PostsArea loggedIn={loggedIn}></PostsArea>
		</div>
	);
};

const TopArea = styled.div`
	padding: 8% 0 5%;
	font-size: 3rem;
	text-align: center;
	p {
		font-size: 2rem;
		margin-top: 12px;
		line-height: 1.7;
		span {
			display: inline-block;
			position: relative;
			z-index: 1;
			:before {
				position: absolute;
				left: -4px;
				right: -6px;
				bottom: 3px;
				height: 0.5em;
				background-color: #f2b43f;
				content: "";
				z-index: -1;
				opacity: 0.9;
			}
		}
	}
`;
const SectionTitle = styled.h3`
	font-size: 2.4rem;
	padding-bottom: 20px;
	margin-bottom: 50px;
	border-bottom: 1px solid #000;
`;

const RankingArea = () => {
	const [rankingList, setRankingList] = useState([]);
	useEffect(() => {
		apis
			.rankingList()
			.then((res) => {
				setRankingList(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<Ranking>
			<div className="set_inner">
				<div className="rank_area">
					<SectionTitle>행복 지수 랭킹 상위 러너들을 소개합니다!</SectionTitle>
				</div>
				<RankItemGroup>
					{rankingList.length <= 0 ? (
						<p>랭킹 정보가 없습니다.</p>
					) : (
						rankingList.map((v, i) => {
							return (
								<li key={i}>
									<span>
										<strong>{i + 1}</strong>st
									</span>
									<p>{v.nickname}</p>
								</li>
							);
						})
					)}
				</RankItemGroup>
			</div>
		</Ranking>
	);
};

const Ranking = styled.section``;
const RankItemGroup = styled.ul`
	display: flex;
	gap: 40px;
	align-items: center;
	li {
		display: flex;
		align-items: center;
		flex-basis: 20%;
		&:first-of-type {
			span {
				background: rgb(255, 187, 58);
				background: linear-gradient(
					180deg,
					rgba(255, 187, 58, 1) 40%,
					rgba(236, 175, 60, 1) 100%
				);
			}
		}
		&:nth-of-type(2) {
			span {
				background: rgb(227, 227, 227);
				background: linear-gradient(
					180deg,
					rgba(227, 227, 227, 1) 40%,
					rgba(210, 210, 210, 1) 100%
				);
			}
		}
		&:nth-of-type(3) {
			span {
				background: rgb(210, 154, 128);
				background: linear-gradient(
					180deg,
					rgba(210, 154, 128, 1) 40%,
					rgba(182, 131, 108, 1) 100%
				);
			}
		}
		&:nth-of-type(4),
		&:nth-of-type(5) {
			span {
				color: #baab93;
				background: #f3ede2;
			}
		}
		span {
			width: 60px;
			height: 60px;
			border-radius: 50%;
			font-size: 1.4rem;
			line-height: 55px;
			text-align: center;
			font-weight: 700;
			box-sizing: border-box;
			letter-spacing: 0.04em;
			padding-left: 5px;
			strong {
				font-size: 3rem;
			}
		}
		p {
			font-size: 1.8rem;
			margin-left: 18px;
			font-weight: 500;
		}
	}
`;

const PostsArea = ({ loggedIn }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const datas = useSelector((state) => state.haedal.list);
	const [posts, setPosts] = useState([]);
	useEffect(() => {
		dispatch(loadPostsListAxios());
	}, []);

	useEffect(() => {
		setPosts(datas);
	}, [datas]);

	const scores = [
		{ emoji: "😡", text: "최악" },
		{ emoji: "☹️", text: "나쁨" },
		{ emoji: "☺️", text: "보통" },
		{ emoji: "😆", text: "좋음" },
		{ emoji: "😍", text: "최상" },
	];
	return (
		<>
			<PostsWrap>
				<div className="set_inner">
					<SectionTitle>행복 러너들의 이야기</SectionTitle>
					<PostsGroup>
						{posts.map((v, i) => {
							return (
								<PostItem key={i}>
									<Link to={`/detail/${v.postId}`} className="inner">
										<span
											className="img_box"
											style={{ backgroundImage: `url(${v.img})` }}
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
												<span>
													Happy Runner <strong>{v.nickname}</strong>
												</span>
												<p>{v.content}</p>
											</div>
										</div>
										<em>VIEW MORE</em>
									</Link>
								</PostItem>
							);
						})}
					</PostsGroup>
				</div>
			</PostsWrap>
			<RegisterButton
				onClick={() => {
					if (!loggedIn) {
						window.alert("로그인 후 게시글 작성 가능합니다.");
						return navigate("/signin");
					}
					navigate("/write");
				}}
			>
				<span>새글 작성하기</span>
			</RegisterButton>
		</>
	);
};
const PostsWrap = styled.section``;
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

export default Main;
