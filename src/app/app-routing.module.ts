import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogFormComponent } from './components/blog-form/blog-form/blog-form.component';
import { BlogListComponent } from './components/blog-list/blog-list/blog-list.component';

const routes: Routes = [
  { path: 'blog-list', component: BlogListComponent },
  { path: 'add-blog', component: BlogFormComponent },
  { path: '', redirectTo: '/blog-list', pathMatch: 'full' },
  { path: '**', redirectTo: '/blog-list' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
