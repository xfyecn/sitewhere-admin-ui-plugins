<template>
  <tenant-engine-plugin :configuration="configuration">
    <event-sources-table
      :tenantId="tenantId"
      :eventSources="eventSources"
      @create="onEventSourceCreated"
      @update="onEventSourceUpdated"
      @delete="onEventSourceDeleted"
    />
  </tenant-engine-plugin>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { MicroserviceIcon } from "sitewhere-ide-common";

import TenantEnginePlugin from "../TenantEnginePlugin.vue";
import EventSourcesTable from "./EventSourcesTable.vue";

import { ITenantEngineConfiguration } from "sitewhere-rest-api";
import {
  IEventSourcesConfiguration,
  IEventSourceGenericConfiguration
} from "sitewhere-configuration-model";
import { IInstanceConfiguration } from "sitewhere-rest-api";

@Component({
  components: { TenantEnginePlugin, EventSourcesTable }
})
export default class EventSourcesPlugin extends Vue {
  @Prop() readonly configuration!: ITenantEngineConfiguration;

  /** Get page icon */
  get icon(): MicroserviceIcon {
    return MicroserviceIcon.EventSources;
  }

  /** Tenant id */
  get tenantId(): string | null {
    return this.configuration ? this.configuration.tenant.token : null;
  }

  /** Get tenant configuration for event sources */
  get eventSourcesConfiguration(): IEventSourcesConfiguration {
    return this.configuration ? this.configuration.tenantConfiguration : null;
  }

  /** Get instance configuraton information */
  get instanceManagement(): IInstanceConfiguration | null {
    return this.configuration ? this.configuration.instanceConfiguration : null;
  }

  /** Get event sources list */
  get eventSources(): IEventSourceGenericConfiguration[] | null {
    return this.eventSourcesConfiguration
      ? this.eventSourcesConfiguration.eventSources
      : null;
  }

  /** Handle event source created */
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  onEventSourceCreated(config: IEventSourceGenericConfiguration): void {
    this.markDirty();
  }

  /** Handle event source updated */
  onEventSourceUpdated(
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    originalId: string,
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    config: IEventSourceGenericConfiguration
  ): void {
    this.markDirty();
  }

  /** Handle event source deleted */
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  onEventSourceDeleted(id: string): void {
    this.markDirty();
  }

  /** Mark data as having been updated */
  markDirty(): void {
    this.$emit("dirty");
  }
}
</script>
