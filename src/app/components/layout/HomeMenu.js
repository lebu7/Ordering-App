import Image from "next/image";
import StockItem from "../stock/StockItem";
import SectionHeaders from "./SectionHeaders";

export default function HomeMenu() {
    return (
        <section className="">
            <div className="absolute left-0 right-0 w-full justify-start ">
                <div className="absolute left-0 -top-[70px] text-left -z-10 ">
                    <Image src={'/yoga-pants.png'} width={109} height={189} alt={'yoga-pants'} />
                </div>
                <div className="absolute -top-[100px] right-0 -z-10">
                    <Image src={'/kid.png'} width={107} height={195} alt={'kids'} />
                </div>
            </div>
            <div className="text-center mb-4">
                <SectionHeaders 
                    subHeader={'Purcahse'}
                    mainHeader={'Stock'}
                    />
            </div>
            <div className="grid grid-cols-3 gap-4">
                <StockItem />
                <StockItem />
                <StockItem />
                <StockItem />
                <StockItem />
                <StockItem />
            </div>
        </section>
    );
}