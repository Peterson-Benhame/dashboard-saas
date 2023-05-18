import SignOut from "@app/components/layout/sign-out";
import { getServerSidePropsWithSession } from "@app/middlewares/with-auth";

export default function Home() {
  return (
    <div className="flex h-screen bg-black">
      <div className="w-screen h-screen flex flex-col space-y-5 justify-center items-center">
        <iframe
          src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full max-w-screen-lg aspect-video"
        ></iframe>
        <SignOut />
      </div>
    </div>
  );
}

export const getServerSideProps = getServerSidePropsWithSession((data) => ({
  subscription: data,
}));
