import {
  amnis,
  aptos,
  aries,
  liquy,
  merkl,
  pancake,
  thala,
} from "@/assets/home";
import SVG from "react-inlinesvg";

const Logo = () => {
  const imagesLogo = [
    // sushi,
    aptos,
    aries,
    amnis,
    thala,
    pancake,
    liquy,
    merkl,
    // sushi,
    aptos,
    aries,
    amnis,
    thala,
    pancake,
    liquy,
    merkl,
  ];
  return (
    <>
      <div className="h-[104px] sm:h-[168px] relative ">
        <div
          className={` flex items-center  sm:py-16 py-8 gap-24 absolute`}
          style={{
            animation: "slideRight 15s linear infinite",
          }}
          id="logo"
        >
          {imagesLogo?.map((ele, index) => {
            return (
              <div key={index}>
                <SVG src={ele} height={40} className="flex-shrink-0 " />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default Logo;
