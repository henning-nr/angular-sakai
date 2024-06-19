interface InventoryStatus {
    label: string;
    value: string;
}
export interface Pet {
    key?: string;
    id?: string;
    nome?: string;
    especie?: string;
    idade?: number;
    dataNascimento?: Date;
    peso?: number;
    cor?: string;
    sexo?: 'Masculino' | 'Feminino' | 'Outro';
}
