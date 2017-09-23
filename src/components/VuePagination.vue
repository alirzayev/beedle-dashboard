<template>
    <ul class="pagination">
        <li class="page-item"><a class="page-link" href="#">Prev</a></li>
        <li v-for="(range, index) in pageRange(per_page)" :class="['page-item', { 'active' : range===currentPage }]">
            <a class="page-link" @click="changePage(range)">{{ range }}</a>
        </li>
        <li class="page-item">
            <a class="page-link" href="#">Next</a>
        </li>
    </ul>
</template>

<script>
  export default {
    data () {
      return {
        currentPage: 1
      }
    },
    methods: {
      changePage (page) {
        this.currentPage = page
        this.$parent.$emit('getItems', page)
      },
      pageRange (perPage) {
        if (this.items.length < perPage) {
          return 1
        } else if (this.items.length % perPage === 0) {
          return this.items.length / perPage
        } else {
          return Math.floor(this.items.length / perPage) + 1
        }
      }
    },
    props: {
      items: {
        type: Array,
        required: true
      },
      per_page: {
        type: Number,
        required: true
      }
    }
  }
</script>

