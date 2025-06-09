import Image from "next/image";


const Banner = () => {
  return (
    <div className="relative w-full h-72 md:h-96 overflow-hidden rounded-2xl shadow-md">
      <Image
        src="/images/banner_image.jpg"
        alt="Blog Banner"
        fill
        className="object-cover brightness-75"
        priority
      />
      <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
        <div className="text-white space-y-2">
          <h1 className="text-3xl md:text-5xl font-bold drop-shadow-lg">Posts</h1>
          <p className="text-sm md:text-lg max-w-xl mx-auto text-white/90">
            Discover insights, tutorials, and stories from the frontend world. Learn. Build. Grow.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
