<template>
  <coap-event-source-dialog
    ref="dialog"
    title="Create CoAP Server Event Source"
    width="700"
    createLabel="Create"
    cancelLabel="Cancel"
    :idsInUse="idsInUse"
    :tenantId="tenantId"
    @payload="onPayload"
  />
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Ref } from "vue-property-decorator";

import CoapEventSourceDialog from "./CoapEventSourceDialog.vue";

import { ICoapServerConfiguration } from "sitewhere-configuration-model";

@Component({
  components: {
    CoapEventSourceDialog
  }
})
export default class CoapEventSourceCreateDialog extends Vue {
  @Prop() readonly tenantId!: string;
  @Ref() readonly dialog!: CoapEventSourceDialog;

  idsInUse: string[] = [];

  /** Emit payload */
  onPayload(payload: ICoapServerConfiguration): void {
    this.dialog.closeDialog();
    this.$emit("create", payload);
  }

  /** Open dialog */
  openDialog(idsInUse: string[]): void {
    this.idsInUse = idsInUse;
    this.dialog.reset();
    this.dialog.openDialog();
  }
}
</script>

