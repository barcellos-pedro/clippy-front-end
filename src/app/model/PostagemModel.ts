import { UsuarioModel } from './UsuarioModel';
import { TemaModel } from './TemaModel';

export class PostagemModel {
    public id: number;
    public titulo: string;
    public conteudo: string;
    public referencia: string;
    public data: Date;
    public tema: TemaModel;
    public usuario: UsuarioModel;
}