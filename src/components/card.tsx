import { ReactNode } from "react";
import { Quote } from "lucide-react";
import Image, { StaticImageData } from "next/image";
type card = {
  description: string;
  img: StaticImageData;
  name: string;
};
function Card({ name, img, description }: card): ReactNode {
  return (
    <div className="flex flex-row xl:gap-14 gap-5 border border-gray-400 rounded-4xl md:p-11 p-7 m-5 md:mx-10 xl:w-full md:w-150 w-80">
      <Quote width={200} height={100} />
      <div className="flex flex-col py-5 gap-10">
        <p className="text-md md:text-3xl">{description}</p>
        <div className="flex flex-row md:justify-start justify-center h-fit items-center gap-3">
          <div className="w-15 h-15 rounded-full overflow-hidden shrink-0">
            <Image src={img} alt="" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-[13px] md:text-sm">{name}</h2>
        </div>
      </div>
    </div>
  );
}
export default Card;
