import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';
import { Service } from '../models/service.models';

@Injectable({
    providedIn: 'root'
})
export class ServiceService {
    private dbPath = '/services';
    serviceRef: AngularFireList<Service> = null;

    constructor(private db: AngularFireDatabase) {
        this.serviceRef = db.list(this.dbPath);
    }

    getServices(): Observable<Service[]> {
        return this.serviceRef.snapshotChanges().pipe(
            map(changes =>
                changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
            )
        );
    }

    addService(service: Service): void {
        this.serviceRef.push(service);
    }

    updateService(key: string, value: any): void {
        this.serviceRef.update(key, value).catch(error => this.handleError(error));
    }

    deleteService(key: string): void {
        this.serviceRef.remove(key);
    }

    private handleError(error) {
        console.error(error);
    }
}
