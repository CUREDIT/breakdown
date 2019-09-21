import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkspaceComponent } from './workspace.component';
import { ContentComponent } from './content/content.component';
import { NetworkViewComponent } from './content/network-view/network-view.component';
import { TreeViewComponent } from './content/tree-view/tree-view.component';
import { InitBarComponent } from './init-bar/init-bar.component';


const routes: Routes = [
  {
    path: '',
    component: WorkspaceComponent,
    children: [
      {
        path: '',
        component: InitBarComponent
      },
      {
        path: ':book',
        component: ContentComponent,
        // children: [
        //   {
        //     path: 'net',
        //     component: NetworkViewComponent
        //   },
        //   {
        //     path: 'tree',
        //     component: TreeViewComponent
        //   }
        // ]
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspaceRoutingModule { }
