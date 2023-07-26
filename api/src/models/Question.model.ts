import {
    Table,
    Column,
    Model,
    PrimaryKey,
    ForeignKey,
    BelongsTo,
    DataType,
    Default,
    HasMany,
} from 'sequelize-typescript';
import { Quiz } from './Quiz.model';
import { Answer } from './Answer.model';

export enum QuestionType {
    SingleAnswer = 'single-answer',
    MultipleAnswers = 'multiple-answers',
}

interface QuestionModelAttributes {
    id: string;
    title: string;
    type: QuestionType;
    quizId: string;
}

interface QuestionCreationAttributes extends QuestionModelAttributes {}

@Table
export class Question extends Model<
    QuestionCreationAttributes,
    QuestionCreationAttributes
> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id!: string;

    @Column
    title!: string;

    @Column({
        type: DataType.ENUM,
        values: Object.values(QuestionType),
    })
    type!: QuestionType;

    @ForeignKey(() => Quiz)
    @Column(DataType.UUID)
    quizId!: string;

    @BelongsTo(() => Quiz)
    quiz!: Quiz;

    @HasMany(() => Answer)
    answers!: Answer[];
}
