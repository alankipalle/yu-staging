import { LightningElement, api, track} from 'lwc';

export default class RecordEditForm extends LightningElement {
  
    @api showModal = false;
    @api message;
    @api modalHeading;

    @api
    openModal() {
        this.showModal = true;
    }

    @api
    closeModal() {
        this.showModal = false;
    }
}