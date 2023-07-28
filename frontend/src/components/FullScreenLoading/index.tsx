import { CircularProgress } from "@mui/material";

export const FullScreenLoading = () => (
    <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center">
        <CircularProgress color="primary" />
    </div>
)
