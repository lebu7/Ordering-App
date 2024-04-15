export default function StockItem() {
    return (
        <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
            <div className="text-center">
                <img src="/hem-tank-top.png" className="max-h-auto max-h-24 block mx-auto" alt="crop-top" />
            </div>
            <h4 className="font-semibold text-xl my-3">Hem Tank Top</h4>
            <p className="text-gray-500 text-sm">
            Burgundy Portrait Print Irregular Hem Tank Top
            </p>
            <button className="mt-4 bg-primary text-white rounded-full px-8 py-2">Add to cart </button>
        </div>
    );
}