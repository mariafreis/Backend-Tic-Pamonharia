import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('finances')
class Finance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  descricao: string;

  @Column()
  natureza: string;

  @Column('decimal')
  valor: number;

  @Column('int')
  parcelas: number;

  @CreateDateColumn()
  created_at: Date;
}

export default Finance;
