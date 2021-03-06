import Vue from "vue";
import { ITenantEngineConfiguration } from "sitewhere-rest-api";
import { IDeviceManagementConfiguration, IDatastoreDefinition } from "sitewhere-configuration-model";
import { IInstanceConfiguration } from "sitewhere-rest-api";
export default class DeviceManagementPlugin extends Vue {
    readonly configuration: ITenantEngineConfiguration;
    /** Get tenant configuration for device management */
    get deviceManagement(): IDeviceManagementConfiguration;
    /** Get instance configuraton information */
    get instanceManagement(): IInstanceConfiguration | null;
    /** Get datastore definition */
    get datastore(): IDatastoreDefinition | null;
    /** Create new datastore */
    onCreateDatastore(definition: IDatastoreDefinition): void;
    /** Update datastore */
    onUpdateDatastore(definition: IDatastoreDefinition): void;
    /** Unset the datastore */
    onUnsetDatastore(): void;
    /** Mark data as having been updated */
    markDirty(): void;
}
