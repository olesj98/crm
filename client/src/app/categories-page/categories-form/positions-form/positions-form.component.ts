import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { PositionsService } from 'src/app/shared/services/positions.service';
import { Position, Message } from 'src/app/shared/interfaces';
import { MaterializeService, ModalInstance } from 'src/app/shared/services/materialize.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.scss']
})
export class PositionsFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() categoryId: string;
  @ViewChild('modal') modalRef: ElementRef;

  positions: Position[] = [];
  loading = true;
  modal: ModalInstance;
  form: FormGroup;
  positionId = null;

  constructor(
    private positionsService: PositionsService
  ) { }

  ngOnInit() {
    this.positionsService.fetch(this.categoryId).subscribe(
      (positions: Position[]) => {
        this.positions = positions;
        this.loading = false;
      }
    );

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      cost: new FormControl(1, [Validators.required, Validators.min(1)])
    });
  }

  ngAfterViewInit() {
    this.modal = MaterializeService.initModal(this.modalRef);
  }

  ngOnDestroy() {
    this.modal.destroy();
  }

  onSelectPosition(position: Position) {
    this.positionId = position._id;
    this.form.patchValue({
      name: position.name,
      cost: position.cost
    });
    this.modal.open();
    MaterializeService.updateTextInputs();
  }

  onCancell() {
    this.modal.close();
  }

  onAddPosition() {
    this.positionId = null;
    this.form.reset({
      name: '',
      cost: 1
    });
    this.modal.open();
    MaterializeService.updateTextInputs();
  }

  onDeletePosition(event: Event, position: Position) {
    event.stopPropagation();
    const decision = window.confirm(`Are you shure you want to delete "${position.name}"?`);

    if (decision) {
      this.positionsService.delete(position._id).subscribe(
        (message: Message) => {
          this.positions = this.positions.filter((pos: Position) => position._id !== pos._id);
          MaterializeService.toast(message.message);
        },
        error => MaterializeService.toast(error.error.message)
      );
    }
  }

  onSubmit() {
    this.form.disable();

    const completed = () => {
      this.modal.close();
      this.form.reset({ name: '', cost: 1 });
      this.form.enable();
    };

    const newPosition: Position = {
      name: this.form.value.name,
      cost: this.form.value.cost,
      category: this.categoryId,
    };
    if (this.positionId) {
      newPosition._id = this.positionId;
      this.positionsService.update(newPosition).subscribe(
        (position: Position) => {
          MaterializeService.toast('Position updated');
          const positionToUpdateIndex = this.positions.findIndex((pos: Position) => pos._id === position._id);
          this.positions[positionToUpdateIndex] = position;
        },
        error => MaterializeService.toast(error.error.message),
        completed
      );
    } else {
      this.positionsService.create(newPosition).subscribe(
        (position: Position) => {
          MaterializeService.toast('Position added');
          this.positions.push(position);
        },
        error => MaterializeService.toast(error.error.message),
        completed
      );
    }
  }
}
