<template>
  <tenant-engine-plugin :configuration="configuration">
    <content-section icon="fa-database" title="Batch Operations Datastore">
      <rdb-datastore-selector
        :datastore="datastore"
        :instance="instanceManagement"
        @create="onCreateDatastore"
        @update="onUpdateDatastore"
        @unset="onUnsetDatastore"
      />
    </content-section>
    <v-divider class="mt-4 mb-4" />
    <batch-operation-manager-section
      :configuration="batchOperationManager"
      @update="onBatchOperationManagerUpdate"
    />
  </tenant-engine-plugin>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import TenantEnginePlugin from "../TenantEnginePlugin.vue";
import RdbDatastoreSelector from "../common/datastore/RdbDatastoreSelector.vue";
import BatchOperationManagerSection from "./batchoperationmanager/BatchOperationManagerSection.vue";

import { ContentSection } from "sitewhere-ide-components";

import { VDivider } from "vuetify/lib";

import {
  ITenantEngineConfiguration,
  IInstanceConfiguration
} from "sitewhere-rest-api";
import {
  IBatchOperationsConfiguration,
  IBatchOperationManagerConfiguration,
  IDatastoreDefinition
} from "sitewhere-configuration-model";

@Component({
  components: {
    VDivider,
    ContentSection,
    TenantEnginePlugin,
    RdbDatastoreSelector,
    BatchOperationManagerSection
  }
})
export default class BatchOperationsPlugin extends Vue {
  @Prop() readonly configuration!: ITenantEngineConfiguration;

  /** Get tenant configuration for batch operations */
  get batchOperations(): IBatchOperationsConfiguration {
    return this.configuration ? this.configuration.tenantConfiguration : null;
  }

  /** Get instance configuraton information */
  get instanceManagement(): IInstanceConfiguration | null {
    return this.configuration ? this.configuration.instanceConfiguration : null;
  }

  /** Get datastore definition */
  get datastore(): IDatastoreDefinition | null {
    return this.batchOperations ? this.batchOperations.datastore : null;
  }

  /** Get batch operation manager configuration */
  get batchOperationManager(): IBatchOperationManagerConfiguration | null {
    return this.batchOperations
      ? this.batchOperations.batchOperationManager
      : null;
  }

  /** Create new datastore */
  onCreateDatastore(definition: IDatastoreDefinition) {
    this.batchOperations.datastore = definition;
  }

  /** Update datastore */
  onUpdateDatastore(definition: IDatastoreDefinition) {
    this.batchOperations.datastore = definition;
    this.markDirty();
  }

  /** Unset the datastore */
  onUnsetDatastore(): void {
    if (this.batchOperations) {
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      (this.batchOperations as any).datastore = null;
      this.markDirty();
    }
  }

  /** Handle batch operation manager updates */
  onBatchOperationManagerUpdate(updated: IBatchOperationManagerConfiguration) {
    if (this.batchOperations) {
      this.batchOperations.batchOperationManager = updated;
      this.markDirty();
    }
  }

  /** Mark data as having been updated */
  markDirty(): void {
    this.$emit("dirty");
  }
}
</script>
