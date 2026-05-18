export default function BackgroundEffects() {
    return (
        <>
            <div className="absolute inset-0 opacity-[0.04]" 
                style={{
                    backgroundImage:"linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />

            <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] rounded-full bg-violet-600 opacity-10 blur-[120px]" />

            <div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] rounded-full bg-cyan-500 opacity-10 blur-[120px]" />
        </>
    );
}
