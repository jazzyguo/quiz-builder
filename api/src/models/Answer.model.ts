import {
    Table,
    Column,
    Model,
    PrimaryKey,
    ForeignKey,
    BelongsTo,
    DataType,
    Default,
} from 'sequelize-typescript';
import { Question } from './Question.model';

interface AnswerModelAttributes {
    id: string;
    text: string;
    isCorrect: boolean;
    questionId: string;
}

interface AnswerCreationAttributes extends AnswerModelAttributes {}

@Table
export class Answer extends Model<
    AnswerModelAttributes,
    AnswerCreationAttributes
> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id!: string;

    @Column
    text!: string;

    @Column
    isCorrect!: boolean;

    @ForeignKey(() => Question)
    @Column(DataType.UUID)
    questionId!: string;

    @BelongsTo(() => Question)
    question!: Question;
}
