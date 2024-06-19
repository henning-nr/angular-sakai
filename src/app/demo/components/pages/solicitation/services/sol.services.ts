// services/solicitation.service.ts
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Solicitation } from '../models/sol.models';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

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

    addSolicitation(solicitation: Solicitation): Observable<any> {
        return new Observable<any>((observer) => {
            this.solicitationRef.push(solicitation)
                .then(() => {
                    observer.next();
                    observer.complete();
                })
                .catch(error => {
                    observer.error(error);
                });
        });
    }

    updateSolicitation(key: string, value: any): Observable<any> {
        return new Observable<any>((observer) => {
            this.solicitationRef.update(key, value)
                .then(() => {
                    observer.next();
                    observer.complete();
                })
                .catch(error => {
                    observer.error(error);
                });
        });
    }

    deleteSolicitation(key: string): Observable<any> {
        return new Observable<any>((observer) => {
            this.solicitationRef.remove(key)
                .then(() => {
                    observer.next();
                    observer.complete();
                })
                .catch(error => {
                    observer.error(error);
                });
        });
    }
}
