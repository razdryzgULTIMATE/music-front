import {Component, inject, signal} from '@angular/core';
import {ITag} from '../../../interfaces/ITag';
import {FormBuilder, Validators} from '@angular/forms';
import {ITrack} from '../../../interfaces/ITrack';
import {TagService} from '../../../services/tag/tag.service';
import {AdminModalComponent} from '../admin-modal/admin-modal.component';

@Component({
  selector: 'app-admin-tag',
  imports: [AdminModalComponent],
  templateUrl: './admin-tag.component.html',
  styleUrl: '../admin-album/admin-album.component.css'
})
export class AdminTagComponent {
  tags: ITag[] = []
  private tagService = inject(TagService)
  private fb = inject(FormBuilder);
  showModal = signal(false);
  modalTitle = signal('Добавить тег');
  currentGenreId = signal<number | null>(null);
  formFields = [
    {name: 'name', label: 'Название', type: 'text', required: true},
    {name: 'albumId', label: "Id альбома", type: 'number', required: true}
  ];
  tagForm = this.fb.group({
    name: ['', Validators.required],
    id: [0],
    albumId: [0]
  });

  ngOnInit(): void {
    this.tagService.getAll().subscribe(data => this.tags.push(...data))
  }


  openAdd() {
    this.modalTitle.set('Добавить тег');
    this.currentGenreId.set(null);
    this.tagForm.reset();
    this.showModal.set(true);
  }

  openEdit(tag: ITag) {
    this.modalTitle.set('Редактировать тег');
    this.currentGenreId.set(tag.id);
    this.tagForm.patchValue({
      name: tag.name,
      id: tag.id,
      albumId: 0 // !
    })
    this.showModal.set(true);
  }

  save() {
    if (this.tagForm.invalid) return;
    console.log(this.tagForm.value)
    const t: ITag = {
      id: this.tagForm.value.id!,
      name: this.tagForm.value.name!
    }
    if(this.tagForm.value.albumId! > 0){
      this.tagService.createTag(t, this.tagForm.value.albumId!).subscribe(data => this.tags.push(data))
    }
    this.closeModal();
  }

  delete(id: number) {
    if (confirm('Удалить тег?')) {
      this.tagService.deleteTag(id).subscribe()
      this.tags = this.tags.filter(t => t.id !== id)
    }
  }

  closeModal() {
    this.showModal.set(false);
  }
}
