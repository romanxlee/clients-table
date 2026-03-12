<template>
  <div>
    <input
        v-model="search"
        placeholder="Поиск"
        class="form-control mb-2"
    />

    <select
        v-model="statusFilter"
        class="form-control mb-2"
    >
      <option value="">Все статусы</option>
      <option>{{ STATUS.NEW }}</option>
      <option>{{ STATUS.IN_PROGRESS }}</option>
      <option>{{ STATUS.APPROVED }}</option>
      <option>{{ STATUS.REJECTED }}</option>
    </select>

    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th @click="sort('name')">
            Имя {{ sortKey === 'name' ? (sortOrder === 'asc' ? '↑' : '↓') : '' }}
          </th>
          <th>Город</th>
          <th>Статус</th>
          <th @click="sort('createdAt')">
            Дата {{ sortKey === 'createdAt' ? (sortOrder === 'asc' ? '↑' : '↓') : '' }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
            v-for="partner in paginated"
            :key="partner.id"
            @click="$emit('open', partner)"
            style="cursor:pointer"
        >
          <td>{{ partner.id }}</td>
          <td>{{ partner.name }}</td>
          <td>{{ partner.city }}</td>
          <td>{{ partner.status }}</td>
          <td>{{ partner.createdAt }}</td>
        </tr>
      </tbody>
    </table>

    <div v-if="!paginated.length">
      Нет заявок
    </div>

    <button
        :disabled="page === 1"
        class="btn btn-sm btn-secondary"
        @click="page--"
    >
      Назад
    </button>

    <button
        :disabled="end >= sorted.length"
        class="btn btn-sm btn-secondary ms-2"
        @click="page++"
    >
      Вперед
    </button>
  </div>
</template>

<script>
import debounce from 'lodash.debounce'
import { STATUS } from "@/constants/statuses"

export default {
  props: ['partners'],

  data() {
    return {
      STATUS,
      search: '',
      debouncedSearch: '',
      statusFilter: '',
      sortKey: '',
      sortOrder: 'asc',
      page: 1,
      perPage: 5,
      updateSearchDebounced: null
    }
  },

  created() {
    this.updateSearchDebounced = debounce((value) => {
      this.debouncedSearch = value
      this.page = 1
    }, 400)
  },

  beforeDestroy() {
    if (this.updateSearchDebounced && this.updateSearchDebounced.cancel) {
      this.updateSearchDebounced.cancel()
    }
  },

  computed: {
    filtered() {
      let data = this.partners

      if (this.debouncedSearch) {
        const search = this.debouncedSearch.toLowerCase()

        data = data.filter((partner) =>
          partner.name.toLowerCase().includes(search) ||
          partner.city.toLowerCase().includes(search)
        )
      }

      if (this.statusFilter) {
        data = data.filter((partner) => partner.status === this.statusFilter)
      }

      return data
    },

    sorted() {
      if (!this.sortKey) {
        return this.filtered
      }

      return [...this.filtered].sort((a, b) => {
        const aValue = a[this.sortKey]
        const bValue = b[this.sortKey]

        if (aValue === bValue) {
          return 0
        }

        const result = aValue > bValue ? 1 : -1
        return this.sortOrder === 'asc' ? result : -result
      })
    },

    paginated() {
      const start = (this.page - 1) * this.perPage
      return this.sorted.slice(start, start + this.perPage)
    },

    end() {
      return this.page * this.perPage
    }
  },

  methods: {
    sort(key) {
      if (this.sortKey === key) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'
      } else {
        this.sortKey = key
        this.sortOrder = 'asc'
      }

      this.page = 1
    }
  },

  watch: {
    search(value) {
      this.updateSearchDebounced(value)
    },

    statusFilter() {
      this.page = 1
    }
  }
}
</script>