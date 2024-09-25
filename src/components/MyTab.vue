<script setup lang="ts">
// cyan-lighten-1

  import { useRouter } from 'vue-router'

  const router = useRouter()

  const toHomePage = () => {
    router.push('/')
  }

  const toTablePage = () => {
    router.push('/myTable')
  }

</script>

<template>
  <v-card>
    <v-layout style="height: 100%">
      <v-navigation-drawer
        class="bg-deep-purple-accent-2"
        permanent
      >
        <v-list
          density="compact"
          nav
        >
          <v-list-item prepend-icon="mdi-view-dashboard" title="Home" value="home" @click="toHomePage" />
          <v-list-item prepend-icon="mdi-forum" title="My Table" value="about" @click="toTablePage" />
        </v-list>
        <template #append>
          <div class="pa-2">
            <v-btn block>
              Logout
            </v-btn>
          </div>
        </template>
      </v-navigation-drawer>
      <v-main style="height: 400px" />
    </v-layout>
  </v-card>
</template>

<style scoped lang="sass">

</style>
