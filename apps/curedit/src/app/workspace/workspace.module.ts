import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbDialogModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbListModule,
  NbMenuModule,
  NbSearchModule,
  NbSidebarModule,
  NbTreeGridModule,
  NbWindowModule
} from '@nebular/theme';

import { LayoutModule } from '../layout/layout.module';
import { OpenComponent } from './bookmarks/open/open.component';
import { ContentComponent } from './content/content.component';
import { NetworkViewComponent } from './content/network-view/network-view.component';
import { TreeViewComponent } from './content/tree-view/tree-view.component';
import { EditorComponent } from './editor/editor.component';
import { InitBarComponent } from './init-bar/init-bar.component';
import { NewComponent } from './init-bar/new/new.component';
import { WorkspaceRoutingModule } from './workspace-routing.module';
import { WorkspaceComponent } from './workspace.component';
import { FsIconComponent } from './bookmarks/open/fs-icon/fs-icon.component';

@NgModule({
  declarations: [
    WorkspaceComponent,
    NetworkViewComponent,
    TreeViewComponent,
    EditorComponent,
    ContentComponent,
    InitBarComponent,
    NewComponent,
    OpenComponent,
    FsIconComponent
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
    NbWindowModule.forChild({
      closeOnBackdropClick: false,
      closeOnEsc: false,
      hasBackdrop: true
    }),
    NbListModule,
    NbTreeGridModule,
    NbInputModule,

    LayoutModule,
    WorkspaceRoutingModule
  ],
  entryComponents: [NewComponent, EditorComponent],
  exports: [WorkspaceComponent]
})
export class WorkspaceModule {}
