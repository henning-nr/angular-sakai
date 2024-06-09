import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';
import { Pet } from '../models/pet.model';

export interface Item {
    key?: string;
    name: string;
}

@Injectable({
    providedIn: 'root'
})
export class PetService {
    private dbPath = '/pets';
    petRef: AngularFireList<Pet> = null;

    constructor(private db: AngularFireDatabase) {
        this.petRef = db.list(this.dbPath);
    }

    getPets(): Observable<Pet[]> {
        return this.petRef.snapshotChanges().pipe(
            map(changes =>
                changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
            )
        );
    }

    addPet(pet: Pet): void {
        this.petRef.push(pet);
    }

    updatePet(key: string, value: any): void {
        this.petRef.update(key, value).catch(error => this.handleError(error));
    }

    private handleError(error) {
        console.log(error);
    }

    deletePet(key: string): void {
        this.petRef.remove(key);
    }
}
