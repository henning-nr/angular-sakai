import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { ClientComponent } from './demo/components/pages/client/client.component';
import { OrderComponent } from './demo/components/pages/order/order.component';
import { ProductComponent } from './demo/components/pages/product/product.component';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '', component: AppLayoutComponent,
        children: [
          { path: 'client', component: ClientComponent },
          { path: 'order', component: OrderComponent },
          { path: 'product', component: ProductComponent },
          { path: '', redirectTo: '/client', pathMatch: 'full' },
          { path: '**', redirectTo: '/notfound', pathMatch: 'full' }
        ]
      },
      { path: 'notfound', component: NotfoundComponent },
      { path: '**', redirectTo: '/notfound', pathMatch: 'full' }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
