import { ElementRef } from '@angular/core';

declare var M;

export interface ModalInstance {
    open?(): void;
    close?(): void;
    destroy?(): void;
}

export class MaterializeService {
    static toast(message: string) {
        M.toast({ html: message });
    }

    static initializeFloatingButoon(ref: ElementRef) {
        M.FloatingActionButton.init(ref.nativeElement);
    }

    static updateTextInputs() {
        M.updateTextFields();
    }

    static initModal(ref: ElementRef): ModalInstance {
        return M.Modal.init(ref.nativeElement);
    }
}
