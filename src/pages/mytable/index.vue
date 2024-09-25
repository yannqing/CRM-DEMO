<script lang="ts">
  import { useMyTableStore } from '@/stores/mytable'

  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      search: '',
      headers: [
        {
          title: '编号',
          align: 'start',
          sortable: false,
          key: 'id',
        },
        { title: '姓名', key: 'name' },
        { title: '部门', key: 'department' },
        { title: '性别', key: 'sex' },
        { title: '年龄', key: 'age' },
        { title: '入职日期', key: 'dateTime' },
        { title: '联系方式', key: 'phone' },
        { title: '住址', key: 'address' },
        { title: '备注', key: 'description' },
        { title: '状态', key: 'status' },
        { title: 'Actions', key: 'actions', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        id: '',
        name: '',
        department: '',
        sex: '',
        age: '',
        dateTime: '',
        phone: '',
        address: '',
        description: '',
        status: '',
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? '新增员工信息' : '编辑员工信息'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      // 初始化数据
      initialize () {
        this.desserts = useMyTableStore().data
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.desserts.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.editedItem.status = '在职'
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :search="search"
    :sort-by="[{ key: 'calories', order: 'asc' }]"
  >
    <template #top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>员工管理</v-toolbar-title>
        <v-text-field
          v-model="search"
          density="compact"
          flat
          hide-details
          label="Search"
          prepend-inner-icon="mdi-magnify"
          single-line
          variant="solo-filled"
        />
        <v-divider
          class="mx-4"
          inset
          vertical
        />
        <v-spacer />
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template #activator="{ props }">
            <v-btn
              class="mb-2"
              color="primary"
              dark
              v-bind="props"
            >
              新增员工
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    md="4"
                    sm="6"
                  >
                    <v-text-field
                      v-model="editedItem.id"
                      label="编号"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    md="4"
                    sm="6"
                  >
                    <v-text-field
                      v-model="editedItem.name"
                      label="姓名"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    md="4"
                    sm="6"
                  >
                    <v-text-field
                      v-model="editedItem.department"
                      label="部门"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    md="4"
                    sm="6"
                  >
                    <v-text-field
                      v-model="editedItem.sex"
                      label="性别"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    md="4"
                    sm="6"
                  >
                    <v-text-field
                      v-model="editedItem.age"
                      label="年龄"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    md="4"
                    sm="6"
                  >
                    <v-text-field
                      v-model="editedItem.dateTime"
                      label="入职日期"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    md="4"
                    sm="6"
                  >
                    <v-text-field
                      v-model="editedItem.phone"
                      label="联系方式"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    md="4"
                    sm="6"
                  >
                    <v-text-field
                      v-model="editedItem.address"
                      label="住址"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    md="4"
                    sm="6"
                  >
                    <v-text-field
                      v-model="editedItem.description"
                      label="备注"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer />
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="close"
              >
                取消
              </v-btn>
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="save"
              >
                保存
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">请问你确定要删除这条数据吗？</v-card-title>
            <v-card-actions>
              <v-spacer />
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete">取消</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">确定</v-btn>
              <v-spacer />
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template #item.actions="{ item }">
      <v-icon
        class="me-2"
        size="small"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        size="small"
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template #no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>

<style scoped lang="sass">

</style>
