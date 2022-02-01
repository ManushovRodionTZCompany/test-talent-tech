<template>
  <v-container
    fill-height
    fluid
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-col>
        <v-card
          class="mx-auto"
          max-width="800"
        >
          <slot />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'LayoutDefault',
};
</script>
