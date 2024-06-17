// services/solicitation.service.ts
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Solicitation } from '../models/sol.models';
import { map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SolicitationService {
    private dbPath = '/solicitations';
    solicitationRef: AngularFireList<Solicitation> = null;

    constructor(private db: AngularFireDatabase) {
        this.solicitationRef = db.list(this.dbPath);
    }

    getSolicitations(): Observable<Solicitation[]> {
        return this.solicitationRef.snapshotChanges().pipe(
            map(changes =>
                changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
            )
        );
    }

    addSolicitation(solicitation: Solicitation): void {
        this.solicitationRef.push(solicitation);
    }

    updateSolicitation(key: string, value: any): void {
        this.solicitationRef.update(key, value).catch(error => this.handleError(error));
    }

    deleteSolicitation(key: string): void {
        this.solicitationRef.remove(key).catch(error => this.handleError(error));
    }

    private handleError(error) {
        console.log(error);
    }
}
