import { PostagemModel } from './PostagemModel';

export class TemaModel {
    public id: number;
    public nome: string;
    public descricao: string;
    public status: boolean;
    public postagem: PostagemModel[];
}