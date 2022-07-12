import {
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  Inject,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
 
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  backToPreview = 'Back To Preview';
  send = 'Send';
  @ViewChild('messagecontainer', { read: ViewContainerRef })
  entry!: ViewContainerRef;
  constructor(
    private cd: ChangeDetectorRef,
    private resolver: ComponentFactoryResolver,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.entry?.clear();
    const factory = this.resolver.resolveComponentFactory(this.data.component);
    const componentRef = this.entry.createComponent(factory);
    this.cd.detectChanges();
  }
}
