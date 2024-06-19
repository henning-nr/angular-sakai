import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireStorageModule } from "@angular/fire/compat/storage";
import { environment } from "../environments/environment";
import { OrderModule } from './demo/components/pages/orders/order.module'; // Corrigido o caminho do módulo de pedidos
import { MessageService } from 'primeng/api';

@NgModule({
    declarations: [
        AppComponent, 
        NotfoundComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AppLayoutModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireStorageModule,
        OrderModule,
        RouterModule.forRoot([]) // Certifique-se de configurar corretamente as rotas principais aqui
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        CountryService,
        CustomerService,
        EventService,
        IconService,
        NodeService,
        PhotoService,
        ProductService,
        MessageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
