import { RouterModule, Routes } from '@angular/router';

import { ContentComponent } from './content/content.component';
import { InitBarComponent } from './init-bar/init-bar.component';
import { NgModule } from '@angular/core';
import { OpenComponent } from './bookmarks/open/open.component';
import { WorkspaceComponent } from './workspace.component';

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
        path: 'new',
        component: InitBarComponent
      },
      {
        path: 'open',
        component: OpenComponent
      },
      {
        path: 'content/:note',
        component: ContentComponent
      },
      {
        path: 'context/:note',
        component: ContentComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspaceRoutingModule {}
