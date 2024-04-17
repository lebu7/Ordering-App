export default function SuccessBox(children) {
    return (
        <div className="text-center bg-green-100 p-2 rounded-lg border border-green-300">
            {children}
        </div>
    );
}