<template>
  <div>
    <h2>Dossiers</h2>
    <ul>
      <li v-for="folder in folders" :key="folder">
        <router-link :to="{ name: 'MessagesView', params: { folder_name: folder }}">{{ folder }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'FoldersView',
  data() {
    return {
      folders: [],
    };
  },
  async created() {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/mail-accounts/1/folders', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.folders = response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des dossiers:', error);
    }
  },
};
</script>
