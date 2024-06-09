export interface Tutor {
    key?: string;
    id?: string;
    nome?: string;
    rua?: string;
    bairro?: string;
    numero?: number;
    cidade?: string;
    cep?: string;
    estado?: string;
    telefone?: string;
    cpf?: string;
    sexo?: 'Masculino' | 'Feminino' | 'Outro';
}
