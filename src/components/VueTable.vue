<template>
    <div class="col-lg-12 mb-5">
        <div class="card">
            <div class="card-header">
                <i class="fa fa-align-justify"></i> {{this.$route.name}} Table

                <!-- SEARCH AREA  -->
                <div class="float_right">
                    <label> Serarch
                    <input type="text" v-model="search">
                    </label>
                </div>
                <!--/ SEARCH AREA  -->
            </div>
            <div class="card-block">
                <table class="table table-striped">
                    <thead class="text-center">
                    <tr v-if="columns">
                        <th> No </th>
                        <th v-for="column in columns">{{ column }}</th>
                        <th> Actions </th>
                    </tr>
                    <tr v-else>
                        <th> No </th>
                        <th v-for="field in fields">{{ field }}</th>
                        <th> Actions </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(items, index) in filteredItems">
                        <!-- In here we only display keys value of items which are initialized in 'fields' array -->
                        <td>{{ index + 1 }}</td>
                        <td v-show="fields.includes(key)" v-for="(value, key) in items">
                            {{ value }}



                        </td>
                        <td>
                            <button class="btn btn-sm btn-default" @click="editItem(items)">Edit</button>
                            <button class="btn btn-sm btn-danger" @click="deleteItem(items.id, index)">Delete</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <ul class="pagination">
                    <li class="page-item"><a class="page-link" href="#">Prev</a></li>
                    <li class="page-item active">
                        <a class="page-link" href="#">1</a>
                    </li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item"><a class="page-link" href="#">4</a></li>
                    <li class="page-item"><a class="page-link" href="#">Next</a></li>
                </ul>
            </div>
        </div>
    </div><!--/.col-->

</template>
<script>

    /* eslint-disable quotes,curly */
    export default{
      data () {
        return {
          search: '',
          apiService: null,
          m_item: "orxan"
        }
      },
      computed: {
        filteredItems () {
          return this.api_response.filter(item => {
            if (item.fullname.toLowerCase().match(this.search.toLowerCase()) || item.email.toLowerCase().match(this.search.toLowerCase()))
              return item
          })
        },
        apiService () {
          return this.api_service
        }
      },
      methods: {
        deleteItem (id, index) {
          // -- Call deleteItem method from parent component
          this.$parent.$emit('deleteItem', id, index)
        },
        editItem (items) {
          // -- Call updateItem method from parent component
          this.$parent.$emit('updateItem', items)
        }
      },
      props: {
        columns: {
          type: Array,
          required: false
        },
        fields: {
          type: Array,
          required: true
        },
        api_response: {
          type: Array,
          required: true
        },
        api_service: {
          type: Object,
          required: true
        }
      }
    }
</script>
<style lang="scss">
    [v-cloak] .v-cloak--hidden {
        display: none;
    }

    .float_right {
        float: right;
    }
</style>
