import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'pet', loadChildren: () => import('./pet/crud.module').then(m => m.CrudModule) },

        { path: 'tutor', loadChildren: () => import('./tutor/crud.module').then(m => m.CrudModule) },

        { path: 'service', loadChildren: () => import('./service/crud.module').then(m => m.CrudModule) },

        { path: 'empty', loadChildren: () => import('./empty/emptydemo.module').then(m => m.EmptyDemoModule) },

        { path: 'solicitation', loadChildren: () => import('./solicitation/crud.module').then(m => m.CrudModule) },
        { path: 'timeline', loadChildren: () => import('./timeline/timelinedemo.module').then(m => m.TimelineDemoModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
