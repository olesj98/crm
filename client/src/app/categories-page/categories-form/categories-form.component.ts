import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Category, Message } from 'src/app/shared/interfaces';
import { MaterializeService } from 'src/app/shared/services/materialize.service';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit {
  @ViewChild('input') inputRef: ElementRef;

  isNew = true;
  form: FormGroup;
  image: File;
  imagePreview: string | ArrayBuffer = '';
  category: Category;

  constructor(
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    });

    this.form.disable();

    this.route.params.pipe(
      switchMap((params: Params) => {
        if (params.id) {
          this.isNew = false;
          return this.categoriesService.getById(params.id);
        }
        return of(null);
      })
    ).subscribe(
      (category: Category) => {
        if (category) {
          this.form.patchValue({ name: category.name });
          this.category = category;
          this.imagePreview = category.imgSrc;
          MaterializeService.updateTextInputs();
        }
        this.form.enable();
      },
      err => {
        this.form.enable();
        MaterializeService.toast(err.error.message);
      }
    );
  }

  onSubmit() {
    let obs$;
    this.form.disable();

    if (this.isNew) {
      obs$ = this.categoriesService.create(this.form.value.name, this.image);
    } else {
      obs$ = this.categoriesService.update(this.category._id, this.form.value.name, this.image);
    }

    obs$.subscribe(
      (category: Category) => {
        this.form.enable();
        MaterializeService.toast('Changes saved.');
        this.category = category;
      },
      err => {
        this.form.enable();
        MaterializeService.toast(err.error.message);
      }
    );
  }

  triggerClick() {
    this.inputRef.nativeElement.click();
  }

  onFileUpload(event: any) {
    const file = event.target.files[0];
    this.image = file;

    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result;
    };

    reader.readAsDataURL(file);
  }

  deleteCategory() {
    const decision = window.confirm(`Are you shure you want to remove category: "${this.category.name}"`);

    if (decision) {
      this.categoriesService.delete(this.category._id)
        .subscribe(
          (response: Message) => MaterializeService.toast(response.message),
          (err) => MaterializeService.toast(err.error.message),
          () => this.router.navigate(['/categories'])
        );
    }
  }

}
