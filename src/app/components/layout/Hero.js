import Image from "next/image";
import Right from "../icons/Right";

export default function Hero() {
    return (
            <section className="hero mt-4">
                <div className="py-12">
                <h1 className="text-4xl font-semibold ">
                    Fashion <br/>
                     that fits your <br />
                     style, &nbsp;
                    <span className="text-primary" >
                        SHEIN
                    </span> 
                </h1>
                <p className="my-6 text-gray-500 text-sm">
                    Where vibrant colors, and sophisticated silhouettes come creates a fearless and fabulous wardrobe.
                </p>
                <div className="flex gap-4 text-sm">
                    <button className="bg-primary uppercase flex items-center gap-2 text-white px-4 py-3 rounded-full">
                            Order now
                            <Right />
                    </button>
                    <button className="flex gap-2 py-2 text-gray-600 font-semibold">
                            Learn more
                            <Right />
                    </button>
                </div>
                </div>
                <div className="relative">
                <Image src={'/split-hem3.png'} layout={'fill'} objectFit={'contain'} alt={'KidInOutfit'} />
                </div>
            </section>
    );
}