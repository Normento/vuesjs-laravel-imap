<template>
  <div>
    <h2>Messages dans le dossier: {{ folder_name }}</h2>
    <ul>
      <li v-for="message in messages" :key="message.uid">
        <router-link :to="{ name: 'MessageDetailView', params: { folder_name: folder_name, message_uid: message.uid }}">{{ message.subject }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MessagesView',
  props: ['folder_name'],
  data() {
    return {
      messages: [],
    };
  },
  async created() {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8000/api/mail-accounts/1/folders/${this.folder_name}/messages`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.messages = response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des messages:', error);
    }
  },
};
</script>
