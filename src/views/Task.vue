<template>
  <div class="card" v-if="!!getTask">
    <h2>{{ getTask.title }}</h2>
    <p><strong>Статус</strong>: <AppStatus :type="getTask.status" /></p>
    <p><strong>Дэдлайн</strong>: {{ getTask.date }}</p>
    <p><strong>Описание</strong>: {{ getTask.description }}</p>
    <div>
      <button class="btn" @click="clickHandler('pending')">
        Взять в работу
      </button>
      <button class="btn primary" @click="clickHandler('done')">
        Завершить
      </button>
      <button class="btn danger" @click="clickHandler('cancelled')">
        Отменить
      </button>
    </div>
  </div>
  <h3 class="text-white center" v-else>
    Задачи с id = <strong>{{ $route.params.id }}</strong> нет.
  </h3>
</template>

<script>
import AppStatus from '../components/AppStatus';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const route = useRoute();
    const store = useStore();

    const getTask = computed(() => {
      return store.getters.getTaskById(route.params.id);
    });

    const clickHandler = status => {
      store.dispatch('editTask', { status, id: route.params.id });
    };

    return { getTask, clickHandler };
  },
  components: { AppStatus }
};
</script>

<style scoped></style>
