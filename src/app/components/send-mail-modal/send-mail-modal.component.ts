import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  AfterViewInit,
  AfterContentInit,
  ChangeDetectorRef,
} from '@angular/core';

@Component({
  selector: 'app-send-mail-modal',
  templateUrl: './send-mail-modal.component.html',
  styleUrls: ['./send-mail-modal.component.scss'],
})
export class SendMailModalComponent {
  backToPreview = 'Back To Preview';
  send = 'Send';
}
