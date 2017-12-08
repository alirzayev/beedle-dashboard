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
                    <thead>
                    <tr>
                        <th> No </th>
                        <th v-if="image_attr"> Cover </th>
                        <th v-if="columns" v-for="column in columns" v-text="column"></th>
                        <th v-else v-for="field in fields" v-text="field"></th>
                        <th> Actions </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, index) in getItems(page)">
                        <!-- In here we only display keys value of items which are initialized in 'fields' array -->
                        <td>{{ index + 1 }}</td>
                        <td v-if="image_attr">
                            <div class="avatar">
                                <img :src="item[image_attr]" class="img-avatar">
                            </div>
                        </td>
                        <!-- This column is displaying the objects of item -->
                        <td v-if="objects" v-for="object_field in object_fields">
                            <span v-if="item.hasOwnProperty(object)" v-for="object in objects"
                                  v-text="item[object][object_field]">
                            </span>
                        </td>
                        <td v-if="item.hasOwnProperty(field)" v-for="field in fields">
                            <span v-if="detail_column===field" class="link" @click="show(item.id)" v-text="item[field]">
                            </span>
                            <span v-else v-text="item[field]">
                            </span>
                        </td>
                        <td>
                            <button v-if="editable==true" class="btn btn-sm btn-default" @click="editItem(item)">Edit
                            </button>
                            <button class="btn btn-sm btn-danger" @click="deleteItem(item.id, index)">Delete</button>
                            <button v-if="action_column" class="btn btn-sm"
                                    :class="getDetails(item.id).class"
                                    @click="doAction(item.id, item[action_column])"
                                    v-text="getDetails(item.id).btn_title">
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <vue-pagination
                        :items="this.filteredItems"
                        :per_page="per_page"
                ></vue-pagination>
            </div>
        </div>
    </div><!--/.col-->

</template>
<script>
  import VuePagination from './VuePagination.vue'
  /* eslint-disable quotes,curly */
  export default {
    data () {
      return {
        search: '',
        page: 1
      }
    },
    computed: {
      filteredItems () {
        return this.api_response.filter(item => {
          for (var value in item) {
            if (!item.hasOwnProperty(value)) continue
            if (String(item[value]).toLowerCase().match(this.search.toLowerCase())) {
              return item[value]
            }
          }
        })
      }
    },
    methods: {
      deleteItem (id, index) {
        // -- Call deleteItem method from parent component
        this.$parent.$emit('deleteItem', id, index)
      },
      editItem (item) {
        // -- Call updateItem method from parent component
        this.$parent.$emit('updateItem', item)
      },
      // -- this methods return the n number of items according to current page which is active on pagination
      getItems (currentPage) {
        this.page = currentPage
        let start // display from start
        let end // display until the end
        start = currentPage * this.per_page - this.per_page
        end = currentPage * this.per_page
        return this.filteredItems.slice(start, end)
      },
      show (id) {
        this.$parent.$emit('show', id)
      },
      doAction (id, status) {
        this.$parent.$emit('action', id, status)
      },
      getDetails (id) {
        return this.$parent.getActionDetails(id)
      }
    },
    created () {
      this.$on('getItems', this.getItems)
    },
    components: {
      VuePagination
    },
    props: {
      columns: {
        type: Array,
        required: false
      },
      detail_column: {
        type: String,
        required: false
      },
      objects: {
        type: Array,
        required: false
      },
      fields: {
        type: Array,
        required: true
      },
      object_fields: {
        type: Array,
        required: false
      },
      api_response: {
        type: Array,
        required: true
      },
      per_page: {
        type: Number,
        required: true
      },
      image_attr: {
        type: String,
        required: false
      },
      action_column: {
        type: String,
        required: false
      },
      editable: {
        default: true,
        type: Boolean,
        required: false
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

    .link {
        cursor: pointer;
        size: 22px;
        color: #00aced;
    }

    .link:hover {
        color: #00b3ee;
        font-weight: bold;
    }
</style>
