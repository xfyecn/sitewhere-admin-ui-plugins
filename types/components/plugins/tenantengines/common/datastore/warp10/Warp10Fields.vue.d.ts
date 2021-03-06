import { DialogSection } from "sitewhere-ide-components";
import { IWarp10Configuration } from "sitewhere-configuration-model";
export default class Warp10Fields extends DialogSection {
    readonly readonly: boolean;
    hostname: string | null;
    port: number | null;
    application: string | null;
    tokenSecret: string | null;
    /** Reset section content */
    reset(): void;
    /** Perform validation */
    validate(): boolean;
    /** Load form data from an object */
    load(configuration: IWarp10Configuration): void;
    /** Save form data to an object */
    save(): {};
}
