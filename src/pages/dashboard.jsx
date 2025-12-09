import Banner from "../components/dashboardBanner";
import "./dashboard.css";
import MediaFetcher from "../components/mediaFetcher";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <Banner />

   <div className="mylist-on-banner">
    <MediaFetcher
      title="My List"
      type="movie"
      endpoint="movie/top_rated"
      rows={1}
      limit={7}
    />

        <MediaFetcher
          title="Trending Movies"
          type="movie"
          endpoint="movie/popular"
          rows={2}
        />

        <MediaFetcher
          title="Trending TV Shows"
          type="tv"
          endpoint="tv/popular"
          rows={2}
        />

        <MediaFetcher
          title="Top Rated Movies"
          type="movie"
          endpoint="movie/top_rated"
          rows={2}
        />
      </div>
    </div>
  );
}

