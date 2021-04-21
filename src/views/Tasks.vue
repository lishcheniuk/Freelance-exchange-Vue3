<template>
  <p v-if="loading" style="color:azure">Loading...</p>
  <template v-else>
    <h1 class="text-white center" v-if="!!!tasks.length">Задач пока нет</h1>
    <template v-else>
      <h3 class="text-white">Всего активных задач: {{ countActiveTasks }}</h3>
      <div class="card" v-for="task of tasks" :key="task.id">
        <h2 class="card-title">
          {{ task.title }}
          <AppStatus :type="task.status" />
        </h2>
        <p>
          <strong>
            <small>
              {{ task.date }}
            </small>
          </strong>
        </p>
        <button class="btn primary" @click="$router.push(`/task/${task.id}`)">
          Посмотреть
        </button>
      </div>
    </template>
  </template>
</template>

<script>
import AppStatus from '../components/AppStatus';
import { onMounted, ref, computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const loading = ref(true);

    onMounted(async () => {
      if (!tasks.value.length) {
        await store.dispatch('fetchTasks');
      }
      loading.value = false;
    });

    const tasks = computed(() => store.getters.getTasks);

    const countActiveTasks = computed(
      () => tasks.value.filter(task => task.status === 'active').length
    );

    return { tasks, loading, countActiveTasks };
  },
  components: { AppStatus }
};
</script>
