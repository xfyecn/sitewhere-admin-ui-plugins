import { DialogSection } from "sitewhere-ide-components";
export default class NoFields extends DialogSection {
    readonly readonly: boolean;
    /** Reset section content */
    reset(): void;
    /** Perform validation */
    validate(): boolean;
    /** Load form data from an object */
    load(configuration: any): void;
    /** Save form data to an object */
    save(): {};
}
