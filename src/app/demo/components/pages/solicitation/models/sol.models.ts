// pages/solicitation/models/solicitation.model.ts
import { Pet } from '../../pet/models/pet.model';
import { Tutor } from '../../tutor/models/tutor.model';
import { Service } from '../../service/models/service.models';

export interface Solicitation {
    key?: string;
    id?: string;
    pet?: Pet;
    tutor?: Tutor;
    service?: Service;
    date?: Date;
}
