import {
    Table,
    Column,
    Model,
    PrimaryKey,
    DataType,
    Default,
    HasMany,
    Scopes,
} from 'sequelize-typescript';
import { Question } from './Question.model';
import { Answer } from './Answer.model';

interface QuizModelAttributes {
    id: string;
    title: string;
    isPublished: boolean;
    permalinkId?: string;
    userId: string;
}

interface QuizCreationAttributes extends QuizModelAttributes {}

// We need 2 scopes, one for editing the quiz (show answer isCorrect)
// and one for taking the quiz (dont show answer isCorrect)
@Scopes(() => ({
    withQuestionsAndAnswersIsCorrect: {
        include: [
            {
                model: Question,
                as: 'questions',
                include: [
                    {
                        model: Answer,
                        as: 'answers',
                    },
                ],
            },
        ],
    },
    withQuestionsAndAnswersTextOnly: {
        include: [
            {
                model: Question,
                as: 'questions',
                include: [
                    {
                        model: Answer,
                        as: 'answers',
                        attributes: { exclude: ['isCorrect'] },
                    },
                ],
            },
        ],
    },
}))
@Table
export class Quiz extends Model<QuizModelAttributes, QuizCreationAttributes> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id!: string;

    @Column
    title!: string;

    @Column
    isPublished!: boolean;

    @Default(null)
    @Column
    permalinkId?: string;

    @Column // user id is coming from firebase auth
    userId!: string;

    @HasMany(() => Question, {
        onDelete: 'CASCADE',
    })
    questions!: Question[];
}
