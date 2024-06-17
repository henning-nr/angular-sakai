export interface Tutor {
    key?: string;
    id?: string;
    logradouro?: string;
    nome?: string;
    rua?: string;
    bairro?: string;
    numero?: number;
    municipio?: string;
    cep?: string;
    estado?: string;
    telefone?: string;
    cpf?: string;
    sexo?: 'Masculino' | 'Feminino' | 'Outro';
}
