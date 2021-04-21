import { createStore } from 'vuex';

export default createStore({
  state: {
    tasks: []
  },
  mutations: {
    addTask(state, newTask) {
      state.tasks.push(newTask);
    },
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    edit(state, { id, status }) {
      const task = state.tasks.find(task => task.id === id);
      task.status = status;
    }
  },
  actions: {
    async createTask({ commit }, newTask) {
      const res = await fetch(
        'https://freelance-fcc0a-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
        {
          method: 'POST',
          body: JSON.stringify(newTask),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      const id = await res.json();
      commit('addTask', { ...newTask, id: id.name });
    },
    fetchTasks({ commit }) {
      return new Promise(resolve => {
        fetch(
          'https://freelance-fcc0a-default-rtdb.europe-west1.firebasedatabase.app/tasks.json'
        )
          .then(res => res.json())
          .then(data => {
            const tasks = Object.keys(data || {}).map(id => ({
              ...data[id],
              id
            }));
            setTimeout(() => {
              commit('setTasks', tasks);
              resolve();
            }, 1000);
          });
      });
    },
    async editTask({ commit }, payload) {
      await fetch(
        `https://freelance-fcc0a-default-rtdb.europe-west1.firebasedatabase.app/tasks/${payload.id}.json`,
        {
          method: 'PATCH',
          body: JSON.stringify({ status: payload.status }),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      commit('edit', payload);
    }
  },
  getters: {
    getTaskById(state) {
      return id => state.tasks.find(task => task.id === id);
    },
    getTasks(state) {
      return state.tasks;
    }
  }
});
