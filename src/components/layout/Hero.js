'use client';
import ChevronDown from "@/components/icons/ChevronDown";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Hero() {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
       fetch('/api/categories').then(res => {
           res.json().then(categories => setCategories(categories))
       });
    }, []);

  return (
    <section>
        <div className="my-8 grid grid-cols-1 md:grid-cols-3 [min-height:400px]">
            <div className="hidden md:block">
                <div className="text-center text-white text-sm font-semibold bg-primary rounded-sm items-center">
                    <span>
                        Categories <ChevronDown className="w-4 h-4" />
                        
                    </span>
                </div>
                <div>
                    {categories?.length > 0 && categories.map(c => (
                        <div key={c._id} className="md:col-span-3">
                            <div className="text-center">
                                <span>{c.name} </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-subgrid col-span-2 bg-black place-items-center">
                <div className="m-auto">
                    <div className="flex justify-center items-center">
                        <Image 
                            src="/HauteDesign.png" 
                            className="max-w-full"
                            alt="hero image" 
                            objectFit="contain"
                            width={400}
                            height={400}
                         />
                    </div>
                </div>
            </div>

        </div>
    </section>
  );
}

