import Header from "../components/layout/Header"
import Hero from "../components/layout/Hero"
import HomeMenu from "../components/layout/HomeMenu"
import SectionHeaders from "../components/layout/SectionHeaders"


export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16">
        <SectionHeaders 
          subHeader={'Our story'}
          mainHeader={'About us'}
        />
        <div className="text-black max-w-2xl mx-auto mt-4 flex flex-col gap-4">
          <p>
            We're passionate about bringing you the latest trends and hottest styles from SHEIN, the ultimate destination for fashion-forward individuals. As avid followers of SHEIN's diverse and eclectic collections, we curate a handpicked selection of their most coveted pieces. From chic dresses and stylish tops to trendy accessories, our inventory showcases the best of what SHEIN has to offer, allowing you to express your unique sense of style effortlessly. With affordability, and customer satisfaction, we strive to make your shopping experience seamless and enjoyable. Shop with us and discover the endless possibilities of SHEIN fashion today!
          </p>
          <p>
          Our mission is simple: to provide you with access to SHEIN's trendsetting fashion at unbeatable prices. With a focus on customer satisfaction and a dedication to staying ahead of the curve, we're committed to making your shopping experience both convenient and enjoyable. Browse our curated selection, shop with confidence, and elevate your style effortlessly with SHEIN and our trusted platform.
          </p>
        </div>
      </section>
      <section className="text-center my-8">
        <SectionHeaders 
          subHeader={'Dont\'t hesitate'}
          mainHeader={'Contactn us'}
        />
        <div className="mt-8">
          <a className="text-4xl underline text-gray-500" hrerf="tel:+254115308082">
          +254 115 308 082
          </a>
        </div>
      </section>
    </>
  )
}
