import {
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { filter, switchMapTo, take } from 'rxjs/operators';

@Component({
  selector: 'app-edit-click',
  templateUrl: './edit-click.component.html',
  styleUrls: ['./edit-click.component.scss'],
})
export class EditClickComponent implements OnInit {
  @Input() value = 'string';
  @Output() update = new EventEmitter();

  @ContentChild('viewMode') viewModeTpl!: TemplateRef<any>;
  @ContentChild('editMode') editModeTpl!: TemplateRef<any>;

  mode: 'view' | 'edit' = 'view';

  editMode = new Subject();
  editMode$ = this.editMode.asObservable();

  constructor(private host: ElementRef) {}

  ngOnInit(): void {
    this.viewModeHandler();
    this.editModeHandler();
  }

  get currentView(): any {
    return this.mode === 'view' ? this.viewModeTpl : this.editModeTpl;
  }

  private get element() {
    return this.host.nativeElement;
  }

  private viewModeHandler() {
    fromEvent(this.element, 'dblclick')
      .pipe()
      .subscribe(() => {
        this.mode = 'edit';
        this.editMode.next(true);
      });
  }

  private editModeHandler() {
    const clickOutside$ = fromEvent(document, 'click').pipe(
      filter(({ target }) => this.element.contains(target) === false),
      take(1)
    );

    this.editMode$.pipe(switchMapTo(clickOutside$)).subscribe((event) => {
      this.update.next();
      this.mode = 'view';
    });
  }
}
