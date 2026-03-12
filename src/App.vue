<template>
  <div class="container mt-4">
    <h3 class="mb-3">Заявки партнёров</h3>
    <div v-if="loading">
      Загрузка...
    </div>
    <div v-else-if="error">
      Ошибка загрузки
    </div>
    <div v-else>
      <PartnersTable
          :partners="partners"
          @open="openCard"
      />
      <PartnerCard
          v-if="selected"
          :partner="selected"
          :key="selected.id"
          @close="selected = null"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PartnersTable from './components/PartnersTable.vue'
import PartnerCard from './components/PartnerCard.vue'

export default {
  components: {
    PartnersTable,
    PartnerCard
  },

  data() {
    return {
      selected: null
    }
  },

  computed: {
    ...mapState(['partners', 'loading', 'error'])
  },

  methods: {
    openCard(partner) {
      this.selected = partner
    }
  },

  created() {
    this.$store.dispatch('fetchPartners')
  }
}

</script>