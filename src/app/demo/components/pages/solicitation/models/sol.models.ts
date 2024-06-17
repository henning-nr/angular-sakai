// pages/solicitation/models/solicitation.model.ts
import { Pet } from '../pet/services/pet.model';
import { Tutor } from '../tutor/services/tutor.model';
import { Servico } from '../service/services/servico.model';

export interface Solicitation {
    key?: string;
    id?: string;
    pet?: Pet;
    tutor?: Tutor;
    service?: Servico;
    date?: Date;
}
