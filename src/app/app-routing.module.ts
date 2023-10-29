import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: 'user',
  loadChildren: () =>
    import('../app/modules/user/user.module').then(
      (m) => m.UserModule
    ),
},
{path:'home' , loadChildren:()=> import('../app/modules/home/home.module').then((m)=> m.HomeModule)},
{path : '' , redirectTo: 'user/address' ,pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
