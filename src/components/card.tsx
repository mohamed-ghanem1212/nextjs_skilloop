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
    <div className="flex flex-row gap-14 border border-gray-400 rounded-4xl md:p-11 p-7 m-5 md:mx-10">
      <Quote width={200} height={100} />
      <div className="flex flex-col py-5 gap-10">
        <p className="text-md md:text-3xl">{description}</p>
        <div className="flex flex-row md:justify-start justify-center items-center gap-3 h-full">
          <div className="rounded-full overflow-hidden w-14 h-14 md:w-14 relative">
            <Image src={img} alt="" fill className="object-cover" />
          </div>
          <h2 className="text-[13px] md:text-sm">{name}</h2>
        </div>
      </div>
    </div>
  );
}
export default Card;
