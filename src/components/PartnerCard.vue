<template>
  <div class="card mt-4">
    <div class="card-body">
      <p>ID: {{ partner.id }}</p>
      <p>Имя: <input v-model="name"/> </p>
      <p>Телефон: <input v-model="phone"/> </p>
      <p>Город: <input v-model="city"/> </p>
      <p>Дата: {{ partner.createdAt }}</p>

      <textarea
          v-model="comment"
          class="form-control mb-2"
      />

      <select
          v-model="status"
          class="form-control"
      >
        <option>{{ STATUS.NEW }}</option>
        <option>{{ STATUS.IN_PROGRESS }}</option>
        <option>{{ STATUS.APPROVED}}</option>
        <option>{{ STATUS.REJECTED }}</option>
      </select>

      <button
          class="btn btn-primary mt-2"
          @click="save"
      >
        Сохранить
      </button>

      <button
          class="btn btn-secondary mt-2 ms-2"
          @click="$emit('close')"
      >
        Закрыть
      </button>
    </div>
  </div>
</template>

<script>
import { STATUS } from "@/constants/statuses"

export default {
  props: ['partner'],

  data() {
    return {
      STATUS,
      name: this.partner.name,
      phone: this.partner.phone,
      city: this.partner.city,
      status: this.partner.status,
      comment: this.partner.comment
    }
  },

  methods: {
    save() {
      if (!this.name || !this.phone || !this.city) {
        alert('Заполните обязательные поля')
        return
      }

      this.$store.dispatch('updatePartnerData',{
        id: this.partner.id,
        data: {
          ...this.partner,
          name: this.name,
          phone: this.phone,
          city: this.city,
          status: this.status,
          comment: this.comment
        }
      })
    }
  }
}
</script>