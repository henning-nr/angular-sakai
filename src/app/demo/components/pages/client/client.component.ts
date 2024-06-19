import { Component, OnInit } from '@angular/core';
import { Client } from './models/client.model';
import { ClientService } from './services/client.service';

@Component({
  templateUrl: './client.component.html'
})
export class ClientComponent implements OnInit {

  clients: Client[] = [];
  client: Client = {};
  selectedClient: Client;
  displayDialog: boolean;

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
    });
  }

  showDialogToAdd(): void {
    this.client = {};
    this.displayDialog = true;
  }

  save(): void {
    if (this.client.key) {
      this.clientService.updateClient(this.client.key, this.client).subscribe(() => {
        this.updateClients();
        this.client = {};
        this.displayDialog = false;
      });
    } else {
      this.clientService.addClient(this.client).subscribe(() => {
        this.updateClients();
        this.client = {};
        this.displayDialog = false;
      });
    }
  }

  delete(): void {
    if (this.client.key) {
      this.clientService.deleteClient(this.client.key).subscribe(() => {
        this.updateClients();
        this.client = {};
        this.displayDialog = false;
      });
    }
  }

  updateClients(): void {
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
    });
  }

  onRowSelect(event): void {
    this.client = { ...event.data };
    this.displayDialog = true;
  }
}
