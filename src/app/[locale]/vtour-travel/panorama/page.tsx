
export default function Panoramas() {
    return (
        <div style={{ height: "100vh" }}>
            <iframe
                src={`/panoramas/vtour/en/toancanh.html`}
                title="360 Tour"
                className="w-full h-full shadow-lg rounded-lg"
                loading="lazy"
            />
        </div>
    )
}
