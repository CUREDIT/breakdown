import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  NbLayoutModule,
  NbMenuModule,
  NbSidebarModule,
  NbCardModule,
  NbIconModule,
  NbActionsModule,
  NbSearchModule,
  NbDialogModule,
  NbButtonModule
} from '@nebular/theme';

import { WorkspaceRoutingModule } from './workspace-routing.module';
import { WorkspaceComponent } from './workspace.component';
import { LayoutModule } from '../layout/layout.module';
import { NetworkViewComponent } from './content/network-view/network-view.component';
import { TreeViewComponent } from './content/tree-view/tree-view.component';
import { EditorComponent } from './editor/editor.component';
import { ContentComponent } from './content/content.component';
import { NodeComponent } from './content/network-view/node/node.component';
import { EdgeComponent } from './content/network-view/edge/edge.component';
import { InitBarComponent } from './init-bar/init-bar.component';
import { NewComponent } from './init-bar/new/new.component';
import { D3DragDirective } from '../shared/d3/d3-drag.directive';
import { VisNetDirective } from '../shared/vis/vis-net.directive';



@NgModule({
  declarations: [
    WorkspaceComponent,
    NetworkViewComponent,
    TreeViewComponent,
    EditorComponent,
    ContentComponent,
    NodeComponent,
    EdgeComponent,
    D3DragDirective,
    InitBarComponent,
    NewComponent,
    VisNetDirective
  ],
  imports: [
    CommonModule,
    FormsModule,

    NbMenuModule,
    NbLayoutModule,
    NbSidebarModule,
    NbCardModule,
    NbIconModule,
    NbActionsModule,
    NbSearchModule,
    NbButtonModule,
    NbDialogModule.forChild(),

    LayoutModule,

    WorkspaceRoutingModule,
  ],
  entryComponents: [NewComponent],
  exports: [WorkspaceComponent]
})
export class WorkspaceModule { }
