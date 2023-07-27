import { Quiz } from "@/types"
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Tooltip from '@mui/material/Tooltip';

type Props = {
    quiz: Quiz
}

const CTAStyles = {
    "&:hover": {
        opacity: 0.5,
        cursor: "pointer",
    },
}

export const QuizListItem = ({ quiz }: Props) => {
    const { isPublished, id, permalinkId, title, } = quiz
    return (
        <div
            className="mb-8 bg-secondary p-6 border-box flex justify-between"
        >
            <div className="flex">
                {!isPublished ?
                    <Tooltip title="Edit Quiz">
                        <EditIcon
                            sx={CTAStyles}
                            onClick={() => console.log('edit', id)}
                            data-testid="edit-quiz"
                        />
                    </Tooltip>
                    :
                    <BookmarkAddedIcon data-testid="published-quiz" />
                }
                <h3 className="my-0 ml-4">{title}</h3>
            </div>
            <div className="flex">
                {isPublished && permalinkId &&
                    <Tooltip title="Click to copy share url">
                        <div
                            className="flex hover:opacity-50 cursor-pointer mr-8"
                            onClick={() => console.log('copy url', permalinkId)}
                        >
                            <span className="mr-2">Share url</span>
                            <ContentCopyIcon
                                sx={CTAStyles}
                                data-testid="copy-quiz-share-url"
                            ></ContentCopyIcon>
                        </div>
                    </Tooltip>
                }
                <Tooltip title="Delete Quiz">
                    <CloseIcon
                        sx={CTAStyles}
                        onClick={() => console.log('deleting', id)}
                        data-testid="delete-quiz"
                    />
                </Tooltip>
            </div>
        </div >
    )
}
