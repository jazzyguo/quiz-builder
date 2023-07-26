import {
    Table,
    Column,
    Model,
    PrimaryKey,
    DataType,
    Default,
    HasMany,
} from 'sequelize-typescript';
import { Question } from './Question.model';

interface QuizModelAttributes {
    id: string;
    isPublished: boolean;
    permalink?: string;
    userId: string;
}

interface QuizCreationAttributes extends QuizModelAttributes {}

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
    permalink?: string;

    @Column // user id is coming from firebase auth
    userId!: string;

    @HasMany(() => Question)
    questions!: Question[];
}
