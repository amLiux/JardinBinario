interface SwiperHeaderProps {
    title: string;
    highlight?: string;
    copy?: string;
}


export const ModernHeader = ({ title, highlight, copy }: SwiperHeaderProps) => {
    return (
        <header className="w-full">
            <div className="container mx-auto px-4">
                <h3 className="text-5xl md:text-7xl font-normal text-white flex items-center gap-4 pb-0">
                    {title}
                    <span className="text-4xl md:text-4xl font-thin">{highlight}</span>
                    <span className="text-3xl md:text-4xl text-white/60">→</span>
                </h3>
                {copy && <span className="text-lg text-muted-foreground">
                    {copy}
                </span>}
            </div>
        </header>
    )
}