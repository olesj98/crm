import { ElementRef } from '@angular/core';

declare var M;

export interface ModalInstance {
    open?(): void;
    close?(): void;
    destroy?(): void;
}

export interface MaterialDatepicker extends ModalInstance {
    date?: Date;
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

    static initTooltip(ref: ElementRef): ModalInstance {
        return M.Tooltip.init(ref.nativeElement);
    }

    static initDatepicker(ref: ElementRef, onClose: () => void): MaterialDatepicker {
        return M.Datepicker.init(ref.nativeElement, {
            format: 'dd.mm.yyyy',
            showClearBtn: true,
            onClose
        });
    }

    static initTapTarget(elemRef: ElementRef): ModalInstance {
        return M.TapTarget.init(elemRef.nativeElement);
    }
}
