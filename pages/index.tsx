import axios from "axios";
import { GetStaticProps } from "next";

type props = {
	data: any;
};

type anime = {
	mal_id: number;
	title: string;
	images: { jpg: { image_url: string } };
};

const Home = (props: props) => {
	console.log(props.data);

	return props?.data?.map((anime: anime) => {
		return (
			<div key={anime.mal_id}>
				<img src={anime.images.jpg.image_url} alt="" />
				<span>{anime.title}</span>
			</div>
		);
	});
};

export const getStaticProps: GetStaticProps = async () => {
	const res = await axios.get("https://api.jikan.moe/v4/anime/", {
		params: { page: 1, limit: 10 },
	});
	return { props: res.data };
};

export default Home;
