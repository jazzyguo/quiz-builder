const loadingStyle = 'w-10 h-10 border-4 border-solid rounded-full border-t-[0.25rem] border-r-[0.25rem] border-t-white border-r-transparent animate-spin'

export const Loading = ({ className }: { className?: string }) => (
    <div className={`${loadingStyle} ${className}`}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
);
