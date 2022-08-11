import axios from "axios";
import { GetStaticProps } from "next";
import Link from "next/link";
import { useState, useEffect } from "react";

type props = {
	data: any;
};

type anime = {
	mal_id: number;
	title: string;
	images: { jpg: { image_url: string } };
	url: string;
	synopsis: string;
	rank: number;
	score: number;
	type: string;
	episodes: number;
	status: string;
	aired: { string: string };
	duration: string;
};

const Rank = (props: props) => {
	console.log(props.data);

	const [animes, setAnimes] = useState<anime[]>([]);
	const [letter, setLetter] = useState<String>();

	useEffect(() => {
		axios
			.get("https://api.jikan.moe/v4/anime", {
				params: {
					page: 1,
					limit: 10,
					sfw: false,
					order_by: "rating",
					sort: "asc",
					letter: letter,
				},
			})
			.then((response) => {
				setAnimes(response?.data?.data);
			});
	}, [letter]);

	return animes?.map((anime: anime) => {
		return (
			<div className="flex flex-col" key={anime?.mal_id}>
				<input
					type="text"
					placeholder="영어로 입력해주세요."
					onChange={(e) => {
						setLetter(e.currentTarget.value);
					}}
				/>
				<div className="flex mt-4">
					<img
						src={anime?.images?.jpg?.image_url}
						alt="애니"
						className="mr-4"
					/>
					<div className="flex flex-col py-4 overflow-hidden justify-between">
						<div className="font-bold text-2xl">{anime?.title}</div>
						<div className="grid grid-cols-2 gap-8">
							<div className="flex flex-col ">
								<span className="text-xl">
									내 순위 :<span className="font-bold">{null}</span>
								</span>
								<span className="text-xl">
									내 점수 :<span className="font-bold">{null}</span>
								</span>
							</div>
							<div className="flex flex-col ">
								<span className="text-xl">
									myanimelist 순위 :{" "}
									<span className="font-bold">{anime?.rank}</span>
								</span>
								<span className="text-xl">
									myanimelist 점수 :{" "}
									<span className="font-bold">{anime?.score}</span>
								</span>
							</div>
						</div>
						<div className="grid grid-cols-2">
							<div className="flex items-center">
								<span>에피소드 수 :&nbsp;</span>
								<span className="font-bold text-lg">{anime?.episodes}</span>
							</div>
							<div className="flex items-center">
								<span>한 화당 시간 :&nbsp;</span>
								<span className="font-bold text-lg">{anime?.duration}</span>
							</div>
							<div className="flex items-center">
								<span>방영 기간 :&nbsp;</span>
								<span className="font-bold text-lg">
									{anime?.aired?.string}
								</span>
							</div>
							<div className="flex items-center">
								<span>방영 매체 :&nbsp;</span>
								<span className="font-bold text-lg">{anime?.type}</span>
							</div>
						</div>
						<span className="truncate">{anime?.synopsis}</span>
						<Link href={anime?.url} replace>
							<a className="w-fit text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
								상세보기
							</a>
						</Link>
					</div>
				</div>
			</div>
		);
	});
};

export default Rank;
