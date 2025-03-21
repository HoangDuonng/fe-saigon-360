export default function Panoramas() {
    return (
        <div className="w-full h-screen">
            <iframe
                src="/viewer/examples/webvr/index.html"
                title="360 Tour"
                className="w-full h-full shadow-lg rounded-lg"
                loading="lazy"
            />
        </div>
    )
}
