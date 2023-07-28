import { memo, useCallback, useEffect, useState } from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';

import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Tooltip from '@mui/material/Tooltip';

import { Quiz } from "@/types"

type Props = {
    quiz: Quiz;
    handleEdit: (quizId: string) => void;
    handleDelete: (quizId: string, isPublished: boolean) => void;
}

const CTAStyles = {
    "&:hover": {
        opacity: 0.5,
        cursor: "pointer",
    },
}

const _QuizListItem = ({
    quiz,
    handleEdit,
    handleDelete,
}: Props) => {
    const { isPublished, id, permalinkId, title, } = quiz

    const [copied, setCopied] = useState<boolean>(false);

    const shareUrl = permalinkId && `${process.env.NEXT_PUBLIC_BASE_URL}/permalink/${permalinkId}`

    // copied text lasts 3 seconds
    useEffect(() => {
        if (copied) {
            setTimeout(() => setCopied(false), 3000)
        }
    }, [copied])

    const handleCopy = useCallback(() => {
        setCopied(true)
    }, [])

    if (!id) {
        return null
    }

    return (
        <div
            className="mb-8 bg-secondary p-6 border-box flex justify-between"
        >
            <div className="flex">
                {!isPublished ?
                    <Tooltip title="Edit Quiz">
                        <EditIcon
                            sx={CTAStyles}
                            onClick={() => handleEdit(id)}
                            data-testid="edit-quiz"
                        />
                    </Tooltip>
                    :
                    <BookmarkAddedIcon data-testid="published-quiz" />
                }
                <Tooltip title={title}>
                    <h3 className="my-0 ml-4 truncate max-w-[350px]">{title}</h3>
                </Tooltip>
            </div>
            <div className="flex">
                {copied && <span className="mr-4 text-[#90caf9]">Copied</span>}
                {isPublished && shareUrl &&
                    <CopyToClipboard text={shareUrl}>
                        <div
                            className="flex hover:opacity-50 cursor-pointer mr-8"
                            onClick={handleCopy}
                        >
                            <span className="mr-2">Share url</span>
                            <ContentCopyIcon
                                sx={CTAStyles}
                                data-testid="copy-quiz-share-url"
                            ></ContentCopyIcon>
                        </div>
                    </CopyToClipboard>
                }
                <Tooltip title="Delete Quiz">
                    <CloseIcon
                        sx={CTAStyles}
                        onClick={() => handleDelete(id, isPublished)}
                        data-testid="delete-quiz"
                    />
                </Tooltip>
            </div>
        </div >
    )
}

export const QuizListItem = memo(_QuizListItem)
