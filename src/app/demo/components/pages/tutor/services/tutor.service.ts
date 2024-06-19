import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';
import { Tutor } from '../models/tutor.model';

export interface Item {
    key?: string;
    name: string;
}

@Injectable({
    providedIn: 'root'
})
export class TutorService {
    private dbPath = '/tutors';
    tutorRef: AngularFireList<Tutor> = null;

    constructor(private db: AngularFireDatabase) {
        this.tutorRef = db.list(this.dbPath);
    }

    getTutors(): Observable<Tutor[]> {
        return this.tutorRef.snapshotChanges().pipe(
            map(changes =>
                changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
            )
        );
    }

    addTutor(tutor: Tutor): void {
        this.tutorRef.push(tutor);
    }

    updateTutor(key: string, value: any): void {
        this.tutorRef.update(key, value).catch(error => this.handleError(error));
    }

    private handleError(error) {
        console.log(error);
    }

    deleteTutor(key: string): void {
        this.tutorRef.remove(key);
    }
}
