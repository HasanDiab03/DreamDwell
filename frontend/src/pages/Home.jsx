import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingCard from "../components/ListingCard";

const Home = () => {
  SwiperCore.use([Navigation]);
  const [offerListings, setOfferListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);

  useEffect(() => {
    const getOffers = async () => {
      try {
        const { data } = await axios.get(`/api/listing/get?offer=true&limit=4`);
        setOfferListings(data);
        getRents();
      } catch (error) {
        console.log(error);
      }
    };

    const getRents = async () => {
      try {
        const { data } = await axios.get(`/api/listing/get?type=rent&limit=4`);
        setRentListings(data);
        getSales();
      } catch (error) {
        console.log(error);
      }
    };

    const getSales = async () => {
      try {
        const { data } = await axios.get(`/api/listing/get?type=sale&limit=4`);
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    getOffers();
  }, []);

  return (
    <main>
      {/* top  */}
      <div className="flex flex-col gap-6 py-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Find your next <span className="text-slate-500">perfect</span>
          <br /> place with ease
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          Dream Dwell is the best place to find your next perfect place to live.
          <br />
          We have a wide range of property for you to choose from.
        </div>
        <Link
          to={"/search"}
          className="text-sx sm:text-sm text-blue-800 font-bold hover:underline"
        >
          Let&apos;s get started
        </Link>
      </div>

      {/* swiper  */}
      <Swiper navigation>
        {offerListings.map((listing) => (
          <SwiperSlide key={listing._id}>
            <div
              className="h-[500px]"
              style={{
                background: `url(${listing.imageUrls[0]}) center no-repeat`,
                backgroundSize: "cover",
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* listing results  */}
      <div className="max-w-6xl mx-auto flex p-3 flex-col gap-8 my-10">
        {offerListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent Offers
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?offer=true"}
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListings.map((listing) => (
                <ListingCard listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {rentListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent Places for rent
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=rent"}
              >
                Show more places for rent
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing) => (
                <ListingCard listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for sale
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=sale"}
              >
                Show more places for sale
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleListings.map((listing) => (
                <ListingCard listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
