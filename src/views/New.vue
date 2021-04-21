<template>
  <form class="card" @submit.prevent="submitHandler">
    <h1>Создать новую задачу</h1>
    <div class="form-control">
      <label for="title">Название</label>
      <input type="text" id="title" v-model.trim="title" />
    </div>

    <div class="form-control">
      <label for="date">Дата дэдлайна</label>
      <input type="date" id="date" v-model="date" />
    </div>

    <div class="form-control">
      <label for="description">Описание</label>
      <textarea id="description" v-model.trim="description"></textarea>
    </div>

    <button class="btn primary" :disabled="!isValid">Создать</button>
  </form>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const title = ref('');
    const date = ref('');
    const description = ref('');

    const isValid = computed(() => {
      return title.value && date.value && description.value;
    });

    const resetForm = () => {
      title.value = '';
      date.value = '';
      description.value = '';
    };

    const submitHandler = async () => {
      if (isValid.value) {
        let newTask = {
          title: title.value,
          date: date.value
            .split('-')
            .reverse()
            .join('-'),
          description: description.value,
          status: 'active'
        };
        await store.dispatch('createTask', newTask);
        resetForm();
      }
    };

    return { title, date, description, isValid, submitHandler };
  }
};
</script>

<script></script>
